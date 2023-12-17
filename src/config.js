
module.exports = () => ({
    BASE_URL: process.env.BASE_URL,
    PORT: process.env.PORT || 8080,
    db_user: process.env.DB_USER,
    db_host: process.env.DB_HOST,
    db_password: process.env.DB_PASSWORD,
    db_name: process.env.DB_NAME,
    clientid: process.env.CLIENTID,
    clientsecret: process.env.CLIENTSECRET,
    email_account: process.env.EMAIL,
    pass_email: process.env.PASS_EMAIL,
    destination_email: process.env.DESTINATION_EMAIL,
    twilio_account_sid: process.env.TWILIO_ACCOUNT_SID,
    twilio_auth_token: process.env.TWILIO_AUTH_TOKEN,
    twilio_sms_number: process.env.TWILIO_SMS_NUMBER,
    twilio_sms_destination_number: process.env.TWILIO_SMS_DESTINATION_NUMBER,
})