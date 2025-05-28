import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const handleExcelDownload = () => {
  const data = [
    {
      "Total Applications": reportData.totalApplications,
      "Accepted": reportData.acceptedApplications,
      "Rejected": reportData.rejectedApplications,
    },
  ];

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Report");

  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const file = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(file, `report-${id}.xlsx`);
};
