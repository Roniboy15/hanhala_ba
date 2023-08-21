const cron = require('node-cron');
const { DatenModel } = require('../models/machanaDaten');
const { HousesModel } = require('../models/housesModel');

const updateDataYearly = cron.schedule('0 0 1 1 *', async () => {
    // This will run every year on January 1 at 00:00

    try {
        // Get all documents from the dates collection
        const dates = await DatenModel.find({});

        // Update each date document
        for (let date of dates) {
            date.datum = date.datum2;
            date.datum2 = date.datum3;
            date.datum3 = date.datum4;
            date.datum4 = "";

            // Save the updated date document
            await date.save();
        }

        // Get all documents from the houses collection
        const houses = await HousesModel.find({});

        // Update each house document
        for (let house of houses) {
            house.emailSent = house.emailSent2;
            house.emailSent2 = house.emailSent3;
            house.emailSent3 = house.emailSent4;
            house.emailSent4 = false;

            // Save the updated house document
            await house.save();

        }

    } catch (err) {
        console.error(err);
    }

}, {
    scheduled: false,
    timezone: "America/New_York" // set the timezone to whatever is relevant
}
);

module.exports = {
    updateDataYearly
};
