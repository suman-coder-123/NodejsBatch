const express = require("express");

const router = express.Router();

const {getStudent, createStudent , updateStudent , deleteStudent} = require("../controllers/studentController");

console.log(getStudent , createStudent , updateStudent);

router.get("/" , getStudent);
router.post("/" , createStudent);
router.put("/:id" , updateStudent);
router.delete("/:id" , deleteStudent);




module.exports = router;