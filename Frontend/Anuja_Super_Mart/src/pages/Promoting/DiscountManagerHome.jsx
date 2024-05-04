import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Pagination, Input, Button } from "antd";
import Meta from "antd/es/card/Meta";
import { Link } from "react-router-dom";
import { Popconfirm } from "antd";
import Footers from "../../components/promoting/Footer.component";
import NavBar from "../../components/promoting/NavBar.component";
import { DeleteFilled, EditOutlined, SearchOutlined, DownloadOutlined } from "@ant-design/icons";
import { PDFDownloadLink, PDFViewer, Document, Page, View, Text } from '@react-pdf/renderer';

export default function DiscountManagerHome() {
    const [page, setPage] = useState(1);
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        axios.get('http://localhost:8000/product')
            .then(response => setProducts(response.data))
            .catch(error => console.error(error));
    }, []);

    const handlePaginationChange = (value) => {
        if (value === 1) {
            setPage(1);
        } else {
            setPage(value);
        }
    };

    const handleDelete = (productId) => {
        axios.delete(`http://localhost:8000/product/${productId}`)
            .then(() => {
                setProducts(products.filter(product => product._id !== productId));
            })
            .catch(err => {
                alert(err.message);
            });
    };

    function calculateNewPrice(productPrice, discount) {
        return productPrice - discount;
    }

    return (
        <>
            <NavBar />
            <Input
                placeholder="Search by Product Name"
                prefix={<SearchOutlined />}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ marginBottom: "20px", width: "300px", marginLeft: "650px", marginTop: "50px" }}
            />
            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "20px",
                flexDirection: "row",
                flexWrap: "wrap",
                marginTop: "50px",
            }}>
                {products
                    .filter((product) =>
                        product.productName.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .slice((page - 1) * 4, page * 4)
                    .map((product) => (
                        <div key={product._id}>
                            <Card
                                style={{
                                    width: 300,
                                    boxShadow: "rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px"
                                }}
                                cover={
                                    <img
                                        alt={product.productName}
                                        src={product.imageUrl}
                                        style={{
                                            objectFit: "cover",
                                            height: "200px",
                                            width: "100%",
                                        }}
                                    />
                                }
                                actions={[
                                    <Link to={`/edit/${product._id}`}>
                                        <EditOutlined
                                            key="edit"
                                            style={{
                                                color: "green",
                                            }}
                                        />
                                    </Link>,
                                    <Popconfirm
                                        title="Are you sure to delete this product?"
                                        onConfirm={() => handleDelete(product._id)}
                                        onCancel={() => { }}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <DeleteFilled
                                            key="delete"
                                            style={{
                                                color: "red",
                                            }}
                                        />
                                    </Popconfirm>
                                ]}
                            >
                                <Meta style={{ textAlign: "center" }}
                                    title={product.productName}
                                    description={
                                        <div>
                                            <p>Price: {product.productPrice} LKR </p>
                                            <p>New Discount: {product.discount} LKR </p>
                                            <p>New Price: {calculateNewPrice(product.productPrice, product.discount)} LKR </p>
                                        </div>
                                    }
                                />
                            </Card>
                        </div>
                    ))}
            </div>
            <Pagination
                style={{
                    marginTop: "50px",
                    textAlign: "center",
                    marginBottom: "50px",
                }}
                defaultCurrent={1}
                total={products.length}
                defaultPageSize={4}
                onChange={handlePaginationChange}
            />
            <div style={{ textAlign: "center" }}>
                <PDFDownloadLink document={<PdfDocument data={products} />} fileName="discount_details.pdf">
                    <Button type="primary" icon={<DownloadOutlined />}>Download PDF</Button>
                </PDFDownloadLink>
            </div>
            <Footers />
        </>
    )
}

// PDF Document Component
const PdfDocument = ({ data }) => (
    <Document>
        <Page>
            <View style={{ padding: 10 }}>
                <Text style={{ marginBottom: 10 }}>Discount Details</Text>
                {data.map((product, index) => (
                    <View key={product._id} style={{ marginBottom: index < data.length - 1 ? 20 : 0 }}>
                        <Text>{product.productName}</Text>
                        <Text>Price: {product.productPrice} LKR</Text>
                        <Text>Discount: {product.discount} LKR</Text>
                    </View>
                ))}
            </View>
        </Page>
    </Document>
);
