const { OrderService } = require("./order-service");
const orderService = new OrderService();

class OrderController{

   //Post Order Details

    save(req, res) {

        let order = req.body;
        orderService.save(order).then(result => {
            let data = result;            
            res.status(201).json(data);
        }).catch(err => {            
            console.error("Error", err.message);
            res.status(500).json({errorMessage: err.message});
        });
    }

    //cancel My orders

    updateorderDetails(req, res) {
        console.log("order-controller --- updateorderDetails")

        let orderId = req.params.id;
        let order = req.body;        
        order._id = orderId;

        orderService.update(order).then(result => {
            let data = result;            
            res.status(200).json(data);
        }).catch(err => {            
            console.error("Error", err.message);
            res.status(500).json({errorMessage: err.message});
        });
    }



//get my orders

      getMyOrders(req, res) {

        let userId = req.query.userId;
        console.log("userId:" + userId);
        
        orderService.searchId(userId).then(result => {
            let orders = result;
            console.log(orders);
            res.json(orders);
        }).catch(err => {
            console.log(err);
            console.error("Error", err.message);
            res.json({ erorMessage:  err.message });
        });
    }


}
exports.OrderController = OrderController;