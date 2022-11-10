const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CandidatesSchema = new Schema(
  {
    // username: { type: : { type: String },, required: true, unique: true },

    name: { type: String },
    fName: { type: String },
    age: { type: String },
    gender: { type: String },
    phone: { type: String },
    CNIC: { type: String, unique: true },
    workExperience: { type: String },
    Education: { type: String },
    University: { type: String },
    Passing_Year: { type: String },
    Country: { type: String },
    photo: { type: String },
    candidateType: { type: String },
    skill: { type: String },
    Files: []
  },
  {
    timestamps: true,
  }
);

const Candidates = mongoose.model("Candidates", CandidatesSchema);

module.exports = Candidates;
