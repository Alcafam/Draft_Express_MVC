A simple MVC Framework created using nodejs and express.

##### HOW TO USE IT #####
1. Do configurations in config/configuration.js
2. Using vscode, open a command prompt terminal.
3. On command prompt terminal, type "nodemon app.js" this will start the app.
4. Open browser, and go to localhost:8000.

##### HOW TO USE VALIDATION LIBRARY #####
Note: this works by chain method.
1. require library by:
    const variable_name = require('../config/libraries/validation.js')

syntax:
    variable_name.validate(human_name, field).chained_method().chained_method(argument if applicable)....

    ex: validator.validate('Confirm Password', fields.confirm_password).isEmpty().passMatch(fields.password)

    returns:
    Confirm Password does not match password.

LIST OF VALIDATIONS/METHODS:
1. validate(label, field) - will save the human name and field as a global variable and will be evaluated by the rest of the methods.
2. isEmpty()
3. isNumber()
4. minLength(field_type)
5. maxLength(length)
6. validEmail()
7. uniqueEmail(table_name) - this is an async method
8. passMatch(password)
9. validate_password(password, hash_password) - this is an async method
10. get_errors() - returns the list of errors found


##### HOW TO USE PROFILER #####
Note: Only work in Controllers
1. configure profiler in config/configuration.js
2. No need to require as it is already in system Controller

syntax:
    - For geting profiler lists - 
    profiler.profiler(request) - exactly this format

    - For resetting profiler, best used after render -
    profiler.reset() - exactly this format
