/* 
DOCU: 
* This stores configuration settings for your project including the database credentials
OWNER: Mar Gal
*/ 
const Mysql = require('mysql2');

/* DATA BASE CONFIGURATION */
const connection = Mysql.createConnection({
    host: "localhost", //db_host
    user: "root", // db_username
    password: "", // db_password
    database: "mvc_sample", //db_name
    port: 3306
});

/* PROFILER CONFIGURATION - to enable or disable profiler or parts of profiler */
const profiler = {
    enable: false,
    uri: false,
    memory_usage: false,
    http_method: false,
    get_post_data: true,
    sessions: true,
    sql_query: true,
    total_time: true,
    query_from_model: true,
};


module.exports = {
    connection: connection.promise(),
    profiler: profiler,
};