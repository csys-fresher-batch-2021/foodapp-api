const { HttpClient } = require("../http-client");
const dotenv = require('dotenv');
dotenv.config();
const httpClient = new HttpClient();

class OrderDAO {
    DB_URL = null;
    constructor() {
      this.DB_URL = process.env.DB_URL;
      console.log("DB_URL=" , this.DB_URL);
    }
  
    async getAllOrders() {
      const url = this.DB_URL + "/orders/_all_docs?include_docs=true";    
      try {
        let result = await httpClient.get(url);
        console.log("Result", result);
        let rows = result.data.rows
          .filter((obj) => !obj.id.includes("_design"))
          .map((obj) => obj.doc);
        return rows;
      } catch (err) {
        this.handleErrorMessage(err);
      }
    }

    //post my orders

    async save(order) {  
      console.log(order)  
        const url = this.DB_URL + "/orders";    
        try {
         await httpClient.post(url, order);
        } catch (err) {
          this.handleErrorMessage(err);
        }
      }

//delete my orders


async update(order) {
  const url = this.DB_URL + "/orders/" + order._id + "?rev=" + order._rev;    
  try {
    let result = await httpClient.put(url, order);
    return result.data;
  } catch (err) {
    this.handleErrorMessage(err);
  }
}
    
async findOne(orderId) {
  const url = this.DB_URL + "/orders/" + orderId;    
  try {
    let result = await httpClient.get(url);
    return result.data;
  } catch (err) {
    this.handleErrorMessage(err);
  }
}





    async getMyOrders(userId){


        let selector = {
            "selector": {
                "userId": userId.toString('base64')           
            },
            "fields":[ "_id","_rev", "name", "price", "total","quantity","orderDate","status"]
        };

        const url = this.DB_URL + '/orders/_find';
      
        try{
            
            let result = await httpClient.post(url,selector);
            let rows = result.data.docs;
            return rows;        
        }
        catch(err){
            this.handleErrorMessage(err);
        };

    }

    handleErrorMessage(err) {
        console.error(err);
        let response = err.response.data;
        let errorMessage = err.response.data.error;
        console.log("errorMessage:" + errorMessage);
        if (response.error == "not_found" ) {
          if (response.reason == "Database does not exist."){
            throw new Error("Database not found");
          }
          else{
            throw new Error("Data not found");
          }
        } else {
          throw new Error(errorMessage);
        }
      }
    

}
exports.OrderDAO = OrderDAO;