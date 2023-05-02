/* 
DOCU: 
* this is the main file that starts the server
OWNER: Mar Gal
 */

/* CONSTANTS */
const ready = require('./system/express_const.js')
const app = ready.app;

/* listener */
const port = 8080;
app.listen(port); 