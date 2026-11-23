const Student = require("../models/Student")

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
       const student = await Student.create(req.body);

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


// PUT: Update student
const updateStudent =  async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

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


// DELETE: Delete student
const deleteStudent =  async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(
            req.params.id
        );

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


module.export = {
    
    getStudent, 
    createStudent , updateStudent , deleteStudent
}
