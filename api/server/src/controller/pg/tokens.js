const { sign } = require('jsonwebtoken');

const createAccessToken = userId => {
    return sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '5m'
    });
};


const sendAccessToken = (req, res, accessToken) => {
    res.send({
        accessToken,
        email: req.body.email,

    });
};


module.exports = {
    createAccessToken,
    sendAccessToken,
};