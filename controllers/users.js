const { QueryTypes } = require('sequelize');
const UserService = require('../services/users');
const EmailService = require('../services/email');
const Emails = require('../utils/email');

class User {

    signUp = async () =>{
        try{
            const payload = req.payload;
            const verifyMobileData = await UserService.verifyMobile(payload);
            const verifyEmailData = await UserService.verifyEmail(payload);
            if (verifyMobileData) {
                return Boom.badRequest(req.i18n.__('USER_EXIST_WITH_GIVEN_PHONE_NUMBER'));
            }

            if (verifyEmailData) {
                return Boom.badRequest(req.i18n.__('USER_EXIST_WITH_GIVEN_EMAIL'));
            }

            if (!verifyMobileData && !verifyEmailData) {
                await UserService.deleteUnVerifiedUser(payload);
            }

            payload.password = await Bcrypt.hashSync(payload.password, parseInt(process.env.HASH_ROUNDS));
            const insertUser = await UserService.insertUser(payload);
            const userId = insertUser.dataValues.id;

            return h.response({
                responseData: {
                    userId,
                    mobile: payload.mobile,
                    countryCode: payload.countryCode,
                    email: payload.email,
                    name: payload.name
                }
            }).code(200);

        }catch(e){
            return e
        }

    }

    verifyAccount = async () =>{
        try{

        }catch(e){
            return e
        }
    }

    login = async() =>{
        try{

        }catch(e){
            return e
        }
    }



}

module.exports = new User()