const express = require('express')
const cors = require('cors');
const Joi = require('joi')


const dotenv = require('dotenv');
const { UserController } = require("./Users/user-controller");
const { ProductController } = require("./Products/product-controller");
const {OrderController} = require("./orders/order-controller")
dotenv.config();

const app = express()
app.use(express.json());
app.use(cors());


const port = process.env.PORT || 3000;

const userController = new UserController();



app.post('/api/v1/auth/login', userController.login);
app.get('/api/v1/users', userController.getAllUsers);
app.get('/api/v1/users/:id', userController.findOne);
app.post('/api/v1/users', userController.save);
app.put('/api/v1/users/:id', userController.updateUserDetails);



const productController = new ProductController();

app.get('/api/v1/products', productController.getAllProducts);
app.get('/api/v1/products/search', productController.searchByname);
app.get('/api/v1/products/:id', productController.findOne);
app.post('/api/v1/products', productController.save);
app.put('/api/v1/products/:id', productController.updateProductDetails);
app.delete('/api/v1/products/:id', productController.delete);

const orderController = new OrderController();

app.post('/api/v1/orders', orderController.save);
app.get('/api/v1/orders/search', orderController. getMyOrders);
app.patch('/api/v1/orders/:id', orderController.updateorderdetails);
app.get('/api/v1/orders/:id', productController.findOne);
app.get('/api/v1/orders', orderController.getAllOrders);




app.listen(port, () => console.log(`Example app listening on port ${port}!`))