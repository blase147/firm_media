import jsPDF from 'jspdf';
import 'jspdf-autotable';

const generatePDF = (booking, logoUrl) => {
  // eslint-disable-next-line new-cap
  const doc = new jsPDF();

  // Add watermark with logo
  const imgWidth = 50;
  const imgHeight = 15;
  const imgMargin = 15;
  doc.addImage(logoUrl, 'PNG', imgMargin, imgMargin, imgWidth, imgHeight);

  // Add a title
  doc.setFontSize(28);
  doc.setTextColor(40, 40, 40);
  doc.text('Booking Receipt', 80, 25);

  // Add booking details
  doc.setFontSize(12);
  doc.setTextColor(100, 100, 100);

  doc.autoTable({
    startY: 40,
    theme: 'grid',
    head: [['Field', 'Value']],
    body: [
      ['Service', booking.service],
      ['Date', booking.date],
      ['Time', booking.time],
      ['Duration', `${booking.duration} hours`],
      ['Name', booking.name],
      ['Email', booking.email],
      ['Phone', booking.phone],
      ['Plan', booking.plan],
      ['Payment Ref ID', booking.paymentRefId],
    ],
    styles: {
      fontSize: 12,
      cellPadding: 3,
      textColor: [40, 40, 40],
    },
    headStyles: {
      fillColor: [41, 128, 185],
      textColor: [255, 255, 255],
    },
    bodyStyles: {
      fillColor: [236, 240, 241],
    },
    alternateRowStyles: {
      fillColor: [255, 255, 255],
    },
  });

  // Save the PDF
  doc.save('BookingReceipt.pdf');
};

export default generatePDF;
