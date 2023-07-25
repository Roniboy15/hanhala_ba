
require("dotenv").config();

exports.config = {
  userDB:process.env.USER_DB,
  userPass:process.env.PASS_DB,
  tokenSecret:process.env.TOKEN_SECRET,
  gmail:process.env.GMAIL,
  gmailPassword:process.env.PASS_GMAIL,
  brevoAPI:process.env.BREVO_API_KEY
}

