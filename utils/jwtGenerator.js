const jwt = require("jsonwebtoken");
require("dotenv").config();

function jwtGenerator(use_id) {
    const payload = {
        user : use_id
    }

    return jwt.sign(payload, process.env.jwtSecret, {expiresIn: "1hr"})
}

module.exports = jwtGenerator;