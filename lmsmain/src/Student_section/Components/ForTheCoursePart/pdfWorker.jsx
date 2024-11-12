import { GlobalWorkerOptions } from 'pdfjs-dist';
const worker = require('pdfjs-dist/build/pdf.worker.entry.js');


GlobalWorkerOptions.workerSrc = URL.createObjectURL(
    new Blob([worker], { type: 'application/javascript' })
);
