'use strict';

const Models = require('../models/index');

class Emails {

    getTemplate = async (title) => {
        try {
            const data = await Models.emailTemplates.findOne({
                where: {
                    title,
                    isDeleted: 0
                }
            });
            return data;
        }
        catch (e) {
            return e;
        }
    };
}

module.exports = new Emails();