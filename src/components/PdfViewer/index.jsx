import React, { useState } from 'react';
import { pdfjs, Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

// Set the PDF worker source URL
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url
).toString();

// Options for PDF rendering
const options = {
  cMapUrl: '/cmaps/',
  standardFontDataUrl: '/standard_fonts/'
};

/**
 * PdfViewer Component
 *
 * This component is used to display a PDF file using the `react-pdf` library.
 *
 * @param {string} pdfUrl - The URL of the PDF file to be displayed.
 * @returns {JSX.Element} - The JSX element representing the PDF viewer component.
 */
const PdfViewer = ({ pdfUrl }) => {
  const [numPages, setNumPages] = useState();

  /**
   * Handle the loading of the PDF document and set the number of pages.
   *
   * @param {Object} documentData - The data of the loaded PDF document.
   */
  function onDocumentLoadSuccess({ numPages: nextNumPages }) {
    setNumPages(nextNumPages);
  }

  return (
    <Document
      file={pdfUrl}
      onLoadSuccess={onDocumentLoadSuccess}
      options={options}
    >
      {Array.from(new Array(numPages), (el, index) => (
        <Page key={`page_${index + 1}`} pageNumber={index + 1} />
      ))}
    </Document>
  );
};

export default PdfViewer;
