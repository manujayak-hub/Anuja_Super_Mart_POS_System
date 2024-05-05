import { Row, Col, DatePicker, Input, Button } from "antd";
import { SearchOutlined, DownloadOutlined } from '@ant-design/icons';
import { useState, useEffect } from "react";
import axios from "axios";
import { PDFDownloadLink, Document, Page, View, Text } from '@react-pdf/renderer';
import NavBar from "../../components/Analytics_components/NavBar.component";
import Footers from "../../components/Analytics_components/Footer.component";

export default function AdminReport() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    function getOrders() {
      axios.get("http://localhost:8000/order").then((res) => {
        setOrders(res.data);
        setFilteredOrders(res.data);
      }).catch((err) => {
        alert(err.message);
      });
    }
    getOrders();
  }, []);

  const handleSearch = () => {
    const filteredOrders = orders.filter(
      (order) => order.customerId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                 order.orderId.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredOrders(filteredOrders);
  };

  const handleDateChange = (dates) => {
    if (dates && dates.length === 2) {
      setStartDate(dates[0]);
      setEndDate(dates[1]);
      const filteredOrders = orders.filter(
        (order) => new Date(order.date) >= dates[0] && new Date(order.date) <= dates[1]
      );
      setFilteredOrders(filteredOrders);
    }
  };

  const PdfDocument = ({ data }) => (
    <Document>
      <Page>
        <View style={{ padding: 10 }}>
          <Text style={{ marginBottom: 10 }}>Order Details</Text>
          {data.map((order, index) => (
            <View key={order._id} style={{ marginBottom: index < data.length - 1 ? 20 : 0 }}>
              <Text>{order.customerId}</Text>
              <Text>{order.orderId}</Text>
              <Text>{order.ItemName}</Text>
              <Text>{new Date(order.date).toLocaleDateString("en-GB")}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );

  return (
    <>
      <NavBar />
      <Row style={{ minHeight: "calc(100vh - 64px - 70px)" }}>
        <Col span={4} style={{ boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)", backgroundColor: "#f0f0f0", padding: "20px" }}>
          <div style={{ paddingTop: "20vh" }}>
            <a href="/analytics" style={{ textDecoration: "none", color: "#000000", fontWeight: "bold" }}>Sales Analytics</a>
            <br /><hr />
            <a href="/adminreport" style={{ textDecoration: "none", color: "#FD204F", fontWeight: "bold" }}>Report</a>
            <br /><hr />
            <a href="/adminfeedbacklist" style={{ textDecoration: "none", color: "#000000", fontWeight: "bold" }}>Feedback</a>
            <hr />
          </div>
        </Col>
        <Col span={18} style={{ margin: "20px auto", textAlign: "center" }}>
          <h1>All Orders</h1>
          <DatePicker.RangePicker
            onChange={handleDateChange}
            style={{ marginBottom: "20px",marginLeft: "auto", marginTop: "10px"  }}
          />
          <Input
            placeholder="Search by Order ID"
            prefix={<SearchOutlined />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onPressEnter={handleSearch}
            style={{ marginBottom: "20px", width: "300px", marginLeft: "20px", marginTop: "10px" }}
          />
          <Button type="primary" icon={<DownloadOutlined />} style={{ marginLeft: "30px", backgroundColor: "#FD204F" }}>
            <PDFDownloadLink document={<PdfDocument data={filteredOrders} />} fileName="order_details.pdf" style={{ textDecoration: "none" }}>
              Download PDF
            </PDFDownloadLink>
          </Button>
          <table className="table table-success table-striped">
            <thead>
              <tr className="table-dark">
                <th scope="col">Customer_ID</th>
                <th scope="col">Order_ID</th>
                <th scope="col">Item_Name</th>
                <th scope="col">Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center" }}>No orders found.</td>
                </tr>
              ) : (
                filteredOrders.map(order => (
                  <tr key={order._id}>
                    <td>{order.customerId}</td>
                    <td>{order.orderId}</td>
                    <td>{order.ItemName}</td>
                    <td>{new Date(order.date).toLocaleDateString("en-GB")}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </Col>
      </Row>
      <Footers />
    </>
  );
}
