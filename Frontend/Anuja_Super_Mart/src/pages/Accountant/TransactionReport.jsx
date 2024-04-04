import React from 'react';
import { useReactToPrint } from 'react-to-print';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Sidebar from '../../components/AccountantComponents/Sidebar';
import { Row, Col } from 'react-bootstrap';

const PrintableTransactionReport = React.forwardRef(({ totalAmounts }, ref) => {
    const calculateIncome = () => {
        // Assuming 'Sales' is the type for income
        const salesTotal = totalAmounts['Sales'] || 0;
        // Subtracting other types from sales to get income
        const income = salesTotal - Object.values(totalAmounts)
            .filter((type) => type !== salesTotal)
            .reduce((acc, curr) => acc + curr, 0);
        return income.toFixed(2); // Assuming you want to display income with 2 decimal places
    };
    return (
        <div ref={ref} className="transaction-summary">
            <div className="mb-3" style={{ paddingTop: "20px" }}> {/* Add padding above the Row */}
                <Row className="mb-20 pb-3">
                    <Col className="bg-danger text-white p-3 rounded d-flex align-items-center justify-content-center">
                        <div>
                            <h2>Total Income</h2>
                            <p><strong>Income:</strong> Rs.{calculateIncome()}</p>
                        </div>
                    </Col>
                    <Col className="bg-secondary text-white p-3 rounded ms-5">
                        <h3>Transaction Totals</h3>
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

    const handlePrint = useReactToPrint({
        content: () => printableComponentRef.current,
    });

    const handleDownloadPDF = () => {
        html2canvas(printableComponentRef.current).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgWidth = 210;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const marginLeft = 60; // Adjust margin as needed
            const marginRight = 60; // Adjust margin as needed
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
            <div className="d-print-none"> 
            </div>
            <PrintableTransactionReport ref={printableComponentRef} totalAmounts={totalAmounts} />
        </div>
    );
};

export default TransactionReport;
