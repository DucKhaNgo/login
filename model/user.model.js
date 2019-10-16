let db = require("../util/db");

module.exports = {
    add: entity => {
        return db.add("user", entity);
    },
    singleByUsername: username => {
        return db.singleByUsername(username);
    },
    singleByEmail: email => {
        return db.load(`select * from user where email='${email}'`);
    },
    login: (email, password) => {
        return db.load(
            `select * from user where email='${email}' and password='${password}'`
        );
    },
    findByEmail: email => {
        return db.load(`select * from user where email='${email}'`);
    },
    findOne: ({email, password}) => {
        return db.load(`select * from user where email='${email} and password='${password}'`)
    }
};
