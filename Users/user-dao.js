const { HttpClient } = require("../http-client");
const dotenv = require('dotenv');
dotenv.config();
const httpClient = new HttpClient();

class UserDAO {
  DB_URL = null;
  constructor() {
    this.DB_URL = process.env.DB_URL;
    console.log("DB_URL=", this.DB_URL);
  }

  /**
     * Function to get AllUsers
     * @param {*} user 
     */

  async getAllUsers(user) {
    console.log(user)
    const url = this.DB_URL + "/users/_all_docs?include_docs=true";
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

  /**
   * Function to Login
   * @param {*} user 
   */

  async login(email, password) {
    let query = {
      selector: {
        email: email,
        password: password
      },
      fields: ["_id", "_rev", "username", "email"],
    };

    const url = this.DB_URL + "/users/_find";
    try {
      let result = await httpClient.post(url, query);
      let rows = result.data.docs;
      return rows.length > 0 ? rows[0] : null;
    } catch (err) {
      this.handleErrorMessage(err);
    }
  }

  /**
   * Function to get UsersById
   * @param {*} user 
   */
  async findOne(userId) {

    console.log(userId)
    const url = this.DB_URL + "/users/" + userId;
    console.log(url)
    try {
      let result = await httpClient.get(url);
      return result.data;
    } catch (err) {
      this.handleErrorMessage(err);
    }
  }

  /**
   * Function to Create NewUser
   * @param {*} user 
   */

  async save(user) {
    const url = this.DB_URL + "/users";
    try {
      let result = await httpClient.post(url, user);
      console.log(result);
      return result.data;
    } catch (err) {
      this.handleErrorMessage(err);
    }
  }

  /**
    * Function to Update User
    * @param {*} user 
    */


  async update(user) {
    const url = this.DB_URL + "/users/" + user._id + "?rev=" + user._rev;
    try {
      let result = await httpClient.put(url, user);
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
    if (response.error == "not_found") {
      if (response.reason == "Database does not exist.") {
        throw new Error("Database not found");
      }
      else {
        throw new Error("Data not found");
      }
    } else {
      throw new Error(errorMessage);
    }
  }
}
exports.UserDAO = UserDAO;