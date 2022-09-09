const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.plugin(schema => { schema.options.usePushEach = true });
const examLineSchema = new Schema({
    examID: { type: mongoose.Schema.ObjectId, ref: "ExamHeader" },
    studentID: { type: mongoose.Schema.ObjectId, ref: "Subject" },
    english: {
        subjectFullName: { type: String },
        subjectShortName: { type: String },
        subjectCode: { type: String },
        score: { type: Number, default:null },
        points: { type: Number },
        grade: { type: String },
        subjectTeacher: { type: String },
        comment: { type: String }
    },
    kiswahili: {
        subjectFullName: { type: String },
        subjectShortName: { type: String },
        subjectCode: { type: String },
        score: { type: Number, default:null },
        points: { type: Number },
        grade: { type: String },
        subjectTeacher: { type: String },
        comment: { type: String }
    },
    mathematics: {
        subjectFullName: { type: String },
        subjectShortName: { type: String },
        subjectCode: { type: String },
        score: { type: Number, default:null},
        points: { type: Number },
        grade: { type: String },
        subjectTeacher: { type: String },
        comment: { type: String }
    },
    biology: {
        subjectFullName: { type: String },
        subjectShortName: { type: String },
        subjectCode: { type: String },
        score: { type: Number },
        points: { type: Number },
        grade: { type: String },
        subjectTeacher: { type: String },
        comment: { type: String }
    },
    chemistry: {
        subjectFullName: { type: String },
        subjectShortName: { type: String },
        subjectCode: { type: String },
        score: { type: Number },
        points: { type: Number },
        grade: { type: String },
        subjectTeacher: { type: String },
        comment: { type: String }
    },
    physics: {
        subjectFullName: { type: String },
        subjectShortName: { type: String },
        subjectCode: { type: String },
        score: { type: Number },
        points: { type: Number },
        grade: { type: String },
        subjectTeacher: { type: String },
        comment: { type: String }
    },
    geography: {
        subjectFullName: { type: String },
        subjectShortName: { type: String },
        subjectCode: { type: String },
        score: { type: Number },
        points: { type: Number },
        grade: { type: String },
        subjectTeacher: { type: String },
        comment: { type: String }
    },
    history: {
        subjectFullName: { type: String },
        subjectShortName: { type: String },
        subjectCode: { type: String },
        score: { type: Number },
        points: { type: Number },
        grade: { type: String },
        subjectTeacher: { type: String },
        comment: { type: String }
    },
    cre: {
        subjectFullName: { type: String },
        subjectShortName: { type: String },
        subjectCode: { type: String },
        score: { type: Number },
        points: { type: Number },
        grade: { type: String },
        subjectTeacher: { type: String },
        comment: { type: String }
    },
    business: {
        subjectFullName: { type: String },
        subjectShortName: { type: String },
        subjectCode: { type: String },
        score: { type: Number },
        points: { type: Number },
        grade: { type: String },
        subjectTeacher: { type: String },
        comment: { type: String }
    },
    agriculture: {
        subjectFullName: { type: String },
        subjectShortName: { type: String },
        subjectCode: { type: String },
        score: { type: Number },
        points: { type: Number },
        grade: { type: String },
        subjectTeacher: { type: String },
        comment: { type: String }
    },
    totalMarks: Number,
    totalPoints: Number,
    overalGrade: String,
    classTecher: { type: mongoose.Schema.ObjectId, ref: "classTeacher" },
    classTeacherRemarks: { type: mongoose.Schema.ObjectId, ref: "classTeacherRemarks" },
    principal: { type: mongoose.Schema.ObjectId, ref: "Principal" },
    principalRemarks: { type: mongoose.Schema.ObjectId, ref: "PrincipalRemarks" },
    isArchived: { type: Boolean, Default: false },
    isActive: { type: Boolean, Default: true },
});
module.exports = mongoose.model("ExamLine", examLineSchema);
