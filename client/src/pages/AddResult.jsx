import { useEffect, useState } from "react";

function AddResult({ setPage, darkMode }) {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);

  const [student, setStudent] = useState("");
  const [course, setCourse] = useState("");
  const [marks, setMarks] = useState("");
  const [grade, setGrade] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // GET STUDENTS
  useEffect(() => {
    fetch("http://localhost:5000/students")
      .then((res) => res.json())
      .then((data) => {
        setStudents(data);
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
      });
  }, []);

  // GET COURSES
  useEffect(() => {
    fetch("http://localhost:5000/courses")
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  }, []);

  // CALCULATE GRADE
  const calculateGrade = (value) => {
    const mark = Number(value);

    if (mark >= 90) return "A";
    if (mark >= 80) return "B";
    if (mark >= 70) return "C";
    if (mark >= 60) return "D";
    if (mark >= 50) return "E";
    return "F";
  };

  // MARKS CHANGE
  const handleMarksChange = (e) => {
    const value = e.target.value;

    setMarks(value);

    if (value !== "") {
      setGrade(calculateGrade(value));
    } else {
      setGrade("");
    }
  };

  // SUBMIT RESULT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!student || !course || marks === "") {
      setMessage("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const response = await fetch(
        "http://localhost:5000/grades",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            student,
            course,
            marks: Number(marks),
            grade,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to add result"
        );
      }

      setMessage("Result added successfully!");

      setStudent("");
      setCourse("");
      setMarks("");
      setGrade("");

    } catch (error) {
      console.error("Error adding result:", error);
      setMessage(error.message);

    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className={`flex-1 p-8 transition-colors duration-300 min-h-screen ${
        darkMode ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-800"
      }`}
    >

      {/* HEADER */}
      <div className="max-w-3xl mx-auto">

        <div className="flex items-center justify-between mb-8">

          <div>
            <h2
              className={`text-3xl font-bold ${
                darkMode ? "text-white" : "text-slate-800"
              }`}
            >
              Add Result
            </h2>

            <p
              className={`mt-1 ${
                darkMode ? "text-slate-400" : "text-slate-500"
              }`}
            >
              Add a student's academic result
            </p>
          </div>

          <button
            type="button"
            onClick={() => setPage("results")}
            className={`px-5 py-3 rounded-xl font-medium transition ${
              darkMode
                ? "bg-slate-800 hover:bg-slate-700 text-slate-300"
                : "bg-slate-200 hover:bg-slate-300 text-slate-700"
            }`}
          >
            ← Back
          </button>

        </div>

        {/* FORM */}
        <div
          className={`rounded-2xl shadow-sm border p-8 transition-colors duration-300 ${
            darkMode
              ? "bg-slate-900 border-slate-800"
              : "bg-white border-slate-200"
          }`}
        >

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* STUDENT */}
            <div>

              <label
                className={`block text-sm font-semibold mb-2 ${
                  darkMode ? "text-slate-300" : "text-slate-700"
                }`}
              >
                Student
              </label>

              <select
                value={student}
                onChange={(e) => setStudent(e.target.value)}
                className={`w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 ${
                  darkMode
                    ? "bg-slate-800 border-slate-700 text-white"
                    : "bg-white border-slate-300 text-slate-800"
                }`}
                required
              >

                <option value="">
                  Select Student
                </option>

                {students.map((item) => (
                  <option
                    key={item._id}
                    value={item._id}
                  >
                    {item.name}
                  </option>
                ))}

              </select>

            </div>

            {/* COURSE */}
            <div>

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
                required
              >

                <option value="">
                  Select Course
                </option>

                {courses.map((item) => (
                  <option
                    key={item._id}
                    value={item._id}
                  >
                    {item.name}
                  </option>
                ))}

              </select>

            </div>

            {/* MARKS */}
            <div>

              <label
                className={`block text-sm font-semibold mb-2 ${
                  darkMode ? "text-slate-300" : "text-slate-700"
                }`}
              >
                Marks
              </label>

              <input
                type="number"
                min="0"
                max="100"
                value={marks}
                onChange={handleMarksChange}
                placeholder="Enter marks"
                className={`w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 ${
                  darkMode
                    ? "bg-slate-800 border-slate-700 text-white placeholder-slate-500"
                    : "bg-white border-slate-300 text-slate-800 placeholder-slate-400"
                }`}
                required
              />

            </div>

            {/* GRADE */}
            <div>

              <label
                className={`block text-sm font-semibold mb-2 ${
                  darkMode ? "text-slate-300" : "text-slate-700"
                }`}
              >
                Grade
              </label>

              <input
                type="text"
                value={grade}
                readOnly
                placeholder="Grade will be calculated automatically"
                className={`w-full border rounded-xl px-4 py-3 font-semibold ${
                  darkMode
                    ? "bg-slate-800/50 border-slate-700 text-slate-300 placeholder-slate-500"
                    : "bg-slate-100 border-slate-300 text-slate-700 placeholder-slate-400"
                }`}
              />

            </div>

            {/* MESSAGE */}
            {message && (
              <div
                className={`px-4 py-3 rounded-xl border ${
                  darkMode
                    ? "bg-blue-950/50 border-blue-800 text-blue-300"
                    : "bg-blue-50 border-blue-200 text-blue-700"
                }`}
              >
                {message}
              </div>
            )}

            {/* BUTTONS */}
            <div className="flex gap-3 pt-2">

              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 rounded-xl font-medium shadow-sm transition"
              >
                {loading ? "Adding..." : "Add Result"}
              </button>

              <button
                type="button"
                onClick={() => setPage("results")}
                className={`px-6 py-3 rounded-xl font-medium transition ${
                  darkMode
                    ? "bg-slate-800 hover:bg-slate-700 text-slate-300"
                    : "bg-slate-200 hover:bg-slate-300 text-slate-700"
                }`}
              >
                Cancel
              </button>

            </div>

          </form>

        </div>

      </div>

    </main>
  );
}

export default AddResult;