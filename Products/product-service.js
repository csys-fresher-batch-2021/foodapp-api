const { ProductDAO } = require("./product-dao");
const productDAO = new ProductDAO();

class ProductService {
    

    async  getAllProducts() {

        const products = await productDAO. getAllProducts();
        const productsList = [];
        for(let product of products){
            product.price = parseInt(product.price);
            productsList.push(product);
        }
        return productsList;
    }
    
    async searchname(name) {

        return productDAO.searchByname(name);
    }

    async findOne(productId) {

        try{
            let product = await productDAO.findOne(productId);
            return product;
        }
        catch(err){
            console.error(err);
            throw new Error(err.message);
        }

       
    }
    async save(product) {

        console.log(product);

        try{
           let exists  =  false; //await productDAO.findOne();

           if(exists){
               throw new Error("Email Already Registered");
           }
           
           let result = await productDAO.save(product);
           return result;

        }
        catch(err) {
            console.error(err.message);         
            throw new Error(err.message);
         
        };
    }

    async delete(productId){
       
        try{

            let product = await productDAO.findOne(productId);
            if( !product){
                throw new Error("Product Id not found");
            }
            let result = await productDAO.delete(product);
            return result.data;

        }catch(err ){
            console.log(err.message);
            console.error("Error", err.message);
            throw new Error(err.message);
        }
    }

    async update(product){

        try{
            let actualRecord = await productDAO.findOne(product._id);
            if( !actualRecord){
                throw new Error("Product Id not found");
            }

            //update - name,email,password
            actualRecord.name = product.name;
            actualRecord.image = product.image;
            actualRecord.qty = product.qty;
            actualRecord.price = product.price;

            let result = await productDAO.update(actualRecord);
            return result.data;

        }catch(err ){
            console.log(err.message);
            console.error("Error", err.message);
            throw new Error(err.message);
        }
       
    }


    // async save(product) {

    //     console.log(product);

    //     try{
    //        let exists  =  false; //await userDAO.findOne();

    //        if(exists){
    //            throw new Error("product Already Registered");
    //        }
           
    //        let result = await userDAO.save(product);
    //        return result;

    //     }
    //     catch(err) {
    //         console.error(err.message);         
    //         throw new Error(err.message);
         
    //     };
    // }
}
exports.ProductService = ProductService;