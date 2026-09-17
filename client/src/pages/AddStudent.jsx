import { useEffect, useState } from "react";

function AddStudent({ setPage, darkMode }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [course, setCourse] = useState("");

  const [courses, setCourses] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [coursesLoading, setCoursesLoading] = useState(true);

  // GET COURSES
  useEffect(() => {
    fetch("http://localhost:5000/courses")
      .then((response) => response.json())
      .then((data) => {
        setCourses(data);
        setCoursesLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
        setCoursesLoading(false);
        setMessage("Failed to load courses.");
      });
  }, []);

  // ADD STUDENT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !age || !course) {
      setMessage("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const response = await fetch("http://localhost:5000/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          age: Number(age),
          course,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add student");
      }

      setMessage("Student added successfully! ✅");

      setName("");
      setEmail("");
      setAge("");
      setCourse("");

      setTimeout(() => {
        setPage("students");
      }, 1000);
    } catch (error) {
      console.error("Error adding student:", error);
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen p-8 transition-colors duration-300 ${
        darkMode ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-800"
      }`}
    >

      <div className="max-w-2xl mx-auto">

        {/* HEADER */}
        <div className="mb-8">

          <button
            type="button"
            onClick={() => setPage("dashboard")}
            className={`mb-5 font-medium transition ${
              darkMode
                ? "text-blue-400 hover:text-blue-300"
                : "text-blue-600 hover:text-blue-700"
            }`}
          >
            ← Back to Dashboard
          </button>

          <h1
            className={`text-3xl font-bold ${
              darkMode ? "text-white" : "text-slate-800"
            }`}
          >
            Add Student
          </h1>

          <p
            className={`mt-1 ${
              darkMode ? "text-slate-400" : "text-slate-500"
            }`}
          >
            Add a new student to the system
          </p>

        </div>

        {/* FORM CARD */}
        <div
          className={`rounded-2xl shadow-sm border p-8 transition-colors duration-300 ${
            darkMode
              ? "bg-slate-900 border-slate-700"
              : "bg-white border-slate-200"
          }`}
        >

          <form onSubmit={handleSubmit}>

            {/* NAME */}
            <div className="mb-6">

              <label
                className={`block text-sm font-semibold mb-2 ${
                  darkMode ? "text-slate-300" : "text-slate-700"
                }`}
              >
                Student Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter student name"
                className={`w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 ${
                  darkMode
                    ? "bg-slate-800 border-slate-700 text-white placeholder-slate-500"
                    : "bg-white border-slate-300 text-slate-800 placeholder-slate-400"
                }`}
              />

            </div>

            {/* EMAIL */}
            <div className="mb-6">

              <label
                className={`block text-sm font-semibold mb-2 ${
                  darkMode ? "text-slate-300" : "text-slate-700"
                }`}
              >
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter student email"
                className={`w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 ${
                  darkMode
                    ? "bg-slate-800 border-slate-700 text-white placeholder-slate-500"
                    : "bg-white border-slate-300 text-slate-800 placeholder-slate-400"
                }`}
              />

            </div>

            {/* AGE */}
            <div className="mb-6">

              <label
                className={`block text-sm font-semibold mb-2 ${
                  darkMode ? "text-slate-300" : "text-slate-700"
                }`}
              >
                Age
              </label>

              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Enter student age"
                className={`w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 ${
                  darkMode
                    ? "bg-slate-800 border-slate-700 text-white placeholder-slate-500"
                    : "bg-white border-slate-300 text-slate-800 placeholder-slate-400"
                }`}
              />

            </div>

            {/* COURSE */}
            <div className="mb-8">

              <label
                className={`block text-sm font-semibold mb-2 ${
                  darkMode ? "text-slate-300" : "text-slate-700"
                }`}
              >
                Course
              </label>

              <select
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                className={`w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 ${
                  darkMode
                    ? "bg-slate-800 border-slate-700 text-white"
                    : "bg-white border-slate-300 text-slate-800"
                }`}
                disabled={coursesLoading}
              >

                <option value="">
                  {coursesLoading
                    ? "Loading courses..."
                    : "Select a course"}
                </option>

                {courses.map((courseItem) => (
                  <option
                    key={courseItem._id}
                    value={courseItem._id}
                  >
                    {courseItem.name} ({courseItem.code})
                  </option>
                ))}

              </select>

            </div>

            {/* MESSAGE */}
            {message && (
              <div
                className={`mb-6 p-3 rounded-xl ${
                  darkMode
                    ? "bg-slate-800 text-slate-200"
                    : "bg-slate-100 text-slate-700"
                }`}
              >
                {message}
              </div>
            )}

            {/* BUTTONS */}
            <div className="flex gap-4">

              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white px-6 py-3 rounded-xl font-medium shadow-sm transition"
              >
                {loading ? "Adding..." : "Add Student"}
              </button>

              <button
                type="button"
                onClick={() => setPage("dashboard")}
                className={`px-6 py-3 rounded-xl font-medium transition ${
                  darkMode
                    ? "bg-slate-800 hover:bg-slate-700 text-slate-200"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                }`}
              >
                Cancel
              </button>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
}

export default AddStudent;