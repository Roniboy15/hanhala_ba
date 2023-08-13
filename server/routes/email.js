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
apiKey.apiKey = config.brevoAPI;

var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

router.post('/sendEmail', auth, async (req, res) => {
    try {
      const { houseIds, message, emailSentField, email } = req.body;
  
      const houses = await HousesModel.find({
        _id: { $in: houseIds },
      });
  
      const emailAddresses = houses.map(house => house.email);
  
      for (let house of houses) {
        let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
        sendSmtpEmail.to = [{ email:house.email}];
        sendSmtpEmail.subject = 'Anfrage Hausvermietung';
        sendSmtpEmail.htmlContent = message;
        sendSmtpEmail.sender = { name: "BA Schweiz", email: email };
  
        await apiInstance.sendTransacEmail(sendSmtpEmail).then(async function(data) {
          console.log('API called successfully. Returned data: ' + data);
          // updating the house record after successfully sending the email
          house[emailSentField] = true;
          await house.save();
          console.log(house.sentEmail)

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