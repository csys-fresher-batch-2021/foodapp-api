const { HttpClient } = require("../http-client");
const dotenv = require('dotenv');
dotenv.config();
const httpClient = new HttpClient();


class ProductDAO {
    DB_URL = null;
    constructor() {
      this.DB_URL = process.env.DB_URL;
      console.log("DB_URL=" , this.DB_URL);
    }
  

    async getAllProducts() {

        const url = this.DB_URL + '/products/_all_docs?include_docs=true';
        console.log(url);
        try{
            
            let result = await httpClient.get(url);
            console.log("Result", result);
            let rows = result.data.rows
            .filter(obj => !obj.id.includes("_design"))
            .map(obj => obj.doc);
            return rows;        
        }
        catch(err){
            this.handleErrorMessage(err);
        };
    }

    async searchByname(name){


        let selector = {
            "selector": {
                "name": name               
            },
            "fields":[ "_id","_rev", "name", "price", "image"]
        };

        const url = this.DB_URL + '/products/_find';
        try{
            
            let result = await httpClient.post(url,selector);
            let rows = result.data.docs;
            return rows;        
        }
        catch(err){
            this.handleErrorMessage(err);
        };

    }
    async findOne(productId) {
        const url = this.DB_URL + "/products/" + productId;    
        try {
          let result = await httpClient.get(url);
          return result.data;
        } catch (err) {
          this.handleErrorMessage(err);
        }
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

    // async save(product) {

    //     console.log(product);

    //     const apiKey = Buffer.from(process.env.DB_USERNAME + ':' + process.env.DB_PASSWORD).toString('base64');
    //     console.log(apiKey);
    //     const headers  =  {
    //         'Authorization': `Basic ${apiKey}`
    //     };
    //     console.log(headers);

    //     const url = process.env.DB_URL + '/products';
    //     console.log(url);
    //     try{
    //         let result = await axios.post(url,user, { headers: headers });
    //         return result.data;

    //     }
    //     catch(err) {            
    //         this.handleErrorMessage(err);         
    //     };
    // }
}
exports.ProductDAO = ProductDAO;
