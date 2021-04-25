const sequelize = require("sequelize");
const db = require("../db");


const Messages = db.define("messages", {
    text: {
        type: sequelize.STRING,
        allowNull: false
    }
})


module.exports = Messages