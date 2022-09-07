let {examID, SubjectID, isKiwaswahili} = req.body

if(isKiwaswahili){
let score = 80
let grade = ""
let comment = ""
let subjectTeacher = ""
let points = 0
// calculate subject grade
if(score >=80 || score <=100){
      grade = "A"
      comment = "Excellent"
      points = 12
} 
else if(score >=75 || score <= 79.99){
      grade = "A-"
      comment = "V.Good"
      points = 11 
}
else if(score >=70 || score <=75.99){
      grade = "B+"
      comment = "Good"
      points = 9
}
else if(score >=65 || score <=69.99){
      grade = "B+"
      comment = "Good"
      points =8
}
else if(score >=60 || score <= 64.99 ){
      grade = "B+"
      comment = "Good"
      points =8
}
else if(score >= 55 || score <= 59.99){
      grade = "B+"
      comment = "Good"
      points =7
}
else if(score >= 50 || score <= 54.99){
      grade = "B+"
      comment = "Good"
      points =6
}
else if(score >= 45 || score <= 49.99){
      grade = "B+"
      comment = "Good"
      points =5
}
else if(score >= 40 || score <= 44.99){
      grade = "B+"
      comment = "Good"
      points =4
}
else if(score >=35 || score <= 39.99){
      grade = "B+"
      comment = "Good"
      points =3
}
else if (score >= 30 || score <= 34.99){
      grade = "B+"
      comment = "Good"
      points =2
}
else if(score >= 0 || score <= 29.99){
      grade = "B+"
      comment = "Good"
      points =1
}
else{

}
}
else{}