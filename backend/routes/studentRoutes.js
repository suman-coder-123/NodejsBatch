const express = require("express");
const router = express.Router();
const {getStudent, createStudent , updateStudent , deleteStudent} = require("../controllers/studentController");
const upload = require("../middleware/upload");


router.get("/" , getStudent);
router.post("/" , upload.single("image"), createStudent);
router.put("/:id" , upload.single("image") ,updateStudent);
router.delete("/:id" , deleteStudent);




module.exports = router;