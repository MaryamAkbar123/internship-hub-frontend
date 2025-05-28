// src/components/TestPDF.js
import React from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const TestPDF = () => {
  const handleDownload = () => {
    const doc = new jsPDF();
    doc.text("Test PDF", 10, 10);
    autoTable(doc, {
      head: [["Column 1", "Column 2"]],
      body: [["Data 1", "Data 2"]],
    });
    doc.save("test.pdf");
  };

  return <button onClick={handleDownload}>Download Test PDF</button>;
};

export default TestPDF;
