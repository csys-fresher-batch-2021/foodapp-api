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