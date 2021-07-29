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
            res.status(500).json({ erorMessage: err.message });
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
            res.status(500).json({ erorMessage: err.message });
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
            res.status(404).json({ errorMessage: err.message });
        });
    }


     /**
   * Function to Create NewProduct
   * @param {*} user 
   */


    save(req, res) {

        let product = req.body;
        productService.save(product).then(result => {
            let data = result;
            res.status(201).json({
                message: "Product Added Successfully",
                data
            });
        }).catch(err => {
            console.error("Error", err.message);
            res.status(500).json({ errorMessage: err.message });
        });
    }

  /**
   * Function to Update Product
   * @param {*} user 
   */


    updateProductDetails(req, res) {

        let productId = req.params.id;
        let product = req.body;
        product._id = productId;

        productService.update(product).then(result => {
            let data = result;
            res.status(200).json({
                message: "Product Updated Successfully",
                data
            });
        }).catch(err => {
            console.error("Error", err.message);
            res.status(500).json({ errorMessage: err.message });
        });
    }


  /**
   * Function to Delete Product
   * @param {*} user 
   */


    delete(req, res) {
        let productId = req.params.id;
        productService.delete(productId).then(result => {
            let data = result;
            res.status(200).json({
                message: "Product Deleted Successfully",
                data
            });
        }).catch(err => {
            console.error("Error", err.message);
            res.status(500).json({ errorMessage: err.message });
        });
    }


}
exports.ProductController = ProductController;