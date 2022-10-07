import jsPDF from "jspdf";
import "jspdf-autotable";

const generatePDF = (allData) => {
  const doc = new jsPDF();

  const tableColumn = ["Date", "Expense Item", "Amount"];

  const tableRows = [];

  allData.forEach((data) => {
    const expenseData = [data.date, data.name, data.amount];

    tableRows.push(expenseData);
  });

  doc.text("Balance Sheet", 85, 15);

  // startY is basically margin-top
  doc.autoTable(tableColumn, tableRows, { startY: 50 });
  const date = Date().split(" ");
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
  // ticket title. and margin-top + margin-left
  //   doc.text("Closed allData within the last one month.", 14, 15);
  doc.save(`report_${dateStr}.pdf`);
};

export default generatePDF;
