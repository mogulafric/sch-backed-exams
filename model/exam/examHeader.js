const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const examHeaderSchema = new Schema({
    examName: {type: String,required: true},
    examCode: {type: Number,required: true},
    termID: {type: mongoose.Schema.ObjectId,ref: "AcademicTerm", required:true},
    yearID: {type: mongoose.Schema.ObjectId,ref: "AcademicYear",required:true},
    unitID: {type: mongoose.Schema.ObjectId,ref: "Unit", required:true},
    examDescription: {type: String,required: true},
 
});
module.exports = mongoose.model('ExamHeader', examHeaderSchema);