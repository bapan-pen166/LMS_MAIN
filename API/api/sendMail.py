from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
import smtplib
from datetime import datetime
import ssl
#import encoders
import base64
from email import encoders

  


class sendMail:

    def __init__(self,toAddr,text,subject,htmlText,file,ccFlag=0) -> None:
        # print(toAddr,text,subject,file,ccFlag )
        # self.toAddr = ['anushrer@pentationanalytics.com','anishc@pentationanalytics.com', 'gajanan.mane@pentationanalytics.com']
        # self.emailIdText = 'anushrer@pentationanalytics.com,anishc@pentationanalytics.com,gajanan.mane@pentationanalytics.com'
        # self.toAddr = ['anushrer@pentationanalytics.com','gajanan.mane@pentationanalytics.com','vaibhavi@pentationanalytics.com']
        # self.emailIdText = 'anushrer@pentationanalytics.com,gajanan.mane@pentationanalytics.com,vaibhavi@pentationanalytics.com'
        # self.toAddr = ['anushrer@pentationanalytics.com',]
        # self.emailIdText = 'anushrer@pentationanalytics.com,'
        self.htmlText = htmlText

        if toAddr != '':
            self.toAddr = toAddr
            self.emailIdText = ''
            for addr in self.toAddr:
                self.emailIdText += addr + ","
            self.emailIdText = self.emailIdText[:-1]

        self.ccFlag = ccFlag


        self.text = text
        self.subject = subject
        self.formAddr = 'tuser8790@gmail.com'
        # self.formAddr = 'prodyut.pentationanalytics@tataaig.com'

        self.file = file
        
    def sendmail(self):


        
        emailText = self.text
        msg = MIMEMultipart()
        # fromId = 'noreply@gicouncil.in'
        # fromId = 'tuser8790@gmail.com'
        # storing the senders email address
        msg['From'] = self.formAddr
        emailId = self.toAddr
        # storing the receivers email address
        # emailId = ['ayanray511@gmail.com','anushrer@pentationanalytics.com']
        # msg['To'] = ', '.join(emailId)
        
        # msg['To'] = emailId
        # storing the subject
        msg['Subject'] = self.subject 
        # body = emailText
        # msg.attach(MIMEText(body, 'plain'))


        # msg.attach(MIMEText(self.htmlText, 'html'))
    #     html = """\
    # <html>
    #   <head></head>
    #   <body>
    #     <p>Hello!<br>
    #        Report created successfully.<br> You can find you report on <b> 
    #     </b></p>
    #   </body>
    # </html>
    # """

        part2 = MIMEText(self.htmlText, 'html')
        msg.attach(part2)
        # msg['Html'] = self.htmlText

        # msg.add_header('Content-Type','text/html')
        # msg.set_payload(self.htmlText)


        if self.file != '':
            # print("self.file>>>",self.file)
            if str(type(self.file)) == 'str':
                attachment = open(self.file, "rb")
                # # instance of MIMEBase and named as p
                p = MIMEBase('application', 'octet-stream')

                # # To change the payload into encoded form
                p.set_payload((attachment).read())
                # # encode into base64
                encoders.encode_base64(p)

                p.add_header('Content-Disposition', "attachment; filename= %s" % str(self.file).split('/')[-1])

                # # attach the instance 'p' to instance 'msg'
                msg.attach(p)
            else:
                # for eachfile in self.file:
                attachment = open(self.file, "rb")
                # # instance of MIMEBase and named as p
                p = MIMEBase('application', 'octet-stream')

                # # To change the payload into encoded form
                p.set_payload((attachment).read())

                # # encode into base64
                encoders.encode_base64(p)

                p.add_header('Content-Disposition', "attachment; filename= %s" % str(self.file).split('/')[-1])

                # # attach the instance 'p' to instance 'msg'
                msg.attach(p)

        # msg.set_payload(self.htmlText)
        
        




        # if self.file != '':
        #     # print("self.file>>>",self.file)
        #     attachment = open(self.file, "rb")
        #     # # instance of MIMEBase and named as p
        #     p = MIMEBase('application', 'octet-stream')

        #     # # To change the payload into encoded form
        #     p.set_payload((attachment).read())

        #     # # encode into base64
        #     encoders.encode_base64(p)

        #     # p.add_header('Content-Disposition', "attachment; filename= %s" % str(self.file).split('/')[-1])
            

        #     # # attach the instance 'p' to instance 'msg'
        #     msg.attach(p)
        # # text = msg.as_string()
        

        context = ssl.create_default_context()
        print("start")
        # smtp.office365.com


        print("initiate smtp ", datetime.now())
        
        # for mailId in emailId:
       
        
        with smtplib.SMTP("smtp.gmail.com", 587) as server:
            # server.helo()
            print("start login")
            server.ehlo()
            server.starttls(context=context)
            
            server.login(self.formAddr,"bthqdncmnxjgkqrm")
         
            print("logged in successfully")

            # for mailId in emailId:
            #     msg['To'] = mailId 
            #     toaddr = [mailId]
            #     if self.ccFlag == 1:
            #         msg['Cc'] = 'anushrer@pentationanalytics.com,ayanr@pentationanalytics.com'
            #         toaddr += ['anushrer@pentationanalytics.com','ayanr@pentationanalytics.com']

            # for mailId in emailId:
            msg['To'] = self.emailIdText 
            toaddr = emailId
            # if self.ccFlag == 1:
            #     msg['Cc'] = 'anushrer@pentationanalytics.com,ayanr@pentationanalytics.com'
            #     toaddr += ['anushrer@pentationanalytics.com','ayanr@pentationanalytics.com']

            # for mailId in emailId:
            #     print(msg)
            #     msg['To'] = ''
            #     msg['To'] = mailId
            #     text = msg.as_string()
            text = msg.as_string()


        # for mailId in emailId:
            server.sendmail(self.formAddr,toaddr, text)
            print("sent")
            server.quit()
        print("mail sent")

# obj = sendMail(['anushrer@pentationanalytics.com','sumanp@pentationanalytics.com','arpand@pentationanalytics.com','ayanr@pentationanalytics.com'], 'testing successful','testing','')
# obj.sendmail()

# obj = sendMail(['arpand@pentationanalytics.com'],"We did not get any updates from you for 3 days. Thats why your request is being rejected.",'Request Rejected - '+ ' Request No. '+ '12345' ,'')
# obj.sendmail()
# del obj


