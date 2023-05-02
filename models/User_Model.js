const Model = require("../system/Model.js"); // this will get the generic model that contain all common functions
const validator = require('../config/libraries/validation.js')
const bcrypt = require('bcryptjs');

class User_Model extends Model{
    constructor(){
        super();
    }

    async validate_fields(fields){
        validator.validate('First Name', fields.first_name).isEmpty().minLength('text');
        validator.validate('Last Name', fields.last_name).isEmpty().minLength('text');
        await validator.validate('Email', fields.email_address).isEmpty().validEmail().uniqueEmail('users');
        validator.validate('Password', fields.password).isEmpty().minLength('password');
        validator.validate('Confirm Password', fields.confirm_password).isEmpty().passMatch(fields.password)

        let error = validator.get_errors();
        error = this.filter_errors(error);
        
        return error;
    }

    async validate_login_fields(fields){
        validator.validate('Email Address', fields.login_email_address).isEmpty().validEmail();
        validator.validate('Password', fields.login_password).isEmpty().minLength('password');

        let error = validator.get_errors();
        error = this.filter_errors(error);
        if(error.length==0){
            let user = await this.get_user_by_email(fields.login_email_address)
            if(user.length == 0){
                return ['Invalid Email or Password'];
            }else{
                await validator.validate_password(fields.login_password, user[0].password);
                error = validator.get_errors();
                if(error.length==0){
                    return user[0].id;
                }
            }
        }
        return error;
    }

    filter_errors(error){
        error = error.filter(function(x) {
            return x !== undefined;
        });
        return error;
    }

    async create_user(fields){
        let query = 'INSERT INTO users (first_name, last_name, email_address, password, `created_at`, `updated_at`)' + 
        'VALUES (?,?,?,?,?,?)';

        let hash_password = await bcrypt.hash(fields.password, 10);
        let date = new Date();
        date = this.get_date_time(date);
        let values = [
            fields.first_name,
            fields.last_name,
            fields.email_address,
            hash_password,
            date,
            date
        ];
        let result = await this.query(query, values);
        return result;
    }

    async get_user_by_id(id){
        let user = await this.query('SELECT * FROM users WHERE id = ?', id);
        return user;
    }

    async get_user_by_email(email){
        let user = await this.query('SELECT * FROM users WHERE email_address = ?', email);
        return user;
    }

    get_date_time(date){
        date = date.getUTCFullYear() + '-' +
            ('00' + (date.getUTCMonth()+1)).slice(-2) + '-' +
            ('00' + date.getUTCDate()).slice(-2) + ' ' + 
            ('00' + date.getUTCHours()).slice(-2) + ':' + 
            ('00' + date.getUTCMinutes()).slice(-2) + ':' + 
            ('00' + date.getUTCSeconds()).slice(-2);
        
        return date;
    }
}

let car = new User_Model();
module.exports = car;