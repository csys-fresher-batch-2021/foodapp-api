const { UserService } = require("./user-service");
const userService = new UserService();
const Joi = require("@hapi/joi");

class UserController {

    /**
    * Function to Login
    * @param {*} user 
    */

    login(req, res) {
        let { email, password } = req.body;

        userService.login(email, password).then(result => {
            let user = result;
            console.log(user);
            res.status(200).json(user);
        }).catch(err => {
            console.log(err);
            console.error("Error", err.message);
            res.status(500).json({ errorMessage: err.message });
        });
    }

    /**
    * Function to get AllUsers
    * @param {*} user 
    */




    getAllUsers(req, res) {
        userService.getAllUsers().then(result => {
            let users = result;
            console.log(users);
            res.status(200).json({
                message: "All Users",
                users
            });
        }).catch(err => {
            console.log(err);
            console.error("Error", err.message);
            res.status(500).json({ erorMessage: err.message });
        });
    }

    /**
     * Function to get UsersById
     * @param {*} user 
     */


    findOne(req, res) {
        console.log("user-controller --- findOne")
        let userId = req.params.id;
        console.log(userId);
        userService.findOne(userId).then(result => {
            let user = result;
            console.log(user);
            res.status(200).json(user);
        }).catch(err => {
            console.log(err);
            console.error("Error", err.message);
            res.status(404).json({ errorMessage: err.message });
        });
    };


    /**
     * Function to Create NewUser
     * @param {*} user 
     */

    save(req, res) {

        let user = req.body;
        userService.save(user).then(result => {
            let data = result;
            res.status(201).json({
                message: "successfully Registered",
                data: data
            });
        }).catch(err => {
            console.error("Error", err.message);
            res.status(500).json({ errorMessage: err.message });
        });
    }

     /**
     * Function to Update User
     * @param {*} user 
     */



    updateUserDetails(req, res) {
        console.log("user-controller --- updateUserDetails")

        let userId = req.params.id;
        let user = req.body;
        user._id = userId;
        userService.update(user).then(result => {
            let data = result;
            res.status(200).json({
                message: "Updated Successfully",
                data: data

            });
        }).catch(err => {
            console.error("Error", err.message);
            res.status(500).json({ errorMessage: err.message });
        });
    }


}
exports.UserController = UserController;
