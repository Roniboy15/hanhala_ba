const express = require("express");
const router = express.Router();
const nodemailer = require('nodemailer');
const { auth } = require("../middlewares/auth");
const { HousesModel } = require("../models/housesModel");
const { config } = require("../config/secret");
const SibApiV3Sdk = require('sib-api-v3-sdk');
let defaultClient = SibApiV3Sdk.ApiClient.instance;
// Configure API key authorization: api-key
let apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = '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';

var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

router.post('/sendEmail', auth, async (req, res) => {
    try {
      const { houseIds, message } = req.body;
  
      const houses = await HousesModel.find({
        _id: { $in: houseIds },
      });
  
      const emailAddresses = houses.map(house => house.email);
  
      for (let house of houses) {
        let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
        sendSmtpEmail.to = [{ email: "jaron.111@hotmail.com" }];
        sendSmtpEmail.subject = 'Anfrage Hausvermietung';
        sendSmtpEmail.htmlContent = message;
        sendSmtpEmail.sender = { name: 'Jaron Treyer', email: 'hanhalaschweiz@gmail.com' };
  
        await apiInstance.sendTransacEmail(sendSmtpEmail).then(async function(data) {
          console.log('API called successfully. Returned data: ' + data);
          // updating the house record after successfully sending the email
          house.emailSent = true;
          await house.save();
        }, function(error) {
          console.error(error);
        });
      }
  
      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'An error occurred while trying to send emails.', error: error.message });
    }
  });
  

  


module.exports = router;