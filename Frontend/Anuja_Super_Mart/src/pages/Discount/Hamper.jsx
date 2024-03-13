import './Hamper.css';

const Hamper = () => {
    return (
        <>
            <h1><center>Hamper Details</center></h1>
            <div className="hamper-container">
                <div className="hamper">
                    <h2 className="yellow">Essentials Pantry Hamper</h2>
                    <ul>
                        <li>Rice</li>
                        <li>Pasta</li>
                        <li>Olive Oil</li>
                        <li>Soy Sauce</li>
                        <li>Tea Bags</li>
                        <li>Jam or Fruit Preserves</li>
                        <li>Instant Oatmeal Packets</li>
                        <li>Sugar</li>
                        <li>Snacks</li>
                    </ul>
                </div>

                <div className="hamper">
                    <h2 className="yellow">Happy Evening Hamper</h2>
                    <ul>
                        <li>Peanut Butter</li>
                        <li>Chocolates</li>
                        <li>Crackers</li>
                        <li>Coca cola</li>
                        <li>Specialty jams</li>
                        <li>Mixed nuts</li>
                        <li>Dried fruits</li>
                        <li>Gourmet cookies</li>
                        <li>Truffle oil</li>
                    </ul>
                </div>

                <div className="hamper">
                    <h2 className="yellow">Spa Day Hamper</h2>
                    <ul>
                        <li>Soap</li>
                        <li>Shampoo</li>
                        <li>Conditioner</li>
                        <li>Bath sponge</li>
                        <li>Body lotion</li>
                        <li>Scented Body Oil</li>
                        <li>Exfoliating Scrub</li>
                        <li>Face Mask</li>
                        <li>Toner</li>
                    </ul>
                </div>

                <div className="hamper">
                    <h2 className="yellow">Serendipity Spice Box</h2>
                    <ul>
                        <li>Ceylon Tea</li>
                        <li>Cinnamon Sticks</li>
                        <li>Curry Leaves</li>
                        <li>Turmeric Powder</li>
                        <li>Pol Roti Flour Mix</li>
                        <li>Ambulthiyal Paste</li>
                        <li>String Hopper Flour</li>
                        <li>Jaggery Chunks</li>
                        <li>Cloves</li>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default Hamper;
