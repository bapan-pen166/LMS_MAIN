import React, { useState, useEffect } from 'react';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { api } from '../../../ApiUrl/ApiUrl';
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { fullScreenPlugin } from '@react-pdf-viewer/full-screen';
import "../../../assets/css/Student_coursePart/submodule.css";
import CloseIcon from '@mui/icons-material/Close';
import './pdfWorker';

export const SubmoduleDetails = (subModule) => {
    const [openPdf, setOpenPdf] = useState(false);
    const [openVideo, setOpenVideo] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);

    // Initialize the full-screen plugin
    const fullScreenPluginInstance = fullScreenPlugin({
        onEnterFullScreen: () => {
            setIsFullScreen(true);
            requestAnimationFrame(() => {
                window.dispatchEvent(new Event('resize'));
            });
        },
        onExitFullScreen: () => {
            setIsFullScreen(false);
            requestAnimationFrame(() => {
                window.dispatchEvent(new Event('resize'));
            });
        },
    });

    const defaultLayoutPluginInstance = defaultLayoutPlugin({
        renderToolbar: (Toolbar) => (
            <Toolbar>
                {({ CurrentPageInput, GoToNextPage, GoToPreviousPage, ZoomIn, ZoomOut, EnterFullScreen }) => (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <GoToPreviousPage />
                        <CurrentPageInput />
                        <GoToNextPage />
                        <ZoomOut />
                        <ZoomIn />
                        <EnterFullScreen />
                    </div>
                )}
            </Toolbar>
        ),
    });

    useEffect(() => {
        if (isFullScreen) {
            setTimeout(() => {
                window.dispatchEvent(new Event('resize'));
            }, 300);
        }
    }, [isFullScreen]);

    const pdfUrl = `${api}/static/subModuleContents/${subModule?.subModule?.contentDocPath}`;
    const videoUrl = `${subModule?.subModule?.recordedMeeting}`;


    const handlePdfOpen = () => setOpenPdf(true);
    const handleClosePdf = () => setOpenPdf(false);

    const handleVideoOpen = () => setOpenVideo(true);
    const handleCloseVideo = () => setOpenVideo(false);

    return (
        <div>
            {!openPdf && !openVideo ? (
            //    {
                subModule?.subModule?.recordedMeeting != null ? (
                  <>
                    {/* PDF Card */}
                    <div
                      style={{
                        width: "90%",
                        border: "1px solid #D3D3D3",
                        height: "100px",
                        borderRadius: "10px",
                        marginBottom: "20px",
                        justifyContent: "space-between",
                      }}
                      className="card-main d-flex"
                      onClick={handlePdfOpen}
                    >
                      <div
                        style={{
                          display: "flex",
                          gap: "10px",
                          alignItems: "center",
                          paddingLeft: "10px",
                          cursor: "pointer",
                        }}
                      >
                        <PictureAsPdfIcon style={{ color: "red" }} />
                        <p>{subModule?.subModule?.subModuleNm}</p>
                      </div>
                      <div
                        style={{
                          cursor: "pointer",
                          display: "flex",
                          gap: "10px",
                          alignItems: "center",
                        }}
                      >
                        <DoubleArrowIcon />
                      </div>
                    </div>
              
                    {/* Video Card */}
                    <div
                      style={{
                        width: "90%",
                        border: "1px solid #D3D3D3",
                        height: "100px",
                        borderRadius: "10px",
                        marginBottom: "20px",
                        justifyContent: "space-between",
                      }}
                      className="card-main d-flex"
                      onClick={handleVideoOpen}
                    >
                      <div
                        style={{
                          display: "flex",
                          gap: "10px",
                          alignItems: "center",
                          paddingLeft: "10px",
                          cursor: "pointer",
                        }}
                      >
                        <OndemandVideoIcon style={{ color: "red" }} />
                        <p>{subModule?.subModule?.subModuleNm}</p>
                      </div>
                      <div
                        style={{
                          cursor: "pointer",
                          display: "flex",
                          gap: "10px",
                          alignItems: "center",
                        }}
                      >
                        <DoubleArrowIcon />
                      </div>
                    </div>
                  </>
                ) : (
                  <div style={{fontWeight:"bold",fontSize:"20px",display:"flex",justifyContent:"center",alignItems:"center",marginTop:"10%"}}>This class has not been started</div>
                )
            //   }
              
            ) : openPdf ? (
                // PDF Viewer
                <div style={{ height: '88vh' }}>
                    <Worker>
                        <Viewer
                            fileUrl={pdfUrl}
                            plugins={[fullScreenPluginInstance, defaultLayoutPluginInstance]}
                            style={{
                                height: isFullScreen ? '100vh' : '50vh',
                                width: '100%',
                            }}
                        />
                    </Worker>
                    <button style={{ margin: '10px', border: "1px solid #D3D3D3", padding: "6px", position: "absolute", top: "70px", zIndex: "4", right: "12px" }} className='bb' onClick={handleClosePdf}>
                        <CloseIcon style={{ color: "red" }} />
                        Close PDF
                    </button>
                </div>
            ) : (
                // Video Viewer
                <div style={{ height: '88vh' }}>
                    {/* <iframe
                    
                        src={videoUrl}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen

                        style={{ height: "100%",width:"100%" }}
                    ></iframe> */}
                    {/* {console.log(subModule?.subModule?.recordedMeeting)} */}
                    <video
                        src="https://videos.pexels.com/video-files/5532765/5532765-uhd_1440_2732_25fps.mp4"
                        controls
                        autoPlay
                        playsInline
                        style={{ height: "100%", width: "100%" }}
                        allowFullScreen
                        referrerPolicy="strict-origin-when-cross-origin"
                        controlsList="nodownload"
                    />


                    <button style={{ margin: '10px', border: "1px solid #D3D3D3", padding: "6px", position: "absolute", top: "70px", zIndex: "4", right: "12px" }} className='bb' onClick={handleCloseVideo}>
                        <CloseIcon style={{ color: "red" }} />
                        Close Video
                    </button>
                </div>
            )}
        </div>
    );
};