const db = require("../config/configuration.js"); // this will get the connection from the database
global.profiler = require('./profiler/profiler.js');

class Generic_Model{
    constructor(){
        this.db = db.connection;
    }

    query(query, values) {
        profiler.get_query_string(query)
        profiler.get_query_from(this.constructor.name);
        return new Promise((resolve, reject) => {
            try{
                db.connection.query(query, values)
                .then( ([result, fieldData])=> {
                    resolve(result)
                }) 
            }catch{
                this.then((error)=>{
                    reject(error)
                })
            }
        })
    }
}

module.exports = Generic_Model;