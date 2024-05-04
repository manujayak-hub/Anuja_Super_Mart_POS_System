import express from 'express';
const invRoute = express.Router();
import sendMailController from '../../api/controllers/Sendmail_Controller';

import {
    createInventory,
    deleteInventory,
    updateInventory,
    getallinventory,
    getbyIdInventory,
    findInventoryByName,
    findInventoryByProductId,
    findInventoryByCategory
} from '../controllers/inventory_controller';

invRoute.get('/lowstock', async (req, res) => {
    try {
        // Attempt to send the low inventory email
        const emailResult = await sendMailController.sendLowInventoryEmail();
        // Send the appropriate response based on the result
        res.status(200).json({ message: emailResult.message, success: emailResult.success });
    } catch (error) {
        // If there's an error, send a failure response
        console.error('Error triggering low inventory email:', error);
        res.status(500).json({ message: 'Failed to send low inventory alert email.', success: false });
    }
});

invRoute.get('/', getallinventory);
invRoute.get('/:id', getbyIdInventory);
invRoute.post('/', createInventory);
invRoute.delete('/:id', deleteInventory);
invRoute.patch('/:id', updateInventory);
invRoute.get('/name/:itemName', findInventoryByName);
invRoute.get('/productid/:productId', findInventoryByProductId);
invRoute.get('/category/:categoryName', findInventoryByCategory);

module.exports = invRoute;
