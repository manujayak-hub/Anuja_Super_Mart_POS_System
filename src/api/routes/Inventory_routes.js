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
        await sendMailController.sendLowInventoryEmail();
        res.status(200).json({ message: 'Low inventory alert email sent successfully.' });
    } catch (error) {
        console.error('Error triggering low inventory email:', error);
        res.status(500).json({ error: 'Failed to send low inventory alert email.' });
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
