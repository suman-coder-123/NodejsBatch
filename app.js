// const getStudent = require("./student");
// const calculator = require("./calculator");

// const fs = require("fs");

// console.log("hello world");

// console.log("fs module loaded");

// console.log("welcome to node js ");

// console.log(10+20 *2);


// getStudent();

// console.log(calculator.add(20,30));
// console.log(calculator.sub(30,11));

// console.log(calculator.multiply(2,89));



// fs.writeFileSync("student.txt" , "hello students");

// console.log("file created");

// const data = fs.readFileSync("student.txt" , "utf8");

// console.log(data);

// fs.appendFileSync("student.txt" , "\n welcome to node js ");

// console.log("updated");


// fs.unlinkSync("student.txt");

// console.log("deletd");


// fs.renameSync("student.txt" , "person.txt");
// console.log("changed");


// fs.mkdirSync("src");

// console.log("folder created");


// const result = fs.existsSync("src");

// console.log(result);


// const files =fs.readdirSync(".");
// console.log(files);


// fs.rmdirSync("src");

// console.log("deleted");



// const path = require("path");


// const result = path.join("users" , "students" , "profile.png");

// console.log(result);


// const result = path.resolve("uploads" , "photo.png");

// console.log(result)


// const result = path.basename("uploads/images/photo.png");

// console.log(result);


// const result1 = path.basename("uploads/images/photo.png" , ".png");
// console.log(result1);


// const show = path.dirname("uploads/images/photo.png");
// console.log(show);


// console.log(path.extname("resume.pdf"));


// console.log(path.parse("uploads/images/photo.png"));


// const { stat } = require("fs");
const http = require("http");

// const server = http.createServer((req , res) => {
//     // res.end("hello! welcome to node.js server");
//     // console.log(req.url);
//     // console.log(req.method);
//     res.write("hello students / ");

//     res.end();


// });


// const server = http.createServer((req , res ) => {
//     res.statusCode = 404;

//     res.end("not found");
// })



// const server = http.createServer((req , res ) => {
//     res.setHeader("Content-Type" , "application/json");

//     res.end(JSON.stringify({
//         message : "hello node js",
//         status : true
//     }));
// });



// const server = http.createServer((req , res) => {
//     if (req.url === "/"){
//         res.end("welcome to home page ")
//     } else if (req.url === "/about") {
//         res.end("this is about page");
//     } else if (req.url === "/contact") {
//         res.end("this is contact page");
//     } else {
//         res.statusCode = 404;
//         res.end("404 page not found");
//     }
// });

// server.listen(3000 , () => {
//     console.log("server is running at http://localhost:3000");
// });



// const server = http.createServer((req , res) => {
//     if (req.url === "/register" && req.method === "POST") {
//         res.end("registration request recieved");
//     } else {
//         res.end ("invalid route");
//     }
// });

// server.listen(3000 , () => {
//     console.log("server running on port 3000");
// });


// how to recieve the data  => req.on("data");

// student registration api 

const server = http.createServer((req , res) => {
    if (req.url === "/register" && req.method === "POST") {
        let body = "";

        req.on("data" , (chunk) => {
            body += chunk;
        });

        req.on("end" , () => {
           try {
            const student = JSON.parse(body);
            console.log("data recieved ");

            res.writeHead(201 , {
                "Content-Type" : "application/json"
            });

            res.end(JSON.stringify({
                message : "student registration successfully",
                student : student
            }));
           } catch (error) {
            res.writeHead(400 , {
                "Content-Type" : "application/json"
            });

            res.end(JSON.stringify({
                message : "invalid json data "
            }));
           }
        });
    } else {
         res.writeHead(400 , {
                "Content-Type" : "application/json"
            });
               res.end(JSON.stringify({
                message : "invalid route  "
            }));

    }
});

server.listen(3000 , () => {
    console.log("server running on port 3000");
});


















