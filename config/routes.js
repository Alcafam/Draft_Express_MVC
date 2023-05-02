/* 
DOCU: 
* This file contains the routing information
* It loads the appropriate controllers
OWNER: Mar Gal
*/
const Express = require("express");
const Router = Express.Router();

/* ============================ */
/* Define your controllers here */
/* ============================ */
const Users_Controller = require('../controllers/Users_Controller.js');

/* ================================================ 
* put your Routes here 
* use bind() to access class properties in methods
 ================================================== */
Router.get('/', Users_Controller.index.bind(Users_Controller))
Router.post('/registration', Users_Controller.registration.bind(Users_Controller))
Router.post('/login', Users_Controller.login.bind(Users_Controller))

Router.get('/dashboard', Users_Controller.dashboard.bind(Users_Controller))
Router.get('/logout', Users_Controller.logout.bind(Users_Controller))

module.exports = Router;