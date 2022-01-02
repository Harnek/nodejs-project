'use strict';

const Joi = require('joi') ;

exports.validateToken = async (token, request, h) => {
    try {
        const fetchtoken = JSON.parse(decrypt(token.data));
        const diff = Moment().diff(Moment(token.iat * 1000));
        if (diff > 0) {
            const userInfo = await Models.users.findOne({
                where: { id: fetchtoken.userId }
            });

            const sessionCheck = await sessionExist(fetchtoken.sessionId);
            if (!sessionCheck) {
                return {
                    isValid: false
                };
            }

            return {
                isValid: true,
                credentials: { userData: fetchtoken, scope: fetchtoken.scope }
            };

        }
    }
    catch (e) {
        console.log(e);
    }
};

// Method to Sign token with private key
exports.signToken = (tokenData) => {
    return Jwt.sign(
        { data: encrypt(JSON.stringify(tokenData)) },
        //{data: tokenData},
        Constants.key.privateKey
    );
};

exports.updateFailureError = (err, req) => {
    const updatedError = err;
    updatedError.output.payload.message = [];
    const customMessages = {};
    if (err.isJoi && Array.isArray(err.details) && err.details.length > 0) {
        err.details.forEach((error) => {
            customMessages[error.context.label] = req.i18n.__(error.message);
        });
    }
    else {
        const messageParts = err.message.split('|');
        customMessages[messageParts[0]] = req.i18n.__(messageParts[1]);
    }

    delete updatedError.output.payload.validation;
    updatedError.output.payload.error = 'Bad Request';
    updatedError.output.payload.message = req.i18n.__(
        'ERROR_WHILE_VALIDATING_REQUEST'
    );
    updatedError.output.payload.errors = customMessages;
    return updatedError;
};

exports.headers = () => {
    
    return{
        authorization: Joi.string()
            .required()
            .description('Token to identify user who is performing the action'),
        devicetype: Joi.string().optional()
    }
};