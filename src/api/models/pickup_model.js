import mongoose from "mongoose";

const pickupSchema = new mongoose.Schema({
    Pickupid: {
        type: String
    },
    userid: {
        type: String
    },
    items: [{
        itemName: {
            type: String
        },
        quantity: {
            type: Number
        },
        itemPrice: {
            type: Number
        }
    }],
    TotalPrice: {
        type: Number
    }
    // Add more fields as needed
});

const Pickup = mongoose.model('Pickup', pickupSchema);

export default Pickup;
