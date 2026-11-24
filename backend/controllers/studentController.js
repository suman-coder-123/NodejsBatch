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

const updateStudent = async (req, res) => {
    try {
        const { name, email, course } = req.body;

        // Check all fields
        if (!name || !email || !course) {
            return res.status(400).json({
                success: false,
                message: "Please provide all fields"
            });
        }

        const student = await Student.findByIdAndUpdate(
            req.params.id,
            {
                name,
                email,
                course
            },
            {
                new: true,
                runValidators: true
            }
        );

        // Check if student exists
        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

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
