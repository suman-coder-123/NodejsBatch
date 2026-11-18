import { useEffect } from "react";
import { useState } from "react";

const App = () => {

  const [students , setStudents] = useState([]);
  const [ formData , setFormData] = useState({
    name : "",
    email : "",
    course : ""
  });

  const API_URL = "http://localhost:5000/api/students"

  const getStudents = async () => {
    try {
      const response = await fetch(API_URL);
      const result = await response.json();

      setStudents(result.data); 
    } catch(error) {
      console.log(error);
    }
  };


  useEffect(() => {
    getStudents();
  } , []);


  const handleChange = (e) => {
    setFormData ({
      ...formData , [e.target.name] : [e.target.value]
    });
  };

  const handleSubmit = async () => {
  
    try {
      const response = await fetch(API_URL , {
        method : "POST", 
        headers : {
          "Content-Type" : "application/json"
        },
          body : JSON.stringify(formData)
      });

      const result = await response.json();
      if (!response.ok){
        alert(result.message);
        return ;
      }

      alert(result.message);
        setFormData ({
          name : "",
          email : "",
          course: ""
        });

        getStudents();
      
    } catch(error) {
      console.log("error = "+ error);
    }
  };
  return (
    <div>
      <h1>Student Management System </h1>

      <form  onSubmit={handleSubmit}>
        <label htmlFor="name">Name : </label>
        <input type="text" 
        name="name"
         placeholder="enter your name" 
         id="name" 
         value={formData.name}
         onChange={handleChange}
         required/>

<br /><br />
        <label htmlFor="email">Email : </label>
        <input type="email"
         name="email"
          placeholder="enter your name " 
           id="email"
           value={formData.email}
           onChange={handleChange}
           required/>
<br /><br />

            <label htmlFor="course">Course : </label>
        <input type="text"
         name="course"
          placeholder="enter your course " 
           id="course"
           value={formData.course}
           onChange={handleChange}
           required/>
<br /><br />
           <button type="submit">Register Student </button>
      </form>


      <h2>registered student</h2>

      <div>
        {students.map((student) => (
          <div key={student.id}>
            <h3>{student.name}</h3>
            <p>{student.email}</p>
            <p>{student.course}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
