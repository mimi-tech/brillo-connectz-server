const request = require("../request");

const sendEmailVerificationCode = async (body) => {
    try {

        const url = `${process.env.EMAIL_SERVICE_BASE_URL}/send-email`;

        const response = await request(url, "POST", body);


        if (!response || !response.status) {
            if (response) {
                return {
                    status: false,
                    message: response.message,
                };
            }

            return {
                status: false,
                message: "Error calling email service",
            };
        }

        return response;
    } catch (e) {
        console.log(e);
        return { status: false, message: e.message };
    }
};


module.exports = {
    sendEmailVerificationCode
}