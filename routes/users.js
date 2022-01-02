'use strict';

const UserController = require('../controllers/users');
const Joi = require('joi');
const UniversalFunctions = require('../utils/universal');

module.exports = [

    {
        method: 'POST',
        path: '/user/signUp',
        handler: UserController.signUp,
        options: {
            tags: ['api', 'user'],
            notes: 'Register a new user with all the Information',
            description: 'Register user with all the Information',
            auth: false,
            validate: {
                options: {
                    abortEarly: false
                },
                payload: {
                    mobile: Joi.string().required()
                        .error((errors) => {
                            errors.forEach((err) => {
                                switch (err.code) {
                                    case 'any.required':
                                        err.message = 'MOBILE_IS_REQUIRED';
                                        break;
                                }
                            });
                            return errors;
                        }),
                    countryCode: Joi.string().required()
                        .error((errors) => {
                            errors.forEach((err) => {
                                switch (err.code) {
                                    case 'any.required':
                                        err.message = 'COUNTRY_CODE_IS_REQUIRED';
                                        break;
                                }
                            });
                            return errors;
                        }),
                    name: Joi.string().required()
                        .error((errors) => {
                            errors.forEach((err) => {
                                switch (err.code) {
                                    case 'any.required':
                                        err.message = 'NAME_IS_REQUIRED';
                                        break;
                                }
                            });
                            return errors;
                        }),
                    email: Joi.string().email().trim().required()
                        .error((errors) => {
                            errors.forEach((err) => {
                                switch (err.code) {
                                    case 'any.required':
                                        err.message = 'EMAIL_IS_REQUIRED';
                                        break;
                                    case 'string.email':
                                        err.message = 'INVALID_EMAIL';
                                }
                            });
                            return errors;
                        }),
                    password: Joi.string().required()
                        .error((errors) => {
                            errors.forEach((err) => {
                                switch (err.code) {
                                    case 'any.required':
                                        err.message = 'PASSWORD_IS_REQUIRED';
                                        break;
                                }
                            });
                            return errors;
                        }),
                },
                failAction: async (req, h, err) => {
                    return await UniversalFunctions.updateFailureError(err, req);
                },
                validator: Joi
            }
        }
    },

    {
        method: 'POST',
        path: '/user/login',
        handler: UserController.login,
        options: {
            tags: ['api', 'user'],
            notes: 'Login a new user with Email and password',
            description: 'Login user with Email',
            auth: false,
            validate: {
                options: {
                    abortEarly: false
                },
                payload: {
                    email: Joi.string().email().trim().required()
                        .error((errors) => {
                            errors.forEach((err) => {
                                switch (err.code) {
                                    case 'any.required':
                                        err.message = 'EMAIL_IS_REQUIRED';
                                        break;
                                    case 'string.email':
                                        err.message = 'INVALID_EMAIL';
                                }
                            });
                            return errors;
                        }),
                    password: Joi.string().required()
                        .error((errors) => {
                            errors.forEach((err) => {
                                switch (err.code) {
                                    case 'any.required':
                                        err.message = 'PASSWORD_IS_REQUIRED';
                                        break;
                                }
                            });
                            return errors;
                        }),
                },
                failAction: async (req, h, err) => {
                    return await UniversalFunctions.updateFailureError(err, req);
                },
                validator: Joi
            }
        }
    },


    {
        
        method: 'POST',
        path: '/user/verifyAccount',
        handler: UserController.verifyAccount,
        options: {
            tags: ['api', 'user'],
            notes: 'Verify Account',
            description: 'Verify Account',
            auth: false,
            validate: {
                options: {
                    abortEarly: false
                },
                payload: {
                    email: Joi.string().email().trim().required()
                        .error((errors) => {
                            errors.forEach((err) => {
                                switch (err.code) {
                                    case 'any.required':
                                        err.message = 'EMAIL_IS_REQUIRED';
                                        break;
                                    case 'string.email':
                                        err.message = 'INVALID_EMAIL';
                                }
                            });
                            return errors;
                        }),
                    otp : Joi.string().required()
                    .error((errors) => {
                        errors.forEach((err) => {
                            switch (err.code) {
                                case 'any.required':
                                    err.message = 'OTP_IS_REQUIRED';
                                    break;
                            }
                        });
                        return errors;
                    }),
                },
                failAction: async (req, h, err) => {
                    return await UniversalFunctions.updateFailureError(err, req);
                },
                validator: Joi
            }
        }
    }


]