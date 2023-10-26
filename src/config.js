
module.exports = () => ({
    PORT: process.env.PORT,
    db_user: process.env.DB_USER,
    db_host: process.env.DB_HOST,
    db_password: process.env.DB_PASSWORD,
    db_name: process.env.DB_NAME,
    email_account: process.env.EMAIL,
    pass_email: process.env.PASS_EMAIL,
    destination_email: process.env.DESTINATION_EMAIL
})