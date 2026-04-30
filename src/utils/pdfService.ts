import jsPDF from 'jspdf';

interface PODetails {
  poNumber: string;
  date: string;
  item: string;
  supplier: string;
  price: number;
  quantity: string;
  paymentTerms: string;
  deliveryTime: string;
}

export const generatePurchaseOrder = (details: PODetails) => {
  const doc = new jsPDF();

  // Header
  doc.setFillColor(2, 6, 23); // Slate 950
  doc.rect(0, 0, 210, 40, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('BuildSync', 15, 20);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('PROCUREMENT & SUPPLY CHAIN', 15, 28);
  
  doc.text(`PO NUMBER: ${details.poNumber}`, 150, 20);
  doc.text(`DATE: ${details.date}`, 150, 28);

  // Body
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('ORDEM DE COMPRA', 15, 55);
  
  // Table Header
  doc.setFillColor(241, 245, 249); // Slate 100
  doc.rect(15, 65, 180, 10, 'F');
  doc.setFontSize(10);
  doc.text('DESCRIÇÃO DO ITEM', 20, 72);
  doc.text('QTD', 120, 72);
  doc.text('PREÇO UN.', 150, 72);
  doc.text('TOTAL', 180, 72);

  // Item Details
  doc.setFont('helvetica', 'normal');
  doc.text(details.item, 20, 85);
  doc.text(details.quantity, 120, 85);
  doc.text(`R$ ${details.price.toLocaleString('pt-BR')}`, 150, 85);
  doc.text(`R$ ${details.price.toLocaleString('pt-BR')}`, 180, 85);

  // Supplier & Terms
  doc.line(15, 95, 195, 95);
  
  doc.setFont('helvetica', 'bold');
  doc.text('FORNECEDOR:', 15, 110);
  doc.setFont('helvetica', 'normal');
  doc.text(details.supplier, 50, 110);
  
  doc.setFont('helvetica', 'bold');
  doc.text('CONDIÇÕES DE PAGAMENTO:', 15, 120);
  doc.setFont('helvetica', 'normal');
  doc.text(details.paymentTerms, 75, 120);
  
  doc.setFont('helvetica', 'bold');
  doc.text('PRAZO DE ENTREGA:', 15, 130);
  doc.setFont('helvetica', 'normal');
  doc.text(details.deliveryTime, 60, 130);

  // Footer / Signature
  doc.line(15, 200, 80, 200);
  doc.text('Assinatura do Responsável', 15, 205);
  doc.text('BuildSync CFO Digital', 15, 210);

  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text('Documento gerado automaticamente pelo sistema BuildSync. Sujeito aos termos e condições do contrato master.', 15, 280);

  // Save the PDF
  doc.save(`PO_${details.poNumber}_${details.item.replace(/\s/g, '_')}.pdf`);
};
