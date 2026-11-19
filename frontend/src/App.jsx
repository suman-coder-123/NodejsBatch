import { useEffect } from "react";
import { useState } from "react";

const App = () => {

  const[loading , setLoading] = useState(false);
  const [editingID , setEditingId] = useState(null);

  const [students , setStudents] = useState([]);
  const [ formData , setFormData] = useState({
    name : "",
    email : "",
    course : ""
  });

  const API_URL = "http://localhost:5000/api/students"



  /// get method 
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



  // handle input 
  const handleChange = (e) => {
    setFormData ({
      ...formData , [e.target.name] : [e.target.value]
    }); 
  };


  // handle submit 
  const handleSubmit = async () => {
  
    setLoading(true);
    try {

      const method = editingID ? "PUT" : "POST";
      const url = editingID ? `${API_URL}/${editingID}` : API_URL;


      console.log("reuqest method" , method);
      console.log("url " , url);
      console.log(formData);

      const response = await fetch(url , {
        method : method, 
        headers : {
          "Content-Type" : "application/json"
        },
          body : JSON.stringify(formData)
      });

      const result = await response.json();


      console.log("backend" , result);
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

        setEditingId(null);

       await getStudents();
      
    } catch(error) {
      console.log("error = "+ error);
      alert("something went wrong");
    } finally {
      setLoading(false);
    }
  };


  // edit student 

  const handleEdit = (student) => {
    setEditingId(student.id);

    setFormData({
      name : student.name || "",
      email : student.email || "",
      course : student.course || ""
    });
  }


  // delete student 


  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("ar eyou sure to delete this student");
    if (!confirmDelete) return ;


    try {
      const response = await fetch(`${API_URL}/${id}` , {
        method : "DELETE"
      });

      const result = await response.json();


      if (!response.ok) {
        alert("result.message");
        return;
      }

      alert(result.message);


      if (editingID === id){
        handleCancel();
      }

      await getStudents();
    } catch (error) {
      console.log("error"+ error);
      alert("unable to delete student");
    }
  };


  const handleCancel = () => {
    setEditingId(null);
    setFormData({
      name : "",
      email : "",
      course : ""
    });
  };


  return (
    <div>
      <h1>Student Management System </h1>


      <div>
        <h2>{editingID ? "Update Student" : "Register Student"}</h2>
      </div>
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
           <button type="submit" disabled = {loading} >{loading ? "please wait ...." : editingID ? "upadte student": "register student"} </button>


           {editingID && <button  type="button" onClick={handleCancel}> Cancel Edit</button>}
      </form>


      <h2>registered student</h2>

      <div>
        {students.map((student) => (
          <div key={student.id}>
            <h3>{student.name}</h3>
            <p>{student.email}</p>
            <p>{student.course}</p>

            <div>
              <button onClick={() => handleEdit(student)}>Edit</button>
              <button onClick={() => handleDelete(student.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
