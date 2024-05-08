import { useState } from "react";
import { Col, Row, message } from "antd";
import axios from "axios";
import Footers from "../../components/promoting/Footer.component";
import NavBar from "../../components/promoting/NavSalesManager.component";

export default function SendMail() {
  const [email, setEmail] = useState("");
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !file) {
      message.error("Please enter an email and select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("email", email);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const fileContent = reader.result.split(",")[1]; // Extract base64 content
      formData.append("file", fileContent);

      try {
        const response = await axios.post("/sendmail", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (response.status === 200) {
          message.success("Email sent successfully.");
        } else {
          message.error("Failed to send email. Please try again later.");
        }
      } catch (error) {
        console.error(error);
        message.error("Failed to send email. Please try again later.");
      }
    };
  };

  return (
    <>
      <NavBar />
      <div>
        <Row justify="center" className="mt-5">
          <Col lg={18} sm={15}>
            <h3>Send Mail</h3>
            <br /><br />
            <form
              className="bs1 p-2"
              style={{
                display: "flex",
                borderRadius: "20px",
                border: "1px solid #ddd",
                boxShadow: "0 2px 4px rgba(0,0,0,1)",
              }}
              onSubmit={handleSubmit}
            >
              <div style={{ flex: 1, padding: "35px" }}>
                <div className="form-group">
                  <label>Mail: </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <br />

                <div className="form-group">
                  <label>Attachfile: </label>
                  <input
                    type="file"
                    className="form-control"
                    id="productName"
                    required
                    onChange={handleFileChange}
                  />
                </div>
                <br />

                <div className="form-group">
                  <input
                    type="submit"
                    value="Send"
                    className="btn btn-primary"
                    style={{
                      borderRadius: "10px",
                      width: "50%",
                      height: "40px",
                      backgroundColor: "#FD204F",
                      border: "1px solid #FD204F", // Border color
                      boxShadow: "0 2px 4px rgba(0,0,0,0.5)", // Shadow
                    }}
                  />
                </div>
              </div>

              <div
                //image
                style={{
                  flex: 1,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src="https://img.freepik.com/free-vector/ordering-goods-online-internet-store-online-shopping-niche-e-commerce-website-mother-buying-babies-clothes-footwear-toys-infant-accessories-vector-isolated-concept-metaphor-illustration_335657-2764.jpg?t=st=1710846519~exp=1710850119~hmac=c28fcc956b3e857dfc774721f75422131f595fba0bb9dc997af8696f92816bf6&w=740"
                  style={{ width: "400px", height: "400px" }}
                />
              </div>
            </form>
            <br />
          </Col>
        </Row>

        <Footers />
      </div>
    </>
  );
}
