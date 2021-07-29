const { UserDAO } = require("./user-dao");
const userDAO = new UserDAO();
const UserValidator = require('../validator/uservalidation.js');
const Joi = require('joi');
const emailCheck = require("email-check");

class UserService {


    /**
      * Function to get AllUsers
      * @param {*} user 
      */

    async getAllUsers() {

        return userDAO.getAllUsers();
    }


    /**
  * Function to Login
  * @param {*} user 
  */

    async login(email, password) {



        try {
            let loginObject = { email, password }
            const output = UserValidator.authSchema().validate(loginObject);
            console.log(output)
            if (output.error != null) {
                throw new Error(output.error);
            }
            let user = await userDAO.login(email, password);

            if (user == null) {
                throw new Error("Invalid Login Credentials");
            }
            return user;
        }
        catch (err) {
            console.error(err.message);
            throw new Error(err.message);

        };
    }

    /**
      * Function to get UsersById
      * @param {*} user 
      */

    async findOne(userId) {
        console.log("user-service --- findOne")

        try {
            let user = await userDAO.findOne(userId);
            return user;
        }
        catch (err) {
            console.error(err);
            throw new Error(err.message);
        }


    }


    /**
   * Function to Create NewUser
   * @param {*} user 
   */

    async save(user) {

        const result = UserValidator.userSchema().validate(user);
        try {
            if (result.error != null) {
                throw new Error(result.error);
            }
            // const oldUser = await userDAO.getAllUsers(user.email)
            // console.log(oldUser)
            // if (oldUser) {
            //     throw new Error("Email Already Registered");
            // }
            return userDAO.save(user);
        }
        catch (err) {
            console.error(err.message);
            throw new Error(err.message);

        };
    }

    /**
      * Function to Update User
      * @param {*} user 
      */

    async update(user) {
        console.log("user-service --- update")
        const output = UserValidator.updateSchema().validate(user);

        try {
            if (output.error != null) {
                throw new Error(output.error);
            }
            let actualRecord = await userDAO.findOne(user._id);
            if (!actualRecord) {
                throw new Error(" Id not found");
            }

            //update - name,email,password,phone,role
            actualRecord.username = user.username;
            actualRecord.email = user.email;
            actualRecord.password = user.password;
            actualRecord.phone = user.phone;
            actualRecord.role = user.role;

            let result = await userDAO.update(actualRecord);
            return result.data;

        } catch (err) {
            console.log(err.message);
            console.error("Error", err.message);
            throw new Error(err.message);
        }

    }


}
exports.UserService = UserService;
