const Student = require("../models/Student")
const fs = require("fs");
const path = require("path");


const removeImage = (imagePath) => {
    if(!imagePath) return;

    const filname = path.basename(imagePath);
    const fullPath = path.join(__dirname, ".." , "uploads" , filename);

    if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
    }
};



// GET: Get all students
 const getStudent = async (req, res) => {
    try {
        const students = await Student.find();

        res.status(200).json({
            success: true,
            data: students
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// POST: Save new student
const createStudent =  async (req, res) => {
    try {

        const {name , email , course } = req.body;
       const student = await Student.create({
        name , 
        course , 
        email, 
        image : req.file ? `/uploads/${req.file.filename}`: ""
       });

        res.status(201).json({
            success: true,
            message: "Student saved successfully",
            data: student
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const updateStudent = async (req, res) => {
    try {
    
        const student = await Student.findByIdAndUpdate(
            req.params.id);
          

        // Check if student exists
        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        student.name = req.body.name;
        student.email = req.body.email;
        student.course = req.body.course;
        if (req.file) {
            removeImage(student.iamge) ;
            student.image = `/uploads/${req.file.filename}`;
        }

        await student.save();
        res.status(200).json({
            success: true,
            message: "Student updated successfully",
            data: student
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
const deleteStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(
            req.params.id
        );

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        removeImage(student.image);

        res.status(200).json({
            success: true,
            message: "Student deleted successfully",
            data: student
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    
    getStudent, 
    createStudent , updateStudent , deleteStudent
}
