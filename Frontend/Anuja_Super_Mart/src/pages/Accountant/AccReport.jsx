import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../../components/AccountantComponents/Sidebar';

const AccReport = () => {
    const [typeTotals, setTypeTotals] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTypeTotals = async () => {
            try {
                const response = await axios.get('/transactions/get-type-total');

                if (response.data && Array.isArray(response.data)) {
                    setTypeTotals(response.data);
                } else {
                    setError('Type totals data is missing or invalid in the response');
                }
            } catch (error) {
                console.error('Error fetching type totals:', error);
                setError('Failed to fetch type totals');
            }
        };

        fetchTypeTotals();
    }, []);

    return (
        <Sidebar>
            <div>
                <h2>Type Totals</h2>
                {error ? (
                    <p>{error}</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>Type</th>
                                <th>Total Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {typeTotals.length > 0 ? (
                                typeTotals.map((typeTotal, index) => (
                                    <tr key={index}>
                                        <td>{typeTotal.type}</td>
                                        <td>{typeTotal.totalAmount}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="2">No data available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </Sidebar>
    );
};

export default AccReport;
