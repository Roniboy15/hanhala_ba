// אמור לגרום לקובץ נקודה אי אן וי שהקוד
// .env
// של השרת יכיר את המשתנים בתוכו
require("dotenv").config();

exports.config = {
  userDB:process.env.USER_DB,
  userPass:process.env.PASS_DB,
  tokenSecret:process.env.TOKEN_SECRET,
  gmail:process.env.GMAIL,
  gmailPassword:process.env.PASS_GMAIL,
  brevoAPI:process.env.BREVO_API_KEY
}

// console.log(process.env.USER_DB);