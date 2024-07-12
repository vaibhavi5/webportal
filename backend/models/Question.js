const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  type: {type: String},
  key: {type: String},
  question: {type: String},
  required: { type: Boolean },
  enumValues: { type: [String] }, // Array of strings
  intRange: { type: [Number] },   // Array of numbers
  description: {type: String},
});

const Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;