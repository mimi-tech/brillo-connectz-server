const Vonage = require('@vonage/server-sdk')


const sendOtpToPhone = async (to, text) => {

    try {
        if (process.env.SMS_PIPE === 'production') {
            const vonage = new Vonage({
                apiKey: process.env.NEXMO_API_KEY,
                apiSecret: process.env.NEXMO_API_SECRET,
            })


            const from = "BrilloConntz"


            vonage.message.sendSms(from, to, text, (err, responseData) => {
                if (err) {
                    return {
                        status: false,
                        message: err,
                    };
                }
                if (responseData.messages[0].status === "0") {
                    console.log("Otp has been sent to your phone");
                    return {
                        status: true,
                        message: "Otp has been sent to your phone",
                    };

                }

            })
        }

        return {
            status: true,
            message: "Otp has been sent to your phone",
        };
    } catch (e) {
        console.log(e);
        return { e };
    }

}

module.exports = {
    sendOtpToPhone
}