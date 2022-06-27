const jwt = require('jsonwebtoken');

const { config } = require('../config/config');

// create the token with the email
/**
 * @param {object} data: email
 * @return {string} jwt
 */
function sign(data) {
    return jwt.sign(data, config.secret,
    //{
        // https://www.npmjs.com/package/jsonwebtoken#token-expiration-exp-claim
    //    exp: 60 * 60,// 60 * 60 = 1 hour. 
    //}        
    );
}

// Object with functions
const check = {
    // create the token with the email
    /**
     * @param {Object} req = req.header with the token
     * @param {String} owner = req.params.id with the email customer
     * @return {string} jwt
     */
    own: function(req, owner){
        const decoded = decodeHeader(req);
        //console.log('+++++++++++++++++++++++ decoded:');
        //console.log(decoded); // output > email
        console.log('++++ owner: '+ owner+'   decoded{}: '+ decoded);//email

        // check if you are the owner of the account
        if (decoded !== owner) {
            throw new Error('No puedes editar los datos de otros usuarios.');
        }
    }
}


// function that receive a string whit the token and return the token
/**
 * @param {string} authentication
 * @return {string} token
 */
function getToken(authentication){
    if (!authentication) {
        throw new Error('Error (grr-getToken): There is no a token.');
    }

    if (!authentication.includes('Bearer ')) {
        throw new Error('Error (grr-getToken): Invalid format.');
    }

    let token = authentication.replace('Bearer ','');
    console.log(token);
    return token;
}


// function to validate a token
/**
 * @param {string} token
 * @return {object} decodedToken
 */
function verify(token) {
    try {
        console.log('token: '+ token);
        let decodedToken = jwt.verify(token, config.secret);
        console.log('++++++++++++++++++++++ decoded token:');
        console.log(decodedToken);
        return decodedToken;
    } catch (error) {
        throw new Error('Error verify token (grr-verify): ' + error.message);
    }
}



// function to decoded a token
/**
 * @param {object} req
 * @return {string} decoded
 */
function decodeHeader(req){
    const authorization = req.headers.authorization || '';
    //console.log('+++++++++++++++++++++++++++++++++++');
    //console.log(req.headers);
    const token = getToken(authorization);// clear the token
    const decoded = verify(token);// decoded token > return the email login.

    req.user = decoded;
    return decoded;
}

module.exports = {
    sign,
    check,
};