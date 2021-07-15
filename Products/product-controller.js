const { ProductService } = require("./product-service");
const productService = new ProductService();

class ProductController {    

// Get All Meals

    getAllProducts(req, res) {

        
        productService.getAllProducts().then(result => {
            let products = result;
            console.log(products);
            res.json(products);
        }).catch(err => {
            console.log(err);
            console.error("Error", err.message);
            res.status(500).json({ erorMessage:  err.message });
        });
    }

    // Search Meals By Name

    searchByname(req, res) {

        let name = req.query.name;
        console.log("Name:" + name);
        
        productService.searchname(name).then(result => {
            let products = result;
            console.log(products);
            res.json(products);
        }).catch(err => {
            console.log(err);
            console.error("Error", err.message);
            res.status(500).json({ erorMessage:  err.message });
        });
    }

    

    // Get One meals by Id


    findOne(req, res) {

        let productId = req.params.id;
        console.log(productId);
        productService.findOne(productId).then(result => {
            let product = result;
            console.log(product);            
            res.status(200).json(product);
        }).catch(err => {
            console.log(err);
            console.error("Error", err.message);
            res.status(404).json({errorMessage: err.message});
        });
    }


}
exports.ProductController = ProductController;