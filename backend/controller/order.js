const { userModel } = require('../models/model')

const addOrder = async (req, res) => {
    const { id } = req.params;
    try {
        console.log(req.body)
        const user = await userModel.findById(id)
        req.body.forEach((pro) => {
            user.orders.push({ product: pro })
        })

        await user.save()
        res.status(200).json({ success: true, order: user.orders })
        console.log(user.orders)

    } catch (error) {
        res.status(400).json({ success: false, error })

    }

}


const adminEditOrderStatus = async (req, res) => {
    try {
        const { orderId, newStatus } = req.body;
        
      
        const users = await userModel.find();

      
        let orderFound = false;

        
        users.forEach(async (user) => {
            user.orders = user.orders.map((order) => {
                if (order._id.toString() === orderId.toString()) {
                    order.status = newStatus.toLowerCase();
                    orderFound = true;  
                }
                return order; 
            });

           
            if (orderFound) {
                await user.save();
                orderFound = false; 
            }
        });
        console.log(users)

        if (!orderFound) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        res.status(200).json({ success: true, users });

    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const adminDeleteOrder = async (req, res) => {
    try {
        const { orderId } = req.body;
        
        
        // Find all users
        const users = await userModel.find();

        // Flag to check if any order was found and deleted
        let orderFound = false;

        // Iterate through each user
        for (const user of users) {
            // Filter out the order to be deleted
            const initialLength = user.orders.length;
            user.orders = user.orders.filter(order => order._id.toString() !== orderId.toString());

            // If an order was removed, save the user and set the flag
            if (user.orders.length < initialLength) {
                orderFound = true;
                await user.save();
            }
        }

        if (!orderFound) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        res.status(200).json({ success: true, users });

    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};



module.exports = { addOrder, adminEditOrderStatus,adminDeleteOrder }