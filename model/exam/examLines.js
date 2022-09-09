const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.plugin(schema => { schema.options.usePushEach = true });
const examLineSchema = new Schema({
  examID:{type: mongoose.Schema.ObjectId,ref: "ExamHeader"},
  studentID:{type: mongoose.Schema.ObjectId,ref: "Subject"},
  english:{
    subjectFullName:{},
    subjectShortName:{},
    subjectCode:{},
    score:{},
    points:{},
    grade:{},
    subjectTeacher:{},
    comment:{}
},
kiswahili:{
    subjectFullName:{},
    subjectShortName:{},
    subjectCode:{},
    score:{},
    points:{},
    grade:{},
    subjectTeacher:{},
    comment:{}
},
mathematics:{
    subjectFullName:{},
    subjectShortName:{},
    subjectCode:{},
    score:{},
    points:{},
    grade:{},
    subjectTeacher:{},
    comment:{}
},
biology:{
    subjectFullName:{},
    subjectShortName:{},
    subjectCode:{},
    score:{},
    points:{},
    grade:{},
    subjectTeacher:{},
    comment:{}
},
chemistry:{
    subjectFullName:{},
    subjectShortName:{},
    subjectCode:{},
    score:{},
    points:{},
    grade:{},
    subjectTeacher:{},
    comment:{}
},
physics:{
    subjectFullName:{},
    subjectShortName:{},
    subjectCode:{},
    score:{},
    points:{},
    grade:{},
    subjectTeacher:{},
    comment:{}
},
geography:{
    subjectFullName:{},
    subjectShortName:{},
    subjectCode:{},
    score:{},
    points:{},
    grade:{},
    subjectTeacher:{},
    comment:{}
},
history:{
    subjectFullName:{},
    subjectShortName:{},
    subjectCode:{},
    score:{},
    points:{},
    grade:{},
    subjectTeacher:{},
    comment:{}
},
cre:{
    subjectFullName:{},
    subjectShortName:{},
    subjectCode:{},
    score:{},
    points:{},
    grade:{},
    subjectTeacher:{},
    comment:{}
},
business:{
    subjectFullName:{},
    subjectShortName:{},
    subjectCode:{},
    score:{},
    points:{},
    grade:{},
    subjectTeacher:{},
    comment:{}
},
agriculture:{
    subjectFullName:{},
    subjectShortName:{},
    subjectCode:{},
    score:{},
    points:{},
    grade:{},
    subjectTeacher:{},
    comment:{}
},
  totalMarks: Number,
  totalPoints: Number,
  overalGrade: String,
  classTecher:{type: mongoose.Schema.ObjectId,ref: "classTeacher"},
  classTeacherRemarks:{type: mongoose.Schema.ObjectId,ref: "classTeacherRemarks"},
  principal:{type: mongoose.Schema.ObjectId,ref: "Principal"},
  principalRemarks:{type: mongoose.Schema.ObjectId,ref: "PrincipalRemarks"},
  isArchived: { type: Boolean, Default: false },
  isActive: { type: Boolean, Default: true },
});
module.exports = mongoose.model("ExamLine", examLineSchema);
