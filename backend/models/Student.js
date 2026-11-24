

// create schema of student 

const { default: mongoose } = require("mongoose");

const studentSchema = new mongoose.Schema(
    {
        name : {
            type : String,
            // required : true,
            // trim : true
        },
        email : {
            type : String,
            // required : true ,
            // unique : true,
            // lowercase : true, 
            // trim : true
        },
        course : {
            type : String , 
            // required : true , 
            // trim : true
        },
        image : {
            type : String,
        }
    }, 
    {
        timestamps : true
    }
);


// create model 

const Student = mongoose.model("Student" , studentSchema);

module.exports = Student;