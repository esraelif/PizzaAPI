"use strict"
const sendMail = require("../helpers/sendMail")
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const Order = require("../models/order")
const Pizza = require("../models/pizza")
module.exports = {
    list: async (req, res) => {
        let customFilter = {}
        if (!req.user.isAdmin) {
            customFilter = { userId: req.user._id }
        }
        const data = await res.getModelList(Order, customFilter, ["userId", { path: "pizzaId", select: "-__v", populate: { path: "toppingIds", select: "name" } }])
        res.status(200).send({
            error: false,
            details: await res.getModelListDetails,
            data
        })
    },
    //CRUD
    create: async (req, res) => {
        //delete req.body.amount amount alanını db ye eklememek için
        if (!req.user.isAdmin) {
            req.body.userId = req.user._id //*istek atan user
        }

        const data = await Order.create(req.body)
        const pizzaData = await Pizza.findOne({ _id: data.pizzaId })
        sendMail(req.user.email, "Order Create", `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Confirmation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding: 10px 0;
            background-color: #007BFF;
            color: #ffffff;
            border-radius: 5px 5px 0 0;
        }
        .content {
            padding: 20px;
        }
        .content h1 {
            margin-top: 0;
        }
        .content p {
            line-height: 1.6;
        }
        .order-details {
            margin: 20px 0;
            padding: 10px;
            background-color: #f9f9f9;
            border: 1px solid #ddd;
            border-radius: 5px;
        }
        .order-details table {
            width: 100%;
            border-collapse: collapse;
        }
        .order-details table, .order-details th, .order-details td {
            border: 1px solid #ddd;
        }
        .order-details th, .order-details td {
            padding: 10px;
            text-align: left;
        }
        .footer {
            text-align: center;
            padding: 10px 0;
            color: #777;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Order Confirmation</h1>
        </div>
        <div class="content">
            <h2>Hello, ${data.username}!</h2>
            <p>Thank you for your order. Here are the details of your recent purchase:</p>
            <div class="order-details">
                <table>
                    <tr>
                        <th>Order ID</th>
                        <td>${data._id}</td>
                    </tr>
                    <tr>
                        <th>Pizza</th>
                        <td>${pizzaData.name}</td>
                    </tr>
                    <tr>
                        <th>Size</th>
                        <td>${data.size}</td>
                    </tr>
                    <tr>
                        <th>Quantity</th>
                        <td>${data.quantity}</td>
                    </tr>
                    <tr>
                        <th>Price</th>
                        <td>${data.price}</td>
                    </tr>
                    <tr>
                        <th>Total Amount</th>
                        <td>${data.amount}</td>
                    </tr>
                </table>
            </div>
            <p>If you have any questions, feel free to contact us.</p>
            <p>Best regards,<br>The Pizza Shop Team</p>
        </div>
        <div class="footer">
            <p>&copy; 2024 The Pizza Shop. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`,)
        res.status(201).send({
            error: false,
            data
        })
    },
    read: async (req, res) => {
        let customFilter = {}
        const data = await Order.findOne({ _id: req.params.id, ...customFilter }).populate("userId", "pizzaId")
        res.status(200).send({
            error: false,
            data
        })
    },
    update: async (req, res) => {
        //delete req.body.amount amount alanını db ye eklememek için,amount hesaplamasını getters ile yapıyoruz.
        const data = await Order.updateOne({ _id: req.params.id }, req.body, { runValidators: true })
        res.status(202).send({
            error: false,
            data,
            newData: await Order.findOne({ _id: req.params.id })


        })
    },
    delete: async (req, res) => {
        const data = await Order.deleteOne({ _id: req.params.id })
        res.status(data.deletedCount ? 204 : 404).send({
            error: !data.deletedCount,
            data,
            message: "Order not found"
        }
        )
    }
}