/*
DOCU: 
* This validates signin/registrations
OWNER: Mar Gal
*/

const Generic_Model = require("../../system/Model.js");
const bcrypt = require('bcryptjs');

class Validation extends Generic_Model{
    constructor(){
        super();
        this.label;
        this.field;
        this.errors=[];
    }

    validate(label, field){
        if(label!='' || label!='undefined'){
            this.label = label;
            this.field = field
        }
        return this;
    }

    /* Checks if the fields are empty. */
    isEmpty(){
        if(this.field.length == 0){
            this.errors.push("Please enter your " + this.label + ".");
        }
        return this;
    }

    /* Checks if the value of the field is a number. If it is not a number it would return an error. */
    isNumber(){
        if(isNaN(parseInt(this.field)) == true){
            this.errors.push(this.label + " should be a number.");
        }
        return this;
    }

    /* Checks if the value of the field has the required minimum length. */
    minLength(type){
        if(this.field != ''){
            if(type == 'password'){
                if(this.field.length < 8){ //8 here is the minimum length required for a password.
                    this.errors.push(this.label + " must be at least 8 characters long.");
                }
            }
            if(type == 'text'){
                if(this.field.length < 2){ //2 here is the minimum length required for a name.
                    this.errors.push(this.label + " must be at least 2 characters long.");
                }
            }
        }  
        return this;  
    }

    /* Checkss if the value of the field has the required maximum length. */
    maxLength(length){
        if(this.field!=''){
            if(this.field.length>length){
                this.errors.push(this.label + "Exceeded Max Length");
            }
        }
        return this;
    }

    /* Check if the value of the email field is valid. */
    validEmail(){
        if(this.field!=''){
            if(this.field.includes("@") == true){
                let char_index = this.field.indexOf("@");
                if(this.field.includes(".com", char_index) == false){
                    this.errors.push("Please enter a valid email address.");
                }
            }else if(this.field.includes("@") == false){
                this.errors.push("Please enter a valid email address.");
            }
        }
        return this;
    }

    /* Check if the value of the email field is already in the database. */
    async uniqueEmail(table_name){
        if(this.field){
            let emails = await this.query('SELECT email_address FROM '+ table_name);
            for(var i in emails){
                if(this.field === emails[i].email_address){
                    this.errors.push(this.label + " already exists!");
                    break;
                }
            }
        }
        
        return this;
    }

    /* Check if the value of the password field is match another password_field (confirm_password). */
    passMatch(password){
        if(this.field!='' || password !=''){
            if(password !== this.field){
                this.errors.push(this.label + " does not match password.");
            }
        }
        return this;
    }

    /* Check if the value of the password field is match in the database. */
    async validate_password(password, hash_password){
        if(bcrypt.compareSync(password, hash_password) === false){
            this.errors = ['Invalid Email or Password'];
        };
        return this;
    }

    get_errors(){
        let errors = this.errors
        this.errors = [];
        return errors;
    }
}

module.exports = new Validation();