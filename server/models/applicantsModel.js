const Joi = require("joi");
const mongoose = require("mongoose");


const applicantSchema = new mongoose.Schema({
    age: Number,
    name: String,
    phone: Number,
    email: String,
    machane: [String],
    interest: {type: String, default: 'green'},
    suma_position: { type: Number, default: 1 },
    wima_position: { type: Number, default: 1 },
    sayarim_position: { type: Number, default: 1 },
    israel_position: { type: Number, default: 1 },
    date_created: {
        type: Date, default: Date.now()
    }
})

applicantSchema.pre('save', async function(next) {
    if (this.isNew) {
      const lastApplicant = await this.constructor.findOne({ machane: { $regex: new RegExp(this.machane, "i") } }, {}, { sort: { position: -1 } });
      if (lastApplicant) {
        this.position = lastApplicant.position + 1;
      }
    }
    next();
  });

exports.ApplicantModel = mongoose.model("Applicants", applicantSchema);

exports.validateApplicant = (reqBody) => {
    let joiSchema = Joi.object({
        age: Joi.number().required(),
        name: Joi.string().min(2).max(40).required(),
        phone: Joi.number().required(),
        email: Joi.string().email().allow(null, ""),
        machane: Joi.array().items(Joi.string())
    })
    return joiSchema.validate(reqBody);
}

exports.validateApplicantsList = (applicantsList) => {
    const applicantSchema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        phone: Joi.string().required(),
        // other validation rules for applicant properties
    });

    const applicantsListSchema = Joi.array().items(applicantSchema).required();

    return applicantsListSchema.validate(applicantsList);
}