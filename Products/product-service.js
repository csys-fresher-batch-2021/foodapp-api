const { ProductDAO } = require("./product-dao");
const productDAO = new ProductDAO();
const ProductValidator = require('../validator/productvalidation.js');

class ProductService {


    async  getAllProducts() {

        const products = await productDAO.getAllProducts();
        const productsList = [];
        for (let product of products) {
            product.price = parseInt(product.price);
            productsList.push(product);
        }
        return productsList;
    }

    async searchname(name) {

        return productDAO.searchByname(name);
    }

    async findOne(productId) {

        try {
            let product = await productDAO.findOne(productId);
            return product;
        }
        catch (err) {
            console.error(err);
            throw new Error(err.message);
        }


    }
    async save(product) {

        console.log(product);

        const output = ProductValidator.productSchema().validate(product);
        try {
            if (output.error != null) {
                throw new Error(output.error);
            }

            let result = await productDAO.save(product);
            console.log(result)
            return result;
        }
        catch (err) {
            console.error(err.message);
            throw new Error(err.message);

        };
    }

    async delete(productId) {

        try {

            let product = await productDAO.findOne(productId);
            if (!product) {
                throw new Error("Product Id not found");
            }
            let result = await productDAO.delete(product);
            return result.data;

        } catch (err) {
            console.log(err.message);
            console.error("Error", err.message);
            throw new Error(err.message);
        }
    }

    async update(product) {

        try {
            const output = ProductValidator.updateproductSchema().validate(product);
            if (output.error != null) {
                throw new Error(output.error);
            }

            let actualRecord = await productDAO.findOne(product._id);
            if (!actualRecord) {
                throw new Error("Product Id not found");
            }

            //update - name,email,password
            actualRecord.name = product.name;
            actualRecord.imageUrl = product.imageUrl;
            actualRecord.price = product.price;

            let result = await productDAO.update(actualRecord);
            return result.data;

        } catch (err) {
            console.log(err.message);
            console.error("Error", err.message);
            throw new Error(err.message);
        }

    }



}
exports.ProductService = ProductService;