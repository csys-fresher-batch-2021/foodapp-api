
const { OrderDAO } = require("./order-dao");
const orderDAO = new OrderDAO();

class OrderService {

//post my orders

    async save(order) {

        console.log(order);

        try{
           let exists  =  false; //await orderDAO.findOne();

           if(exists){
               throw new Error("Email Already Registered");
           }
           
           let result = await orderDAO.save(order);
           return result;

        }
        catch(err) {
            console.error(err.message);         
            throw new Error(err.message);
         
        };
    }

//CANCEL MY ORDERS

    async delete(orderId){

        console.log("service ---orderId")
       
        try{

            let order = await orderDAO.findOne(orderId);
            if( !order){
                throw new Error("order Id not found");
            }
            let result = await orderDAO.delete(order);
            return result.data;

        }catch(err ){
            console.log(err.message);
            console.error("Error", err.message);
            throw new Error(err.message);
        }
    }

  // Find my Orders  

    async findOne(orderId) {

        try{
            let order = await orderDAO.findOne(orderId);
            return order;
        }
        catch(err){
            console.error(err);
            throw new Error(err.message);
        }

       
    }

  //get my orders
     
     async searchId(userId) {

       return orderDAO.getMyOrders(userId);
}
  
}

exports.OrderService = OrderService;
