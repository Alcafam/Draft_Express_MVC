/* 
Call model if necessary 
Example: const model = require("../models/modelName.js");
*/
const Controller = require("../system/Controller");
const User = require("../models/User_Model.js");

class Users_Controller extends Controller{
    
    constructor(){
        super();
        this.errors =[];
        this.fields={};
    }

    reset_properties(){
        this.fields = {};
        this.errors =[];
    }

    index(request, response, then){
        if(request.session.logged_in != true){
            response.render('index', {
                page_title: 'Login & Registration',
                errors: this.errors,
                fields: this.fields,
                profiler: profiler.profiler(request)
            })
            profiler.reset();
            this.reset_properties(); 
            then()           
        }else{
            response.redirect('/dashboard');
            then()
        }
    }

    async registration(request, response, then){
        this.fields = {
            first_name: request.body.first_name,
            last_name: request.body.last_name,
            email_address: request.body.email_address
        }
        this.errors = await User.validate_fields(request.body);
        
        if(this.errors.length>0){
            profiler.profiler(request)
            response.redirect('/');
            then()
        }else{
            this.reset_properties(); 

            let result = await User.create_user(request.body);
            request.session.logged_in = true;
            request.session.user_id = result.insertId;
            profiler.profiler(request)
            response.redirect('/dashboard');
            then()
        }
    }

    async login(request, response, then){
        this.errors = await User.validate_login_fields(request.body);
        if(this.errors.length>0){
            response.redirect('/');
            then()
        }else{
            request.session.logged_in = true;
            request.session.user_id = this.errors;
            profiler.profiler(request)
            response.redirect('/dashboard');
            then()
        }
    }

    async dashboard(request, response, then){
        if(request.session.logged_in == true){
            let user = await User.get_user_by_id(request.session.user_id)
            response.render('dashboard', {
                page_title:'Profile',
                user:user[0],
                profiler: profiler.profiler(request)
            });
            profiler.reset();
            then()
        }else{
            response.redirect('/');
            then()
        }
    }

    logout(request, response){
        request.session.destroy();
        response.redirect('/');
    }
}

module.exports = new Users_Controller();
