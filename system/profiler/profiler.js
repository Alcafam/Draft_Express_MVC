const configuration = require("../../config/configuration.js");
const config = configuration.profiler;
const {memoryUsage} = require('node:process'); // a node module from node.js
const start = performance.now(); // starts the runtime

class Profiler{
    constructor(){
        this.query;
        this.result={};
    }
    
    profiler(request){
        if(config.uri === true){
            this.result.uri = request.originalUrl;
        }

        if(config.memory_usage === true){
            let memory_in_byte = memoryUsage().heapUsed;
            let memory_in_mb = (memory_in_byte * 0.000001);
            let memory_in_kb  = (memory_in_byte * 0.001);

            if(memory_in_mb<=50){
                this.result.memory_usage = memory_in_kb  + ' kbs';
            }else{
                this.result.memory_usage = memory_in_mb  + ' mbs';
            }
        }

        if(config.http_method === true){
            this.result.http_method = request.method;
        }

        if(config.get_post_data === true){
            if(request.method === 'GET'){
                if(Object.keys(request.body).length > 0){
                    this.result.get_post_data = JSON.stringify(request.body)
                }
            }else if(request.method === 'POST'){
                this.result.get_post_data = JSON.stringify(request.body)
            }
        }

        if(config.sessions === true){
            this.result.sessions = JSON.stringify(request.session);
        }

        if(config.total_time === true){
            this.result.total_time = (performance.now()-start)/1000 + ' seconds';
        }
        console.log('=============================================================')
        console.log(this.result)
        if(config.enable === true){
            return this.result;
        }else{
            this.result = {error: 'Profiler needs to be ENABLED before use - check your config folder'}
            return this.result;
        }
    }

    get_query_string(query){
        if(config.sql_query === true){
            this.result.sql_query = query
        }
    }

    get_query_from(controller){
        if(config.query_from_model === true){
            this.result.controller = controller
        }
    }

    reset(){
        this.result = {};
        console.log('****************')
        console.log(this.result)
    }
}


module.exports = new Profiler();


