
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

async update(order){
    console.log("order-service --- update")

    try{
        let actualRecord = await orderDAO.findOne(order._id);
        if( !actualRecord){
            throw new Error("User Id not found");
        }

        //update - name,email,password
        actualRecord.Status = order.Status;
      

        let result = await orderDAO.update(actualRecord);
        return result.data;

    }catch(err ){
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