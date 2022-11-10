const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CVsSchema = new Schema(
  {
    user_id: { type: String },
    image: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    about: { type: String },
    data_of_birth: { type: Date },
    gender: { type: String },
    nationality: { type: String },
    email: { type: String },
    phone: [],
    socailmedia: [],
    address: {
      address: { type: String },
      address_line_2: { type: String },
      postal_code: { type: String },
      city: { type: String },
      country: { type: String },
    },
    Education: [],
    Experince: [],
    Skills: [],
    digitalSkills: [],
    comunicationSkill: { type: String },
    languages: [],
    hobbies: [],
  },
  {
    timestamps: true,
  }
);

const CVs = mongoose.model("CVs", CVsSchema);

module.exports = CVs;
