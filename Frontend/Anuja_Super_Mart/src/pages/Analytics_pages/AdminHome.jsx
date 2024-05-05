import { Row, Col, Card } from "antd";
import { useEffect, useState, useRef } from "react";
import { Chart } from "chart.js/auto";
import NavBar from "../../components/Analytics_components/NavBar.component";
import Footers from "../../components/Analytics_components/Footer.component";

export default function AdminHome() {

    const [reactionData, setReactionData] = useState([]);
    const chartRef = useRef(null);
    const [feedbackCount, setFeedbackCount] = useState(0);
    const [orderCount, setOrderCount] = useState(0);

    useEffect(() => {
        fetch('http://localhost:8000/feedback')
            .then(response => response.json())
            .then(data => {
                const reactionCounts = {};
                data.forEach(feedback => {
                    if (feedback.reaction in reactionCounts) {
                        reactionCounts[feedback.reaction]++;
                    } else {
                        reactionCounts[feedback.reaction] = 1;
                    }
                });
                setReactionData(reactionCounts);
            })
            .catch(error => console.error('Error:', error));
    }, []);

    useEffect(() => {
        fetch('http://localhost:8000/order') 
            .then(response => response.json())
            .then(data => {
                setOrderCount(data.length); 
            })
            .catch(error => console.error('Error:', error));
    }, []);

    useEffect(() => {
        fetch('http://localhost:8000/feedback')
            .then(response => response.json())
            .then(data => {
                setFeedbackCount(data.length);
            })
            .catch(error => console.error('Error:', error));
    }, []);


    useEffect(() => {
        if (Object.keys(reactionData).length > 0) {
            if (chartRef.current !== null) {
                chartRef.current.destroy();      // D ex chart if ex
            }
            const ctx = document.getElementById('myChart').getContext('2d');
            const newChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: Object.keys(reactionData),
                    datasets: [{
                        data: Object.values(reactionData),
                        backgroundColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(96, 40, 145, 1)',
                        ],
                        borderColor: [
                            'rgba(0, 0, 0, 1)',
                            
                        ],
                        borderWidth: 2
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
            chartRef.current = newChart; // Store the chart instance in ref
        }
    }, [reactionData]);

    return (
        <>
            <NavBar />

            <Row style={{ minHeight: "calc(100vh - 64px - 70px)" }}>
                <Col span={4} style={{ boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)", backgroundColor: "#f0f0f0", padding: "20px" }}>

                    <div style={{ paddingTop: "20vh" }}>
                        <a href="/analytics" style={{ textDecoration: "none", color: "#FD204F", fontWeight: "bold", }}>Sales Analytics</a>
                        <br /><hr />
                        <a href="/adminreport" style={{ textDecoration: "none", color: "#000000", fontWeight: "bold" }}>Report</a>
                        <br /><hr />
                        <a href="/adminfeedbacklist" style={{ textDecoration: "none", color: "#000000", fontWeight: "bold" }}>Feedback</a>
                        <hr />
                    </div>

                </Col>


                <Col span={20}>
                    
                    <Row justify="center"style={{ padding: "20px" }}>
                        <Col xs={24} sm={12} style={{ padding: "20px", }}>
                        <Card title={<h2 style={{ fontSize: "24px", textAlign: "center", }}>Order Total Count</h2>} style={{ backgroundColor: "#f0f0f0", textAlign: "center", boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.9)" }}> 
                        <h3 style={{ fontSize: "24px", color: "#FD204F", fontWeight: "bold" }}>{orderCount}</h3>
                        </Card>
                        </Col>
                        <Col xs={24} sm={12} style={{ padding: "20px" }}>
                        <Card title={<h2 style={{ fontSize: "24px", textAlign: "center"  }}>Feedback Count</h2>} style={{ backgroundColor: "#f0f0f0", textAlign: "center",boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.9)" }}>
                            <h3 style={{ fontSize: "24px", color: "#FD204F", fontWeight: "bold" }}>{feedbackCount}</h3>
                            </Card>
                            
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={24} sm={24}style={{ padding: "20px" }}>
                            <canvas id="myChart" width="500" height="500"></canvas>
                        </Col>

                        
                    </Row>

                </Col>
            </Row>

            <Footers />

        </>
    )
}
