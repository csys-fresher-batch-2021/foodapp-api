
const { OrderDAO } = require("./order-dao");
const orderDAO = new OrderDAO();

class OrderService {





    async getAllOrders() {

        return orderDAO.getAllOrders();
    }

    //post my orders

    async save(order) {

        console.log(order);

        try {

            let result = await orderDAO.save(order);
            return result;

        }
        catch (err) {
            console.error(err.message);
            throw new Error(err.message);

        };
    }
    async findOne(orderId) {
        console.log("user-service --- findOne")

        try {
            let order = await orderDAO.findOne(orderId);
            return order;
        }
        catch (err) {
            console.error(err);
            throw new Error(err.message);
        }


    }

    async update(order) {
        console.log("order-service --- update")

        try {
            const output = OrderValidator.updateorderSchema().validate(order);
            if (output.error != null) {
                throw new Error(output.error);
            }
            let actualRecord = await orderDAO.findOne(order._id);
            if (!actualRecord) {
                throw new Error("order Id not found");
            }

            //update - status
            actualRecord.status = order.status;


            let result = await orderDAO.update(actualRecord);
            return result.data;

        } catch (err) {
            console.log(err.message);
            console.error("Error", err.message);
            throw new Error(err.message);
        }

    }



    //get my orders

    async searchId(userId) {

        return orderDAO.getMyOrders(userId);
    }

}

exports.OrderService = OrderService;
