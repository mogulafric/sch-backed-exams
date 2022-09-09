const CaptureMarks = require("../../../model/exam/examLines");
const SetUpExam = require("../../../model/exam/examHeader");
const catchAsync = require("../../../utils/catchAsync");
const Students = require("../../../model/students/students")
const Unit = require("../../../model/units/unit")
const initiateMarks = catchAsync(async (req, res, next) => {
      let data = req.body
      let examID = data._id
      const checkExist = await CaptureMarks.findOne({
            examID: examID
      })
      if (checkExist) {
            return res.status(400).json({
                  status: 'failed',
                  message: 'The exam has already been initiated'
            })
      }
      let unitID = data.unitID
      let getUnitID = await Unit.findById({
            _id: unitID
      })
      if (!getUnitID) {
            return res.status(400).json({
                  status: 'failed',
                  message: 'Could not find a matching class'
            })
      }
      let unitCurrent = getUnitID.unitCode
      const studentsUnit = await Students.find({
            unitCurrent: unitCurrent
      })
      if (!unitCurrent) {
            return res.status(200).json({
                  status: "failed",
                  message: 'we could not retrive students from the class provided'
            })
      }
      let setUpExam = await SetUpExam.findOne({
            _id: examID
      })
      let results = []
      studentsUnit.forEach(async (el) => {
            let studentID = el._id
            let result = {
                  examID: examID, studentID: studentID
            }
            results.push(result)
      })
      let final = await CaptureMarks.create(results)
      res.status(200).json({
            status: 'success',
            result: final.length,
            data: final
      })
})
const captureScoreByExamBySubject = catchAsync(async (req, res, next) => {
      let { data } = req.body
      let _id = data._id

      const findExamList = await CaptureMarks.findOne({ _id: _id })
      if (!findExamList) {
            return res.status(400).json({
                  status: 'failed',
                  message: 'we could not retried a matching id for the selected item'
            })
      }
      let result = await CaptureMarks.updateOne({ _id: _id }, data)
      res.status(201).json({
            status: 'success',
            result: result.length,
            data: result
      })
})
const getCapturedMarksByItemEntryID = catchAsync(async (req, res, next) => {
      let entryID = req.params.entryID
      const examEntries = await CaptureMarks.findOne({ _id: entryID })
      if (!examEntries) {
            return res.status(400).json({
                  status: 'failed',
                  message: 'We could find a matching data for your request'
            })
      }
      res.status(200).json({
            status: 'success',
            result: examEntries.length,
            data: examEntries
      })


})
const getCapturedMarksByExamID = catchAsync(async (req, res, next) => {
      let examID = req.params.examID
      const examEntries = await CaptureMarks.find({ examID: examID })
      if (!examEntries) {
            return res.status(400).json({
                  status: 'failed',
                  message: 'We could find a matching data for your request'
            })
      }
      res.status(200).json({
            status: 'success',
            result: examEntries.length,
            data: examEntries
      })
})
const subjectGradesAndComments = catchAsync(async (req, res, next) => {
      let { kiswahili, english, mathematic } = req.body
      let grade = ""
      let comment = ""
      let points = 0
      if (kiswahili){


            // calculate subject grade
            if (score >= 80 && score <= 100) {
                  grade = "A"
                  comment = "Excellent"
                  points = 12
            }
            else if (score >= 75 && score <= 79.99) {
                  grade = "A-"
                  comment = "V.Good"
                  points = 11
            }
            else if (score >= 70 && score <= 75.99) {
                  grade = "B+"
                  comment = "Good"
                  points = 9
            }
            else if (score >= 65 && score <= 69.99) {
                  grade = "B+"
                  comment = "Average"
                  points = 8
            }
            else if (score >= 60 && score <= 64.99) {
                  grade = "B+"
                  comment = "Fair"
                  points = 8
            }
            else if (score >= 55 && score <= 59.99) {
                  grade = "B+"
                  comment = "Fair"
                  points = 7
            }
            else if (score >= 50 && score <= 54.99) {
                  grade = "B+"
                  comment = "Good trial"
                  points = 6
            }
            else if (score >= 45 && score <= 49.99) {
                  grade = "B+"
                  comment = "Work harder"
                  points = 5
            }
            else if (score >= 40 && score <= 44.99) {
                  grade = "B+"
                  comment = "Improve"
                  points = 4
            }
            else if (score >= 35 && score <= 39.99) {
                  grade = "B+"
                  comment = "Put effort"
                  points = 3
            }
            else if (score >= 30 && score <= 34.99) {
                  grade = "B+"
                  comment = "Put effort"
                  points = 2
            }
            else if (score >= 0 && score <= 29.99) {
                  grade = "B+"
                  comment = "Avoid E's"
                  points = 1
            }
            else {

            }
      }
      else { }

      console.log(comment)
 

      res.status(200).json({
            status: 'success',
            data: comment
      })
})

module.exports = {
      initiateMarks,
      captureScoreByExamBySubject,
      getCapturedMarksByExamID,
      getCapturedMarksByItemEntryID,
      subjectGradesAndComments

};
