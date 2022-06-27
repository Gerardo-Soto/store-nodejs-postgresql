// Middleware to review access permissions

const auth = require('./../authentication');

module.exports = function checkAuth(action) {

    function middleware(req, res, next) {
        switch (action) {
            case 'update':
                // decoder token
                // this user id that generated this token is the same owner
                console.log('Into the middleware checkAuth....................');
                
                // bad::::::::
                const owner = req.body.email;

                // good:::::::::::
                const realOwner = req.params.id;
                /* test this::: */
                // const owner = service.findByPk(realOwner);
                // get > owner.user.email
                console.log(realOwner);// get the customer.user.email

                console.log('checking the request:');
                console.log(req.body);
                auth.check.own(req, owner);
                next();
                break;
        
            default:
                next();
                break;
        }
    }

    return middleware;
}