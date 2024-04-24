import { createTransport } from 'nodemailer';
import Inventory from '../models/inventory_model';

const sendLowInventoryEmail = async () => {
    try {
        // Find all products with quantity less than 10
        const lowInventoryProducts = await Inventory.find({ quantityInStock: { $lt: 10 } });

        // If there are no low inventory products, do nothing
        if (lowInventoryProducts.length === 0) {
            console.log('No low inventory products found.');
            return;
        }

        // Create transporter object using SMTP transport
        let transporter = createTransport({
            service: 'gmail',
            auth: {
                user: 'webloftmas@gmail.com',
                pass: 'elgv aobm kvsg tkbj'
            }
        });

        // Compose email
        let mailOptions = {
            from: 'inventoryManager@anuja.com',
            to: 'manujayak8@gmail.com',
            subject: 'Low Inventory Alert',
            text: 'The following products are running low on inventory:',
            html: `<p>Dear Inventory Manager,</p>
                    <p>This is to inform you that the following products are running low on inventory:</p>
                    <table style="border-collapse: collapse;">
                        <thead>
                            <tr>
                                <th style="border: 1px solid #ddd; padding: 8px;">Product Name</th>
                                <th style="border: 1px solid #ddd; padding: 8px;">Quantity Left</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${lowInventoryProducts.map(product => `
                                <tr>
                                    <td style="border: 1px solid #ddd; padding: 8px;">${product.productName}</td>
                                    <td style="border: 1px solid #ddd; padding: 8px;">${product.quantityInStock}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                    <p>Please take necessary actions to restock the inventory.</p>
                    <p>Thank you.</p>`

        };

        // Send email
        await transporter.sendMail(mailOptions);
        console.log('Low inventory alert email sent successfully.');
    } catch (error) {
        console.error('Error sending low inventory alert email:', error);
        throw error; // Rethrow the error to be caught in the calling function
    }
};

export default { sendLowInventoryEmail };
