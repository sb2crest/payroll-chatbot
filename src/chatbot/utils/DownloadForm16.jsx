// utils/pdfUtils.js
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { saveAs } from 'file-saver';

const generateForm16PDF = async () => {
  try {
    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();

    // Add a blank page to the document
    const page = pdfDoc.addPage([600, 850]);

    // Get the context for drawing on the page
    const { width, height } = page.getSize();

    // Embed standard Helvetica font
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // Draw a header with background color
    page.drawRectangle({
      x: 50,
      y: height - 70,
      width: width - 100,
      height: 40,
      color: rgb(0.3, 0.6, 1),
    });

    // Add header text
    page.drawText('Form 16', {
      x: width / 2 - 50,
      y: height - 55,
      size: 20,
      color: rgb(1, 1, 1),
      font: helveticaFont,
    });

    // Draw table headers with background color
    const headers = ['Employee Name', 'Employee ID', 'Income', 'Tax'];
    const headerX = 60;
    const headerY = height - 120;
    const cellHeight = 30;
    const cellPadding = 10;
    const cellWidth = (width - 140) / headers.length;

    headers.forEach((header, index) => {
      page.drawRectangle({
        x: headerX + index * cellWidth,
        y: headerY,
        width: cellWidth,
        height: cellHeight,
        color: rgb(0.8, 0.8, 0.8),
      });

      page.drawText(header, {
        x: headerX + index * cellWidth + cellPadding,
        y: headerY + cellPadding,
        size: 12,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });
    });

    // Add table data
    const data = [
      { name: 'John Doe', id: '123456', income: '$50,000', tax: '$5,000' },
    ];
    const dataY = headerY - cellHeight;

    data.forEach((row, rowIndex) => {
      const yPosition = dataY - rowIndex * cellHeight;
      Object.values(row).forEach((value, colIndex) => {
        page.drawRectangle({
          x: headerX + colIndex * cellWidth,
          y: yPosition,
          width: cellWidth,
          height: cellHeight,
          borderColor: rgb(0, 0, 0),
          borderWidth: 1,
        });

        page.drawText(value, {
          x: headerX + colIndex * cellWidth + cellPadding,
          y: yPosition + cellPadding,
          size: 12,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        });
      });
    });

    // Serialize the document to bytes
    const pdfBytes = await pdfDoc.save();

    // Create a blob from the PDF bytes
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });

    // Use FileSaver.js to save the file
    saveAs(blob, 'Form16.pdf');

    return { success: true, message: 'Form 16 PDF generated successfully!' };
  } catch (error) {
    console.error('Error generating PDF:', error);
    return { success: false, message: 'Error generating Form 16 PDF.' };
  }
};

export { generateForm16PDF };
