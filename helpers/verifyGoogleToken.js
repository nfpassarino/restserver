const verifyGoogleToken = async (token = '') => {
    const { OAuth2Client } = require('google-auth-library');
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
    });
    const { name, picture, email } = ticket.getPayload();
    return {
        name,
        email,
        img: picture,
    };
};

module.exports = {
    verifyGoogleToken,
};
