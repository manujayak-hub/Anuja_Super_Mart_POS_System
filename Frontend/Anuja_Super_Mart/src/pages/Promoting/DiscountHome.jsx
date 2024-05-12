import { Button, Col, Row } from "antd";
import Footers from "../../components/promoting/Footer.component";
import NavBar from "../../components/promoting/NavBar.component";
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init();
export default function DiscountHome() {


    return (
        <>
            <NavBar />
            <div style={{ textAlign: "center" }}>
                <Row >
                    <Col span={12} data-aos="fade-up" data-aos-duration="3000">
                        <p style={{ textAlign: "center", color: "#000000", fontWeight: "bold", marginTop: "100px", fontSize: "18px" }}>

                        Unleash your shopping spree with our incredible deals <br />
                        on a vast array of products! Explore a treasure trove <br />
                        of savings where you'll discover everything you desire <br />
                        at prices that will thrill you. Whether you're hunting <br />
                        for essentials or indulging in luxuries, our offers are <br />
                        unbeatable. Shop now and revel in the joy of <br />
                        fantastic savings!<br />
                            <br />
                        </p>
                        <p style={{ textAlign: "center", color: "#198754", fontWeight: "bold", margin: "40px", fontSize: "16px" }}>
                            Hurry, don't miss out on big savings! Explore our wide<br />
                            selection of products and enjoy great deals. <br />
                            Shop now and save big!<br />
                        </p>
                        <Button type="primary" style={{ backgroundColor: "#198754",boxShadow: "0 2px 4px rgba(0,0,0,0.5)" }}><a href="/viewdiscount" style={{ textDecoration: "none" }}>Go to Discount</a></Button>



                    </Col>
                    
                    <Col span={12}>
                        <img
                            data-aos="flip-left" data-aos-duration="3000" 
                            //data-aos="fade-up" data-aos-duration="3000"
                            src="https://img.freepik.com/free-photo/shopping-cart-full-products-inside-supermarket_123827-28165.jpg?t=st=1715152868~exp=1715156468~hmac=258fb5c6443c484620ca5cdb6f037c47a0d73c0b6a5143f2b8bc456d8d5b8849&w=996"
                            style={{ width: "100%", borderRadius: "100px", padding: "40px" }}
                        ></img>

                    </Col>
                </Row>
                <br/>
                    <br/>
                    <br/>
                    
                <Row >
                    <Col span={12}>
                        <img
                            data-aos="flip-left" data-aos-duration="3000"
                            //data-aos="fade-up" data-aos-duration="3000"
                            src="https://img.freepik.com/free-photo/man-woman-with-medical-masks-out-grocery-shopping-with-shopping-cart_23-2149483200.jpg?t=st=1715496687~exp=1715500287~hmac=0ddcf6052d18b0bcb61730ac256f07fa6335d3a713614c1336adc4c8b10a264f&w=996"
                            style={{ width: "100%", borderRadius: "100px", padding: "40px" }}
                        ></img>

                    </Col>
                    <Col span={12} data-aos="fade-up" data-aos-duration="3000">
                        <p style={{ textAlign: "center", color: "#000000", fontWeight: "bold", marginTop: "100px", fontSize: "16px" }}>

                            
                            Welcome to a world of culinary delights! Indulge your<br/>
                            senses with our exquisite selection of gourmet items,<br/>
                            handpicked for their exceptional quality and taste.<br/>
                            From artisanal cheeses to decadent chocolates,<br/>
                            each product is a masterpiece waiting to be savored.<br/>
                            Treat yourself or surprise someone special with a gift<br/>
                            that's sure to impress. Explore our collection and<br/>
                            elevate your dining experience to new heights of<br/>
                            deliciousness!
                            <br />
                        </p>
                        <p style={{ textAlign: "center", color: "#198754", fontWeight: "bold", margin: "40px", fontSize: "16px" }}>
                            Check out our exclusive discounts made <br/>just for you!...<br />
                        </p>
                       

                    </Col>

                </Row>
                <br /><br /><br />
                <Row >
                    <Col span={12} data-aos="fade-up" data-aos-duration="3000">
                        <p style={{ textAlign: "center", color: "#000000", fontWeight: "bold", marginTop: "100px", fontSize: "16px" }}>

                        Satisfy your sweet tooth with our exclusive discounts on a <br />
                        delectable range of treats! From artisanal chocolates to <br />
                        traditional sweets, our collection is sure to delight your <br />
                        taste buds. Indulge in the finest sweets at prices that are <br />
                        as sweet as our treats. Explore our selection now and treat <br />
                        yourself to something special!<br />

                            <br />
                        </p>
                        <p style={{ textAlign: "center", color: "#198754", fontWeight: "bold", margin: "40px", fontSize: "16px" }}>
                            Hurry, don't miss out on big savings! Explore our wide<br />
                            selection of products and enjoy great deals. <br />
                            Shop now and save big!<br />
                        </p>
                        <Button type="primary" style={{ backgroundColor: "#198754",boxShadow: "0 2px 4px rgba(0,0,0,0.5)" }}><a href="/viewdiscount" style={{ textDecoration: "none" }}>Go to Discount</a></Button>



                    </Col>
                    
                    <Col span={12}>
                        <img
                            data-aos="flip-left" data-aos-duration="3000" 
                            //data-aos="fade-up" data-aos-duration="3000"
                            src="https://img.freepik.com/free-photo/smiling-family-choosing-groceries-showing-ok-gesture_171337-2355.jpg?t=st=1715496909~exp=1715500509~hmac=0833722bde086871cc91d050dad0eb30efe872561f935cfcea6e5b57a9873652&w=996"
                            style={{ width: "100%", borderRadius: "100px", padding: "40px" }}
                        ></img>

                    </Col>
                </Row>

            </div>

            <Footers />

        </>
    )





}

