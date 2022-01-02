

class User {

    verifyMobile = async (payload) => {
        const data = await Models.users.findOne({
            where: {
                mobile: payload.mobile,
                countryCode: payload.countryCode,
                status: 1
            }
        });

        if (data && data.dataValues.id) {
            return true;
        }

        return false;
    };

    verifyEmail = async (payload) => {
        try {
            const data = await Models.users.findOne({
                where: {
                    email: payload.email,
                    status: 1
                }
            });

            if (data && data.dataValues.id) {
                return true;
            }

            return false;
        }
        catch (e) {
            return e;
        }
    };

    insertUser = async (payload) => {
        try {
            return await Models.users.create({
                    email: payload.email,
                    mobile : payload.mobile, 
                    countryCode: payload.countryCode,
                    password: payload.password,
                    status: Constants.VERIFICATION_STATUS.UNVERIFIED,
                });
            }

        catch (e) {
            return e;
        }
    };

    deleteUnVerifiedUser = async (payload) => {
        try {
            let data;
            let userId;


            if (payload.mobile) {
                let data = await Models.users.findOne({
                    where: {
                        email: payload.email,
                        status: Constants.VERIFICATION_STATUS.UNVERIFIED
                    }
                });

                userId = data.id;

                data = await Models.userVerifications.destroy({
                    where: {
                        user_id: userId
                    },
                    force: true
                });

                data = await Models.users.destroy({
                    where: {
                        mobile: payload.mobile,
                        status: Constants.VERIFICATION_STATUS.UNVERIFIED
                    },
                    force: true
                });

            }

            return data;
        }
        catch (e) {
            return e;
        }
    };

} 

module.exports = new User()