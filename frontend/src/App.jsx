
import { useState, useEffect } from "react";

const API_URL = "http://localhost:5000/api/students";

function App() {

    const [students, setStudents] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        course: ""
    });

    const [editingId, setEditingId] = useState(null);
        const [loading, setLoading] = useState(false);


    // GET: Fetch all students
    const getStudents = async () => {
        try {
            const response = await fetch(API_URL);
            const result = await response.json();

            setStudents(result.data || []);

        } catch (error) {
            console.log("Error fetching students:", error);
        }
    };


    useEffect(() => {
        getStudents();
    }, []);


    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            const method = editingId ? "PUT" : "POST";

            const url = editingId
                ? `${API_URL}/${editingId}`
                : API_URL;

            const response = await fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (!response.ok) {
                alert(result.message);
                return;
            }

            alert(result.message);

            setFormData({
                name: "",
                email: "",
                course: ""
            });

            setEditingId(null);

            await getStudents();

        } catch (error) {
            console.log("Error:", error);
            alert("Something went wrong");
        } finally {
            setLoading(false);
        }
    };


    const handleEdit = (student) => {
        setEditingId(student._id);

        setFormData({
            name: student.name,
            email: student.email,
            course: student.course
        });
    };


    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this student?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: "DELETE"
            });

            const result = await response.json();

            if (!response.ok) {
                alert(result.message);
                return;
            }

            alert(result.message);

            // Clear form if deleting edited student
            if (editingId === id) {
                handleCancel();
            }

            // Refresh list
            await getStudents();

        } catch (error) {
            console.log("Delete error:", error);
        }
    };


    // CANCEL EDIT
    const handleCancel = () => {
        setEditingId(null);

        setFormData({
            name: "",
            email: "",
            course: ""
        });
    };


    return (
        <div className="container">

            <h1>Student Management System</h1>


            {/* Student Form */}
            <div className="form-container">

                <h2>
                    {editingId
                        ? "Update Student"
                        : "Register Student"}
                </h2>

                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        name="name"
                        placeholder="Enter student name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="course"
                        placeholder="Enter course"
                        value={formData.course}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit" disabled={loading}>
                        {loading
                            ? "Please wait..."
                            : editingId
                            ? "Update Student"
                            : "Save Student"}
                    </button>

                    {editingId && (
                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={handleCancel}
                        >
                            Cancel Edit
                        </button>
                    )}

                </form>

            </div>


            {/* Student List */}
            <div className="student-section">

                <h2>Registered Students</h2>

                <div className="student-list">

                    {students.length === 0 ? (
                        <p>No students found.</p>
                    ) : (

                        students.map((student) => (

                            <div
                                className="student-card"
                                key={student._id}
                            >

                                <h3>{student.name}</h3>

                                <p>
                                    <strong>Email:</strong>
                                    {" "}{student.email}
                                </p>

                                <p>
                                    <strong>Course:</strong>
                                    {" "}{student.course}
                                </p>

                                <div className="actions">

                                    <button
                                        onClick={() => handleEdit(student)}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="delete-btn"
                                        onClick={() =>
                                            handleDelete(student._id)
                                        }
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>

                        ))

                    )}

                </div>

            </div>

        </div>
    );
}

export default App;
