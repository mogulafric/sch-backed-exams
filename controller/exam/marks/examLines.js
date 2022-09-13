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
      let _id = req.body._id
      let englishScore = req.body.english.score
      let kiswahiliScore = req.body.kiswahili.score
      let mathamaticsScore = req.body.mathematics.score
      let biologyScore = req.body.biology.score
      let physicsScore = req.body.physics.score
      let chemistryScore = req.body.chemistry.score
      let agricultureScore = req.body.agriculture.score
      let businessScore = req.body.business.score
      let creScore = req.body.cre.score
      let geographyScore = req.body.geography.score
      let historyScore = req.body.history.score

      const findExamList = await CaptureMarks.findOne({ _id: _id })
      if (!findExamList) {
            return res.status(400).json({
                  status: 'failed',
                  message: 'we could not retried a matching id for the selected item'
            })
      }
      let result = await CaptureMarks.updateOne({ _id: _id },
            {
                  "english.score": englishScore,
                  "kiswahili.score": kiswahiliScore,
                  "biology.score": biologyScore,
                  "chemistry.score": chemistryScore,
                  "mathematics.score": biologyScore,
                  "physics.score": physicsScore,
                  "agriculture.score": agricultureScore,
                  "business.score": businessScore,
                  "cre.score": creScore,
                  "geography.score": geographyScore,
                  "history.score": historyScore
            })
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
      let { data } = req.body
      let examID = data.examID
      if (!examID) {
            return res.status(400).json({
                  status: 'failed',
                  message: 'please provide exam id'
            })
      }
      let studentList = await CaptureMarks.find({ examID: examID })
      //    initialize comment for all subjects
      let { commentKiswahili,
            commentEnglish,
            commentMathematics,
            commentBiology,
            commentChemistry,
            commentPhysics,
            commentHistory,
            commentCRE,
            commentGeography,
            commentAgriculture,
            commentBusiness } = ""
      // initialize grades for all subjects
      let { gradeKiswahili,
            gradeEnglish,
            gradeMathematics,
            gradeBiology,
            gradePhysics,
            gradeChemistry,
            gradeCRE,
            gradeGeography,
            gradeHistory,
            gradeBusiness,
            gradeAgriculture } = ""
      // initialize points for all subjects
      let { pointsKiswahili,
            pointsEnglish,
            pointsMathematics,
            pointsPhysics,
            pointsBiology,
            pointsChemistry,
            pointsHistory,
            pointsGeography,
            pointsCRE,
            pointsAgriculture,
            pointsBusiness } = 0
      // initialize points for all 
      let resultArray = []
      studentList.forEach(async (obj, index, array) => {
            let scoreKiswahili = obj.kiswahili.score
            let scoreEnglish = obj.english.score
            let scoreMathematics = obj.mathematics.score
            let scoreBiology = obj.biology.score
            let scorePhysics = obj.physics.score
            let scoreChemistry = obj.chemistry.score
            let scoreHistory = obj.history.score
            let scoreCRE = obj.cre.score
            let scoreGeography = obj.geography.score

            let scoreAgriculture = obj.agriculture.score
            let scoreBusiness = obj.business.score
            // update kiswahili

            if (scoreKiswahili >= 80 && scoreKiswahili <= 100) {
                  commentKiswahili = "Vyema"
                  pointsKiswahili = 12
                  gradeKiswahili = "A"
            }
            else if (scoreKiswahili >= 75 && scoreKiswahili <= 79.99) {
                  commentKiswahili = "Vizuri sana"
                  pointsKiswahili = 11
                  gradeKiswahili = "A-"
            }
            else if (scoreKiswahili >= 70 && scoreKiswahili <= 74.99) {
                  commentKiswahili = "Vizuri"
                  pointsKiswahili = 10
                  gradeKiswahili = "B+"
            }
            else if (scoreKiswahili >= 65 && scoreKiswahili <= 69.99) {
                  commentKiswahili = "Jaribio nzuri"
                  pointsKiswahili = 9
                  gradeKiswahili = "B"
            }
            else if (scoreKiswahili >= 60 && scoreKiswahili <= 64.99) {
                  commentKiswahili = "Wastani"
                  pointsKiswahili = 8
                  gradeKiswahili = "B-"
            }
            else if (scoreKiswahili >= 55 && scoreKiswahili <= 59.99) {
                  commentKiswahili = "Wastani"
                  pointsKiswahili = 7
                  gradeKiswahili = "C+"
            }
            else if (scoreKiswahili >= 50 && scoreKiswahili <= 54.99) {
                  commentKiswahili = "Jaribio nzuri"
                  pointsKiswahili = 6
                  gradeKiswahili = "C"
            }
            else if (scoreKiswahili >= 45 && scoreKiswahili <= 49.99) {
                  commentKiswahili = "jaribio"
                  pointsKiswahili = 5
                  gradeKiswahili = "C-"
            }
            else if (scoreKiswahili >= 40 && scoreKiswahili <= 44.99) {
                  commentKiswahili = "Jitahidi"
                  pointsKiswahili = 4
                  gradeKiswahili = "D+"
            }
            else if (scoreKiswahili >= 35 && scoreKiswahili <= 39.99) {
                  commentKiswahili = "Tia bidii"
                  pointsKiswahili = 3
                  gradeKiswahili = "D"
            }
            else if (scoreKiswahili >= 30 && scoreKiswahili <= 34.99) {
                  commentKiswahili = "Jitahidi"
                  pointsKiswahili = 2
                  gradeKiswahili = "D-"
            }
            else if (scoreKiswahili >= 1 && scoreKiswahili <= 29.99) {
                  commentKiswahili = "Ji kaze"
                  pointsKiswahili = 1
                  gradeKiswahili = "E"
            }
            else if (scoreKiswahili === 0 && scoreKiswahili === null) {
                  commentKiswahili = null
                  pointsKiswahili = null
                  gradeKiswahili = null
            }
            else {
                  commentKiswahili = null
                  pointsKiswahili = null
                  gradeKiswahili = null
            }


            //english


            if (scoreEnglish >= 80 && scoreEnglish <= 100) {
                  commentEnglish = "Excellent"
                  pointsEnglish = 12
                  gradeEnglish = "A"
            }
            else if (scoreEnglish >= 75 && scoreEnglish <= 79.99) {
                  commentEnglish = "V.good"
                  pointsEnglish = 11
                  gradeEnglish = "A-"
            }
            else if (scoreEnglish >= 70 && scoreEnglish <= 74.99) {
                  commentEnglish = "Good"
                  pointsEnglish = 10
                  gradeEnglish = "B+"
            }
            else if (scoreEnglish >= 65 && scoreEnglish <= 69.99) {
                  commentEnglish = "Fairly good"
                  pointsEnglish = 9
                  gradeEnglish = "B"
            }
            else if (scoreEnglish >= 60 && scoreEnglish <= 64.99) {
                  commentEnglish = "Fair"
                  pointsEnglish = 8
                  gradeEnglish = "B-"
            }
            else if (scoreEnglish >= 55 && scoreEnglish <= 59.99) {
                  commentEnglish = "Fair"
                  pointsEnglish = 7
                  gradeEnglish = "C+"
            }
            else if (scoreEnglish >= 50 && scoreEnglish <= 54.99) {
                  commentEnglish = "Good trial"
                  pointsEnglish = 6
                  gradeEnglish = "C"
            }
            else if (scoreEnglish >= 45 && scoreEnglish <= 49.99) {
                  commentEnglish = "You can do better"
                  pointsEnglish = 5
                  gradeEnglish = "C-"
            }
            else if (scoreEnglish >= 40 && scoreEnglish <= 44.99) {
                  commentEnglish = "Work hard"
                  pointsEnglish = 4
                  gradeEnglish = "D+"
            }
            else if (scoreEnglish >= 35 && scoreEnglish <= 39.99) {
                  commentEnglish = "More effort"
                  pointsEnglish = 3
                  gradeEnglish = "D"
            }
            else if (scoreEnglish >= 30 && scoreEnglish <= 34.99) {
                  commentEnglish = "Avoid D's"
                  pointsEnglish = 2
                  gradeEnglish = "D-"
            }
            else if (scoreEnglish >= 1 && scoreEnglish <= 29.99) {
                  commentEnglish = "Avoid E's"
                  pointsEnglish = 1
                  gradeEnglish = "E"
            }
            else if (scoreEnglish === 0 && scoreEnglish === null) {
                  commentEnglish = null
                  pointsEnglish = null
                  gradeEnglish = null
            }
            else {
                  commentEnglish = null
                  pointsEnglish = null
                  gradeEnglish = null
            }


            // mathematics
            if (scoreMathematics >= 80 && scoreMathematics <= 100) {
                  commentMathematics = "Excellent"
                  pointsMathematics = 12
                  gradeMathematics = "A"
            }
            else if (scoreMathematics >= 75 && scoreMathematics <= 79.99) {
                  commentMathematics = "V.good"
                  pointsMathematics = 11
                  gradeMathematics = "A-"
            }
            else if (scoreMathematics >= 70 && scoreMathematics <= 74.99) {
                  commentMathematics = "Good"
                  pointsMathematics = 10
                  gradeMathematics = "B+"
            }
            else if (scoreMathematics >= 65 && scoreMathematics <= 69.99) {
                  commentMathematics = "Fairly good"
                  pointsMathematics = 9
                  gradeMathematics = "B"
            }
            else if (scoreMathematics >= 60 && scoreMathematics <= 64.99) {
                  commentMathematics = "Fair"
                  pointsMathematics = 8
                  gradeMathematics = "B-"
            }
            else if (scoreMathematics >= 55 && scoreMathematics <= 59.99) {
                  commentMathematics = "Fair"
                  pointsMathematics = 7
                  gradeMathematics = "C+"
            }
            else if (scoreMathematics >= 50 && scoreMathematics <= 54.99) {
                  commentMathematics = "Good trial"
                  pointsMathematics = 6
                  gradeMathematics = "C"
            }
            else if (scoreMathematics >= 45 && scoreMathematics <= 49.99) {
                  commentMathematics = "You can do better"
                  pointsMathematics = 5
                  gradeMathematics = "C-"
            }
            else if (scoreMathematics >= 40 && scoreMathematics <= 44.99) {
                  commentMathematics = "Work hard"
                  pointsMathematics = 4
                  gradeMathematics = "D+"
            }
            else if (scoreMathematics >= 35 && scoreMathematics <= 39.99) {
                  commentMathematics = "More effort"
                  pointsMathematics = 3
                  gradeMathematics = "D"
            }
            else if (scoreMathematics >= 30 && scoreMathematics <= 34.99) {
                  commentMathematics = "Avoid D's"
                  pointsMathematics = 2
                  gradeMathematics = "D-"
            }
            else if (scoreMathematics >= 1 && scoreMathematics <= 29.99) {
                  commentMathematics = "Avoid E's"
                  pointsMathematics = 1
                  gradeMathematics = "E"
            }
            else if (scoreMathematics === 0 && scoreMathematics === null) {
                  commentMathematics = null
                  pointsMathematics = null
                  gradeMathematics = null
            }
            else {
                  commentMathematics = null
                  pointsMathematics = null
                  gradeMathematics = null
            }


            // biology
            if (scoreBiology >= 80 && scoreBiology <= 100) {
                  commentBiology = "Excellent"
                  pointsBiology = 12
                  gradeBiology = "A"
            }
            else if (scoreBiology >= 75 && scoreBiology <= 79.99) {
                  commentBiology = "V.good"
                  pointsBiology = 11
                  gradeBiology = "A-"
            }
            else if (scoreBiology >= 70 && scoreBiology <= 74.99) {
                  commentBiology = "Good"
                  pointsBiology = 10
                  gradeBiology = "B+"
            }
            else if (scoreBiology >= 65 && scoreBiology <= 69.99) {
                  commentBiology = "Fairly good"
                  pointsBiology = 9
                  gradeBiology = "B"
            }
            else if (scoreBiology >= 60 && scoreBiology <= 64.99) {
                  commentBiology = "Fair"
                  pointsBiology = 8
                  gradeBiology = "B-"
            }
            else if (scoreBiology >= 55 && scoreBiology <= 59.99) {
                  commentBiology = "Fair"
                  pointsBiology = 7
                  gradeBiology = "C+"
            }
            else if (scoreBiology >= 50 && scoreBiology <= 54.99) {
                  commentBiology = "Good trial"
                  pointsBiology = 6
                  gradeBiology = "C"
            }
            else if (scoreBiology >= 45 && scoreBiology <= 49.99) {
                  commentBiology = "You can do better"
                  pointsBiology = 5
                  gradeBiology = "C-"
            }
            else if (scoreBiology >= 40 && scoreBiology <= 44.99) {
                  commentBiology = "Work hard"
                  pointsBiology = 4
                  gradeBiology = "D+"
            }
            else if (scoreBiology >= 35 && scoreBiology <= 39.99) {
                  commentBiology = "More effort"
                  pointsBiology = 3
                  gradeBiology = "D"
            }
            else if (scoreBiology >= 30 && scoreBiology <= 34.99) {
                  commentBiology = "Avoid D's"
                  pointsBiology = 2
                  gradeBiology = "D-"
            }
            else if (scoreBiology >= 1 && scoreBiology <= 29.99) {
                  commentBiology = "Avoid E's"
                  pointsBiology = 1
                  gradeBiology = "E"
            }
            else if (scoreBiology === 0 && scoreBiology === null) {
                  commentBiology = null
                  pointsBiology = null
                  gradeBiology = null
            }
            else {
                  commentBiology = null
                  pointsBiology = null
                  gradeBiology = null
            }


            // physcis
            if (scorePhysics >= 80 && scorePhysics <= 100) {
                  commentPhysics = "Excellent"
                  pointsPhysics = 12
                  gradePhysics = "A"
            }
            else if (scorePhysics >= 75 && scorePhysics <= 79.99) {
                  commentPhysics = "V.good"
                  pointsPhysics = 11
                  gradePhysics = "A-"
            }
            else if (scorePhysics >= 70 && scorePhysics <= 74.99) {
                  commentPhysics = "Good"
                  pointsPhysics = 10
                  gradePhysics = "B+"
            }
            else if (scorePhysics >= 65 && scorePhysics <= 69.99) {
                  commentPhysics = "Fairly good"
                  pointsPhysics = 9
                  gradePhysics = "B"
            }
            else if (scorePhysics >= 60 && scorePhysics <= 64.99) {
                  commentPhysics = "Fair"
                  pointsPhysics = 8
                  gradePhysics = "B-"
            }
            else if (scorePhysics >= 55 && scorePhysics <= 59.99) {
                  commentPhysics = "Fair"
                  pointsPhysics = 7
                  gradePhysics = "C+"
            }
            else if (scorePhysics >= 50 && scorePhysics <= 54.99) {
                  commentPhysics = "Good trial"
                  pointsPhysics = 6
                  gradePhysics = "C"
            }
            else if (scorePhysics >= 45 && scorePhysics <= 49.99) {
                  commentPhysics = "You can do better"
                  pointsPhysics = 5
                  gradePhysics = "C-"
            }
            else if (scorePhysics >= 40 && scorePhysics <= 44.99) {
                  commentPhysics = "Work hard"
                  pointsPhysics = 4
                  gradePhysics = "D+"
            }
            else if (scorePhysics >= 35 && scorePhysics <= 39.99) {
                  commentPhysics = "More effort"
                  pointsPhysics = 3
                  gradePhysics = "D"
            }
            else if (scorePhysics >= 30 && scorePhysics <= 34.99) {
                  commentPhysics = "Avoid D's"
                  pointsPhysics = 2
                  gradePhysics = "D-"
            }
            else if (scorePhysics >= 1 && scorePhysics <= 29.99) {
                  commentPhysics = "Avoid E's"
                  pointsPhysics = 1
                  gradePhysics = "E"
            }
            else if (scorePhysics === 0 && scorePhysics === null) {
                  commentPhysics = null
                  pointsPhysics = null
                  gradePhysics = null
            }
            else {
                  commentPhysics = null
                  pointsPhysics = null
                  gradePhysics = null
            }


            // chemistry

            if (scoreChemistry >= 80 && scoreChemistry <= 100) {
                  commentChemistry = "Excellent"
                  pointsChemistry = 12
                  gradeChemistry = "A"
            }
            else if (scoreChemistry >= 75 && scoreChemistry <= 79.99) {
                  commentChemistry = "V.good"
                  pointsChemistry = 11
                  gradeChemistry = "A-"
            }
            else if (scoreChemistry >= 70 && scoreChemistry <= 74.99) {
                  commentChemistry = "Good"
                  pointsChemistry = 10
                  gradeChemistry = "B+"
            }
            else if (scoreChemistry >= 65 && scoreChemistry <= 69.99) {
                  commentChemistry = "Fairly good"
                  pointsChemistry = 9
                  gradeChemistry = "B"
            }
            else if (scoreChemistry >= 60 && scoreChemistry <= 64.99) {
                  commentChemistry = "Fair"
                  pointsChemistry = 8
                  gradeChemistry = "B-"
            }
            else if (scoreChemistry >= 55 && scoreChemistry <= 59.99) {
                  commentChemistry = "Fair"
                  pointsChemistry = 7
                  gradeChemistry = "C+"
            }
            else if (scoreChemistry >= 50 && scoreChemistry <= 54.99) {
                  commentChemistry = "Good trial"
                  pointsChemistry = 6
                  gradeChemistry = "C"
            }
            else if (scoreChemistry >= 45 && scoreChemistry <= 49.99) {
                  commentChemistry = "You can do better"
                  pointsChemistry = 5
                  gradeChemistry = "C-"
            }
            else if (scoreChemistry >= 40 && scoreChemistry <= 44.99) {
                  commentChemistry = "Work hard"
                  pointsChemistry = 4
                  gradeChemistry = "D+"
            }
            else if (scoreChemistry >= 35 && scoreChemistry <= 39.99) {
                  commentChemistry = "More effort"
                  pointsChemistry = 3
                  gradeChemistry = "D"
            }
            else if (scoreChemistry >= 30 && scoreChemistry <= 34.99) {
                  commentChemistry = "Avoid D's"
                  pointsChemistry = 2
                  gradeChemistry = "D-"
            }
            else if (scoreChemistry >= 1 && scoreChemistry <= 29.99) {
                  commentChemistry = "Avoid E's"
                  pointsChemistry = 1
                  gradeChemistry = "E"
            }
            else if (scoreChemistry === 0 && scoreChemistry === null) {
                  commentChemistry = null
                  pointsChemistry = null
                  gradeChemistry = null
            }
            else {
                  commentChemistry = null
                  pointsChemistry = null
                  gradeChemistry = null
            }

            // history
            if (scoreHistory >= 80 && scoreHistory <= 100) {
                  commentHistory = "Excellent"
                  pointsHistory = 12
                  gradeHistory = "A"
            }
            else if (scoreHistory >= 75 && scoreHistory <= 79.99) {
                  commentHistory = "V.good"
                  pointsHistory = 11
                  gradeHistory = "A-"
            }
            else if (scoreHistory >= 70 && scoreHistory <= 74.99) {
                  commentHistory = "Good"
                  pointsHistory = 10
                  gradeHistory = "B+"
            }
            else if (scoreHistory >= 65 && scoreHistory <= 69.99) {
                  commentHistory = "Fairly good"
                  pointsHistory = 9
                  gradeHistory = "B"
            }
            else if (scoreHistory >= 60 && scoreHistory <= 64.99) {
                  commentHistory = "Fair"
                  pointsHistory = 8
                  gradeHistory = "B-"
            }
            else if (scoreHistory >= 55 && scoreHistory <= 59.99) {
                  commentHistory = "Fair"
                  pointsHistory = 7
                  gradeHistory = "C+"
            }
            else if (scoreHistory >= 50 && scoreHistory <= 54.99) {
                  commentHistory = "Good trial"
                  pointsHistory = 6
                  gradeHistory = "C"
            }
            else if (scoreHistory >= 45 && scoreHistory <= 49.99) {
                  commentHistory = "You can do better"
                  pointsHistory = 5
                  gradeHistory = "C-"
            }
            else if (scoreHistory >= 40 && scoreHistory <= 44.99) {
                  commentHistory = "Work hard"
                  pointsHistory = 4
                  gradeHistory = "D+"
            }
            else if (scoreHistory >= 35 && scoreHistory <= 39.99) {
                  commentHistory = "More effort"
                  pointsHistory = 3
                  gradeHistory = "D"
            }
            else if (scoreHistory >= 30 && scoreHistory <= 34.99) {
                  commentHistory = "Avoid D's"
                  pointsHistory = 2
                  gradeHistory = "D-"
            }
            else if (scoreHistory >= 1 && scoreHistory <= 29.99) {
                  commentHistory = "Avoid E's"
                  pointsHistory = 1
                  gradeHistory = "E"
            }
            else if (scoreHistory === 0 && scoreHistory === null) {
                  commentHistory = null
                  pointsHistory = null
                  gradeHistory = null
            }
            else {
                  commentHistory = null
                  pointsHistory = null
                  gradeHistory = null
            }


            // geography
            if (scoreGeography >= 80 && scoreGeography <= 100) {
                  commentGeography = "Excellent"
                  pointsGeography = 12
                  gradeGeography = "A"
            }
            else if (scoreGeography >= 75 && scoreGeography <= 79.99) {
                  commentGeography = "V.good"
                  pointsGeography = 11
                  gradeGeography = "A-"
            }
            else if (scoreGeography >= 70 && scoreGeography <= 74.99) {
                  commentGeography = "Good"
                  pointsGeography = 10
                  gradeGeography = "B+"
            }
            else if (scoreGeography >= 65 && scoreGeography <= 69.99) {
                  commentGeography = "Fairly good"
                  pointsGeography = 9
                  gradeGeography = "B"
            }
            else if (scoreGeography >= 60 && scoreGeography <= 64.99) {
                  commentGeography = "Fair"
                  pointsGeography = 8
                  gradeGeography = "B-"
            }
            else if (scoreGeography >= 55 && scoreGeography <= 59.99) {
                  commentGeography = "Fair"
                  pointsGeography = 7
                  gradeGeography = "C+"
            }
            else if (scoreGeography >= 50 && scoreGeography <= 54.99) {
                  commentGeography = "Good trial"
                  pointsGeography = 6
                  gradeGeography = "C"
            }
            else if (scoreGeography >= 45 && scoreGeography <= 49.99) {
                  commentGeography = "You can do better"
                  pointsGeography = 5
                  gradeGeography = "C-"
            }
            else if (scoreGeography >= 40 && scoreGeography <= 44.99) {
                  commentGeography = "Work hard"
                  pointsGeography = 4
                  gradeGeography = "D+"
            }
            else if (scoreGeography >= 35 && scoreGeography <= 39.99) {
                  commentGeography = "More effort"
                  pointsGeography = 3
                  gradeGeography = "D"
            }
            else if (scoreGeography >= 30 && scoreGeography <= 34.99) {
                  commentGeography = "Avoid D's"
                  pointsGeography = 2
                  gradeGeography = "D-"
            }
            else if (scoreGeography >= 1 && scoreGeography <= 29.99) {
                  commentGeography = "Avoid E's"
                  pointsGeography = 1
                  gradeGeography = "E"
            }
            else if (scoreGeography === 0 || scoreGeography === null) {
                  commentGeography = null
                  pointsGeography = null
                  gradeGeography = null
            }
            else {
                  commentGeography = null
                  pointsGeography = null
                  gradeGeography = null
            }

            //CRE
            if (scoreCRE >= 80 && scoreCRE <= 100) {
                  commentCRE = "Excellent"
                  pointsCRE = 12
                  gradeCRE = "A"
            }
            else if (scoreCRE >= 75 && scoreCRE <= 79.99) {
                  commentCRE = "V.good"
                  pointsCRE = 11
                  gradeCRE = "A-"
            }
            else if (scoreCRE >= 70 && scoreCRE <= 74.99) {
                  commentCRE = "Good"
                  pointsCRE = 10
                  gradeCRE = "B+"
            }
            else if (scoreCRE >= 65 && scoreCRE <= 69.99) {
                  commentCRE = "Fairly good"
                  pointsCRE = 9
                  gradeCRE = "B"
            }
            else if (scoreCRE >= 60 && scoreCRE <= 64.99) {
                  commentCRE = "Fair"
                  pointsCRE = 8
                  gradeCRE = "B-"
            }
            else if (scoreCRE >= 55 && scoreCRE <= 59.99) {
                  commentCRE = "Fair"
                  pointsCRE = 7
                  gradeCRE = "C+"
            }
            else if (scoreCRE >= 50 && scoreCRE <= 54.99) {
                  commentCRE = "Good trial"
                  pointsCRE = 6
                  gradeCRE = "C"
            }
            else if (scoreCRE >= 45 && scoreCRE <= 49.99) {
                  commentCRE = "You can do better"
                  pointsCRE = 5
                  gradeCRE = "C-"
            }
            else if (scoreCRE >= 40 && scoreCRE <= 44.99) {
                  commentCRE = "Work hard"
                  pointsCRE = 4
                  gradeCRE = "D+"
            }
            else if (scoreCRE >= 35 && scoreCRE <= 39.99) {
                  commentCRE = "More effort"
                  pointsCRE = 3
                  gradeCRE = "D"
            }
            else if (scoreCRE >= 30 && scoreCRE <= 34.99) {
                  commentCRE = "Avoid D's"
                  pointsCRE = 2
                  gradeCRE = "D-"
            }
            else if (scoreCRE >= 1 && scoreCRE <= 29.99) {
                  commentCRE = "Avoid E's"
                  pointsCRE = 1
                  gradeCRE = "E"
            }
            else if (scoreCRE === 0 || scoreCRE === null) {
                  commentCRE = null
                  pointsCRE = null
                  gradeCRE = null
            }
            else {
                  commentCRE = null
                  pointsCRE = null
                  gradeCRE = null
            }

            //business
            if (scoreBusiness >= 80 && scoreBusiness <= 100) {
                  commentBusiness = "Excellent"
                  pointsBusiness = 12
                  gradeBusiness = "A"
            }
            else if (scoreBusiness >= 75 && scoreBusiness <= 79.99) {
                  commentBusiness = "V.good"
                  pointsBusiness = 11
                  gradeBusiness = "A-"
            }
            else if (scoreBusiness >= 70 && scoreBusiness <= 74.99) {
                  commentBusiness = "Good"
                  pointsBusiness = 10
                  gradeBusiness = "B+"
            }
            else if (scoreBusiness >= 65 && scoreBusiness <= 69.99) {
                  commentBusiness = "Fairly good"
                  pointsBusiness = 9
                  gradeBusiness = "B"
            }
            else if (scoreBusiness >= 60 && scoreBusiness <= 64.99) {
                  commentBusiness = "Fair"
                  pointsBusiness = 8
                  gradeBusiness = "B-"
            }
            else if (scoreBusiness >= 55 && scoreBusiness <= 59.99) {
                  commentBusiness = "Fair"
                  pointsBusiness = 7
                  gradeBusiness = "C+"
            }
            else if (scoreBusiness >= 50 && scoreBusiness <= 54.99) {
                  commentBusiness = "Good trial"
                  pointsBusiness = 6
                  gradeBusiness = "C"
            }
            else if (scoreBusiness >= 45 && scoreBusiness <= 49.99) {
                  commentBusiness = "You can do better"
                  pointsBusiness = 5
                  gradeBusiness = "C-"
            }
            else if (scoreBusiness >= 40 && scoreBusiness <= 44.99) {
                  commentBusiness = "Work hard"
                  pointsBusiness = 4
                  gradeBusiness = "D+"
            }
            else if (scoreBusiness >= 35 && scoreBusiness <= 39.99) {
                  commentBusiness = "More effort"
                  pointsBusiness = 3
                  gradeBusiness = "D"
            }
            else if (scoreBusiness >= 30 && scoreBusiness <= 34.99) {
                  commentBusiness = "Avoid D's"
                  pointsBusiness = 2
                  gradeBusiness = "D-"
            }
            else if (scoreBusiness >= 1 && scoreBusiness <= 29.99) {
                  commentBusiness = "Avoid E's"
                  pointsBusiness = 1
                  gradeBusiness = "E"
            }
            else if (scoreBusiness === null || scoreBusiness === 0) {
                  commentBusiness = null
                  pointsBusiness = null
                  gradeBusiness = null
            }
            else {
                  commentBusiness = null
                  pointsBusiness = null
                  gradeBusiness = null
            }

            // agriculture

            if (scoreAgriculture >= 80 && scoreAgriculture <= 100) {
                  commentAgriculture = "Excellent"
                  pointsAgriculture = 12
                  gradeAgriculture = "A"
            }
            else if (scoreAgriculture >= 75 && scoreAgriculture <= 79.99) {
                  commentAgriculture = "V.good"
                  pointsAgriculture = 11
                  gradeAgriculture = "A-"
            }
            else if (scoreAgriculture >= 70 && scoreAgriculture <= 74.99) {
                  commentAgriculture = "Good"
                  pointsAgriculture = 10
                  gradeAgriculture = "B+"
            }
            else if (scoreAgriculture >= 65 && scoreAgriculture <= 69.99) {
                  commentAgriculture = "Fairly good"
                  pointsAgriculture = 9
                  gradeAgriculture = "B"
            }
            else if (scoreAgriculture >= 60 && scoreAgriculture <= 64.99) {
                  commentAgriculture = "Fair"
                  pointsAgriculture = 8
                  gradeAgriculture = "B-"
            }
            else if (scoreAgriculture >= 55 && scoreAgriculture <= 59.99) {
                  commentAgriculture = "Fair"
                  pointsAgriculture = 7
                  gradeAgriculture = "C+"
            }
            else if (scoreAgriculture >= 50 && scoreAgriculture <= 54.99) {
                  commentAgriculture = "Good trial"
                  pointsAgriculture = 6
                  gradeAgriculture = "C"
            }
            else if (scoreAgriculture >= 45 && scoreAgriculture <= 49.99) {
                  commentAgriculture = "You can do better"
                  pointsAgriculture = 5
                  gradeAgriculture = "C-"
            }
            else if (scoreAgriculture >= 40 && scoreAgriculture <= 44.99) {
                  commentAgriculture = "Work hard"
                  pointsAgriculture = 4
                  gradeAgriculture = "D+"
            }
            else if (scoreAgriculture >= 35 && scoreAgriculture <= 39.99) {
                  commentAgriculture = "More effort"
                  pointsAgriculture = 3
                  gradeAgriculture = "D"
            }
            else if (scoreAgriculture >= 30 && scoreAgriculture <= 34.99) {
                  commentAgriculture = "Avoid D's"
                  pointsAgriculture = 2
                  gradeAgriculture = "D-"
            }
            else if (scoreAgriculture >= 1 && scoreAgriculture <= 29.99) {
                  commentAgriculture = "Avoid E's"
                  pointsAgriculture = 1
                  gradeAgriculture = "E"
            }
            else if (scoreAgriculture === null || scoreAgriculture === 0) {
                  commentAgriculture = null
                  pointsAgriculture = null
                  gradeAgriculture = null
            }
            else {
                  commentAgriculture = null
                  pointsAgriculture = null
                  gradeAgriculture = null
            }


            let queryID = { _id: obj._id }
            let query = {
                  "kiswahili.comment": commentKiswahili,
                  "english.comment": commentEnglish,
                  "mathematics.comment": commentMathematics,
                  "biology.comment": commentMathematics,
                  "physics.comment": commentPhysics,
                  "biology.comment": commentBiology,
                  "chemistry.comment": commentChemistry,
                  "history.comment": commentHistory,
                  "cre.comment": commentCRE,
                  "geography.comment": commentGeography,
                  "business.comment": commentBusiness,
                  "agriculture.comment": commentAgriculture,
                  "kiswahili.points": pointsKiswahili,
                  "english.points": pointsEnglish,
                  "mathematics.points": pointsMathematics,
                  "biology.points": pointsMathematics,
                  "physics.points": pointsPhysics,
                  "biology.points": pointsBiology,
                  "chemistry.points": pointsChemistry,
                  "history.points": pointsHistory,
                  "cre.points": pointsCRE,
                  "geography.points": pointsGeography,
                  "business.points": pointsBusiness,
                  "agriculture.points": pointsAgriculture,
                  "kiswahili.grade": gradeKiswahili,
                  "english.grade": gradeEnglish,
                  "mathematics.grade": gradeMathematics,
                  "biology.grade": gradeMathematics,
                  "physics.grade": gradePhysics,
                  "biology.grade": gradeBiology,
                  "chemistry.grade": gradeChemistry,
                  "history.grade": gradeHistory,
                  "cre.grade": gradeCRE,
                  "geography.grade": gradeGeography,
                  "business.grade": gradeBusiness,
                  "agriculture.grade": commentAgriculture,
            }
            result = await CaptureMarks.updateOne({ _id: obj._id }, query)
            console.log(result)
            resultArray.push(result)
      })
      res.status(200).json({
            status: 'success',
            message: "Updated successfully"
      })
})

const calculateGrades = catchAsync(async (req, res, next) => {
      let examID = req.body.examID
      if (!examID) {
            return res.status(400).json({
                  status: 'failed',
                  message: 'exam id was not provided'
            })
      }
      let studentList = await CaptureMarks.find({ examID: examID })
      if (!studentList) {
            return res.status(400).json({
                  stattus: 'failed',
                  message: 'sorry an an error occured, the examid couldnt be found'
            })
      }

      studentList.forEach((obj, index, array) => {
            let cat1 = []
            let points1 = []
            let cat1Sub1 = obj.kiswahili.score
            let cat1Sub2 = obj.english.score
            let cat1Sub3 = obj.mathematics.score
            let cat1Points1 = obj.kiswahili.points
            let cat1Point2 = obj.english.points
            let cat1Points3 = obj.mathematics.points
            cat1.push(cat1Sub1)
            cat1.push(cat1Sub2)
            cat1.push(cat1Sub3)
            points1.push(cat1Points1)
            points1.push(cat1Point2)
            points1.push(cat1Points3)
            const initialValue = 0;
            const cat1sum = cat1.reduce(
                  (previousValue, currentValue) => previousValue + currentValue,
                  initialValue
            );
            const points1sum = points1.reduce(
                  (previousValue, currentValue) => previousValue + currentValue,
                  initialValue
            );


            let cat2 = []
            let points2 = []
            let cat2Sub1 = obj.biology.score
            let cat2Sub2 = obj.physics.score
            let cat2Sub3 = obj.chemistry.score
            let cat2Points1 = obj.biology.points
            let cat2Point2 = obj.physics.points
            let cat2Points3 = obj.chemistry.points
            cat2.push(cat2Sub1)
            cat2.push(cat2Sub2)
            cat2.push(cat2Sub3)
            points2.push(cat2Points1)
            points2.push(cat2Point2)
            points2.push(cat2Points3)

            let max1cat2 = Math.max.apply(null, cat2)
            let max1points2 = Math.max.apply(null, points2)
            points2.splice(cat2.indexOf(max1points2))
            cat1.splice(cat2.indexOf(max1cat2), 1);
            let max2cat2 = Math.max.apply(null, cat2)
            let max2points2 = Math.max.apply(null, points2)
            let cat2sum = max1cat2 + max2cat2
            let points2sum = max1points2 + max2points2


            let cat3 = []
            let points3 = []
            let cat3Sub1 = obj.history.score
            let cat3Sub2 = obj.geography.score
            let cat3Sub3 = obj.cre.score
            let cat3Points1 = obj.history.points
            let cat3Point2 = obj.geography.points
            let cat3Points3 = obj.cre.points
            cat3.push(cat3Sub1)
            cat3.push(cat3Sub2)
            cat3.push(cat3Sub3)
            points3.push(cat3Points1)
            points3.push(cat3Point2)
            points3.push(cat3Points3)

            let max1cat3 = Math.max.apply(null, cat3)
            let max1points3 = Math.max.apply(null, points3)
            points3.splice(points3.indexOf(points3), 1);
            cat3.splice(cat3.indexOf(max1cat3), 1);
            let newArrayPoints3 = points3
            let newArrayCat3 = cat3
            let cat3sum = max1cat3
            let points3sum = max1points3


            let cat4 = newArrayCat3
            let points4 = newArrayPoints3
            let cat4Sub1 = obj.agriculture.score
            let cat4Sub2 = obj.business.score

            let cat4Points1 = obj.agriculture.points
            let cat4Points2 = obj.business.points
            cat4.push(cat4Sub1)
            cat4.push(cat4Sub2)

            points4.push(cat4Points1)
            points4.push(cat4Points2)
            let cat4sum = Math.max.apply(null, cat4)
            let points4sum = Math.max.apply(null, points4)
            let totalmarks = cat1sum + cat2sum + cat3sum + cat4sum
            let totalpoints = points1sum + points2sum + points3sum + points4sum
            let meanmarks = (totalmarks / 7).toFixed(2) 
            let teacherComment  = null
            let principleComment = null
            let overallGrade = null
            if(totalpoints>=78 && totalpoints<=84){
                  teacherComment = "Excellent"
                  principleComment = "Excellent"
                  overallGrade = "A"
            }
            else if(totalpoints >= 71 && totalpoints <= 77){
                  teacherComment = "V.good"
                  principleComment = "V.good"
                  overallGrade = "A-"
            }
            else if(totalpoints >= 64 && totalpoints <= 70){
                  teacherComment = "Good"
                  principleComment = "Good"
                  overallGrade = "B+"
            }
            else if(totalpoints >= 57 && totalpoints<= 63){
                  teacherComment = "Fair"
                  principleComment = "Fair"
                  overallGrade = "B"
            }
            else if(totalpoints >= 50 && totalpoints <= 56){
                  teacherComment = "Fair"
                  principleComment = "Fair"
                  overallGrade = "B-"
            }
            else if(totalpoints >= 43 && totalpoints<= 49){
                  teacherComment = "Good trial"
                  principleComment = "Good trial"
                  overallGrade = "C+"
            }
            else if(totalpoints >= 36 && totalpoints<= 42){
                  teacherComment = "Improve"
                  principleComment = "Improve"
                  overallGrade = "C"   
            }
            else if(totalpoints >= 29 && totalpoints <= 35){
                  teacherComment = "Work harder"
                  principleComment = "Work harder"
                  overallGrade = "C-"
            }
            else if(totalpoints >= 22 && totalpoints <= 28){
                  teacherComment = "Work hard"
                  principleComment = "Work hard"
                  overallGrade = "D+"
            }
            else if(totalpoints >= 15 && totalpoints <= 21){
                  teacherComment = "Put more effort"
                  principleComment = "Put more effort"
                  overallGrade = "D"
            }
            else if(totalpoints >= 8 && totalpoints <= 14){
                  teacherComment = "Avoid D grade"
                  principleComment = "Avoid D grade"
                  overallGrade = "D-"
            }
            else if(totalpoints >= 1 && totalpoints <= 7){
                  teacherComment = "Avoid E grade"
                  principleComment = "Avoid E grade"
                  overallGrade = "E"
            }
            else{    
                  teacherComment = null
                  principleComment = null
                  overallGrade = null       
            }

            console.log(overallGrade +""+ totalpoints)
      })
})
module.exports = {
      initiateMarks,
      captureScoreByExamBySubject,
      getCapturedMarksByExamID,
      getCapturedMarksByItemEntryID,
      subjectGradesAndComments,
      calculateGrades
};
