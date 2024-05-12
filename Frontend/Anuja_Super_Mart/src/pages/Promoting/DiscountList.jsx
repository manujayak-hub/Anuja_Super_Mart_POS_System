import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Pagination, Input } from "antd";
import Meta from "antd/es/card/Meta";
import { Link } from "react-router-dom";
import Footers from "../../components/promoting/Footer.component";
import NavBar from "../../components/promoting/NavBar.component";
import { SearchOutlined } from "@ant-design/icons";

export default function DiscountList() {
    const [page, setPage] = useState(1);
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        axios
            .get("http://localhost:8000/product")
            .then((response) => setProducts(response.data))
            .catch((error) => console.error(error));
    }, []);

    const handlePaginationChange = (value) => {
        if (value === 1) {
            setPage(1);
        } else {
            setPage(value);
        }
    };

    function calculateNewPrice(productPrice, discount) {
        return productPrice - discount;
    }

    return (
        <>
            <NavBar />
            <div style={{ textAlign: "center", color: "#198754", fontFamily: "serif", fontWeight: "bold", margin: "20px" }}>
                <h2>Discount Delights</h2>
                <h3>----------welcome to Discount Delights----------</h3><br></br>
                <p style={{ color: "#000000" }}>Your ultimate destination for unbeatable saving! dive into a world of incredible deals and
                    discount curated just for you. Don't miss this chance. Hurry up and visit us!
                </p>
            </div>
            <Input
                    placeholder="Search by Product Name"
                    prefix={<SearchOutlined />}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ marginBottom: "20px", width: "300px" , marginLeft:"650px",marginTop:"50px" }}
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
            <Footers />
        </>
    );
}
