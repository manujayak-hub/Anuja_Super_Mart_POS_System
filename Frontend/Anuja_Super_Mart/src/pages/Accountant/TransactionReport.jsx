import React from 'react';
import { useReactToPrint } from 'react-to-print';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Sidebar from '../../components/AccountantComponents/Sidebar';
import { Row, Col } from 'react-bootstrap';

const PrintableTransactionReport = React.forwardRef(({ totalAmounts }, ref) => {
    const calculateIncome = () => {
        const salesTotal = totalAmounts['Sales'] || 0;
        const totalExpenses = Object.values(totalAmounts).reduce((total, amount) => amount > 0 ? total + amount : total, 0);
        return salesTotal - totalExpenses;
    };

    return (
        <div ref={ref} className="transaction-summary">
            <div className="mb-3" style={{ paddingTop: "20px" }}>
                <Row className="mb-20 pb-3">
                    
                    <Col className="bg-danger text-white p-3 rounded ms-8">
                        <h3>Transaction Report</h3>
                        <ul>
                            {Object.entries(totalAmounts).map(([type, amount]) => (
                                <li key={type}><strong>{type}:</strong> Rs.{amount.toFixed(2)}</li>
                            ))}
                        </ul>
                    </Col>
                </Row>
            </div>
        </div>
    );
});

const TransactionReport = ({ totalAmounts }) => {
    const printableComponentRef = React.useRef();

    

    const handleDownloadPDF = () => {
        html2canvas(printableComponentRef.current).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgWidth = 210;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const marginLeft = 60; 
            const marginRight = 60; 
            const contentWidth = pdfWidth - marginLeft - marginRight;
            const xPos = (contentWidth - imgWidth) / 2 + marginLeft;
            const yPos = (pdfHeight - imgHeight) / 2;
            pdf.addImage(imgData, 'PNG', xPos, yPos, imgWidth, imgHeight);
            pdf.save('transaction_report.pdf');
        });
    };

    return (
        <div>
            <Sidebar handleDownloadPDF={handleDownloadPDF} />
            <PrintableTransactionReport ref={printableComponentRef} totalAmounts={totalAmounts} />
        </div>
    );
};

export default TransactionReport;
