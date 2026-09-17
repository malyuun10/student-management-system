import { useEffect, useState } from "react";

function Results({ setPage, darkMode }) {
  const [results, setResults] = useState([]);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);

  const [loading, setLoading] = useState(true);

  // EDIT STATES
  const [editingResult, setEditingResult] = useState(null);
  const [editStudent, setEditStudent] = useState("");
  const [editCourse, setEditCourse] = useState("");
  const [editMarks, setEditMarks] = useState("");
  const [editGrade, setEditGrade] = useState("");

  // GET RESULTS
  const fetchResults = () => {
    fetch("http://localhost:5000/grades")
      .then((res) => res.json())
      .then((data) => {
        setResults(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching results:", error);
        setLoading(false);
      });
  };

  // GET STUDENTS
  const fetchStudents = () => {
    fetch("http://localhost:5000/students")
      .then((res) => res.json())
      .then((data) => {
        setStudents(data);
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
      });
  };

  // GET COURSES
  const fetchCourses = () => {
    fetch("http://localhost:5000/courses")
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  };

  useEffect(() => {
    fetchResults();
    fetchStudents();
    fetchCourses();
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

    setEditMarks(value);

    if (value !== "") {
      setEditGrade(calculateGrade(value));
    } else {
      setEditGrade("");
    }
  };

  // START EDIT
  const handleEdit = (result) => {
    setEditingResult(result);

    setEditStudent(
      result.student?._id || result.student || ""
    );

    setEditCourse(
      result.course?._id || result.course || ""
    );

    setEditMarks(result.marks);
    setEditGrade(result.grade);
  };

  // CANCEL EDIT
  const cancelEdit = () => {
    setEditingResult(null);
    setEditStudent("");
    setEditCourse("");
    setEditMarks("");
    setEditGrade("");
  };

  // UPDATE RESULT
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!editStudent || !editCourse || editMarks === "") {
      alert("Please fill in all fields");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/grades/${editingResult._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            student: editStudent,
            course: editCourse,
            marks: Number(editMarks),
            grade: editGrade,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update result"
        );
      }

      // Find selected student
      const selectedStudent = students.find(
        (student) => student._id === editStudent
      );

      // Find selected course
      const selectedCourse = courses.find(
        (course) => course._id === editCourse
      );

      // Updated result
      const updatedResult = {
        ...data,
        student: selectedStudent || data.student,
        course: selectedCourse || data.course,
      };

      setResults((prev) =>
        prev.map((result) =>
          result._id === editingResult._id
            ? updatedResult
            : result
        )
      );

      cancelEdit();

      alert("Result updated successfully!");

    } catch (error) {
      console.error("Update error:", error);
      alert(error.message);
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this result?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:5000/grades/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete result");
      }

      setResults((prev) =>
        prev.filter((result) => result._id !== id)
      );

    } catch (error) {
      console.error(error);
      alert("Failed to delete result");
    }
  };

  return (
    <main
      className={`flex-1 p-8 transition-colors duration-300 min-h-screen ${
        darkMode ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-800"
      }`}
    >

      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">

        <div>
          <h2
            className={`text-3xl font-bold ${
              darkMode ? "text-white" : "text-slate-800"
            }`}
          >
            Results
          </h2>

          <p
            className={`mt-1 ${
              darkMode ? "text-slate-400" : "text-slate-500"
            }`}
          >
            Student grades and academic results
          </p>
        </div>

        <div className="flex items-center gap-3">

          <div
            className={`px-5 py-3 rounded-xl shadow-sm border transition-colors duration-300 ${
              darkMode
                ? "bg-slate-900 border-slate-800"
                : "bg-white border-slate-200"
            }`}
          >

            <p
              className={`text-sm ${
                darkMode ? "text-slate-400" : "text-slate-500"
              }`}
            >
              Total Results
            </p>

            <p
              className={`text-2xl font-bold ${
                darkMode ? "text-white" : "text-slate-800"
              }`}
            >
              {results.length}
            </p>

          </div>

          <button
            type="button"
            onClick={() => setPage("addResult")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-medium shadow-sm transition"
          >
            ➕ Add Result
          </button>

        </div>

      </div>

      {/* EDIT RESULT FORM */}
      {editingResult && (
        <div
          className={`rounded-2xl shadow-sm border p-8 mb-8 transition-colors duration-300 ${
            darkMode
              ? "bg-slate-900 border-slate-800"
              : "bg-white border-slate-200"
          }`}
        >

          <div className="flex items-center justify-between mb-6">

            <div>
              <h3
                className={`text-2xl font-bold ${
                  darkMode ? "text-white" : "text-slate-800"
                }`}
              >
                Edit Result
              </h3>

              <p
                className={`mt-1 ${
                  darkMode ? "text-slate-400" : "text-slate-500"
                }`}
              >
                Update student's academic result
              </p>
            </div>

            <button
              type="button"
              onClick={cancelEdit}
              className={`px-5 py-2.5 rounded-xl font-medium transition ${
                darkMode
                  ? "bg-slate-800 hover:bg-slate-700 text-slate-300"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-700"
              }`}
            >
              ✕ Cancel
            </button>

          </div>

          <form
            onSubmit={handleUpdate}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
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
                value={editStudent}
                onChange={(e) =>
                  setEditStudent(e.target.value)
                }
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

                {students.map((student) => (
                  <option
                    key={student._id}
                    value={student._id}
                  >
                    {student.name}
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
                value={editCourse}
                onChange={(e) =>
                  setEditCourse(e.target.value)
                }
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

                {courses.map((course) => (
                  <option
                    key={course._id}
                    value={course._id}
                  >
                    {course.name}
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
                value={editMarks}
                onChange={handleMarksChange}
                className={`w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 ${
                  darkMode
                    ? "bg-slate-800 border-slate-700 text-white"
                    : "bg-white border-slate-300 text-slate-800"
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
                value={editGrade}
                readOnly
                className={`w-full border rounded-xl px-4 py-3 font-semibold ${
                  darkMode
                    ? "bg-slate-800/50 border-slate-700 text-slate-300"
                    : "bg-slate-100 border-slate-300 text-slate-700"
                }`}
              />

            </div>

            {/* BUTTON */}
            <div className="md:col-span-2 flex gap-3">

              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium shadow-sm transition"
              >
                ✏️ Update Result
              </button>

              <button
                type="button"
                onClick={cancelEdit}
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
      )}

      {/* RESULTS */}
      {!editingResult && (
        <div
          className={`rounded-2xl shadow-sm border overflow-hidden transition-colors duration-300 ${
            darkMode
              ? "bg-slate-900 border-slate-800"
              : "bg-white border-slate-200"
          }`}
        >

          <div
            className={`p-6 border-b ${
              darkMode ? "border-slate-800" : "border-slate-200"
            }`}
          >

            <h3
              className={`text-xl font-bold ${
                darkMode ? "text-white" : "text-slate-800"
              }`}
            >
              All Results
            </h3>

            <p
              className={`text-sm mt-1 ${
                darkMode ? "text-slate-400" : "text-slate-500"
              }`}
            >
              View student marks and grades
            </p>

          </div>

          {/* LOADING */}
          {loading ? (

            <div
              className={`p-12 text-center ${
                darkMode ? "text-slate-400" : "text-slate-500"
              }`}
            >
              Loading results...
            </div>

          ) : results.length === 0 ? (

            <div className="p-12 text-center">

              <div
                className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-4 ${
                  darkMode ? "bg-slate-800" : "bg-slate-100"
                }`}
              >
                🎓
              </div>

              <h4
                className={`font-semibold ${
                  darkMode ? "text-slate-200" : "text-slate-700"
                }`}
              >
                No Results Yet
              </h4>

              <p
                className={`text-sm mt-1 ${
                  darkMode ? "text-slate-400" : "text-slate-500"
                }`}
              >
                Student results will appear here.
              </p>

              <button
                type="button"
                onClick={() => setPage("addResult")}
                className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition"
              >
                ➕ Add First Result
              </button>

            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead
                  className={
                    darkMode ? "bg-slate-800/60" : "bg-slate-50"
                  }
                >

                  <tr
                    className={`border-b ${
                      darkMode ? "border-slate-800" : "border-slate-200"
                    }`}
                  >

                    <th
                      className={`text-left px-6 py-4 text-sm font-semibold ${
                        darkMode ? "text-slate-400" : "text-slate-600"
                      }`}
                    >
                      Student
                    </th>

                    <th
                      className={`text-left px-6 py-4 text-sm font-semibold ${
                        darkMode ? "text-slate-400" : "text-slate-600"
                      }`}
                    >
                      Course
                    </th>

                    <th
                      className={`text-left px-6 py-4 text-sm font-semibold ${
                        darkMode ? "text-slate-400" : "text-slate-600"
                      }`}
                    >
                      Marks
                    </th>

                    <th
                      className={`text-left px-6 py-4 text-sm font-semibold ${
                        darkMode ? "text-slate-400" : "text-slate-600"
                      }`}
                    >
                      Grade
                    </th>

                    <th
                      className={`text-left px-6 py-4 text-sm font-semibold ${
                        darkMode ? "text-slate-400" : "text-slate-600"
                      }`}
                    >
                      Actions
                    </th>

                  </tr>

                </thead>

                <tbody
                  className={`divide-y ${
                    darkMode ? "divide-slate-800" : "divide-slate-100"
                  }`}
                >

                  {results.map((result) => (

                    <tr
                      key={result._id}
                      className={`transition ${
                        darkMode
                          ? "hover:bg-slate-800/40"
                          : "hover:bg-slate-50"
                      }`}
                    >

                      {/* STUDENT */}
                      <td
                        className={`px-6 py-5 font-semibold ${
                          darkMode ? "text-slate-200" : "text-slate-800"
                        }`}
                      >
                        {result.student?.name ||
                          "Unknown Student"}
                      </td>

                      {/* COURSE */}
                      <td
                        className={`px-6 py-5 ${
                          darkMode ? "text-slate-300" : "text-slate-700"
                        }`}
                      >
                        {result.course?.name ||
                          "Unknown Course"}
                      </td>

                      {/* MARKS */}
                      <td
                        className={`px-6 py-5 font-semibold ${
                          darkMode ? "text-slate-200" : "text-slate-800"
                        }`}
                      >
                        {result.marks}
                      </td>

                      {/* GRADE */}
                      <td className="px-6 py-5">

                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            darkMode
                              ? "bg-emerald-900/40 text-emerald-400"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {result.grade}
                        </span>

                      </td>

                      {/* ACTIONS */}
                      <td className="px-6 py-5">

                        <div className="flex gap-2">

                          <button
                            type="button"
                            onClick={() =>
                              handleEdit(result)
                            }
                            className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                              darkMode
                                ? "bg-blue-900/40 text-blue-400 hover:bg-blue-900/60"
                                : "bg-blue-100 hover:bg-blue-200 text-blue-700"
                            }`}
                          >
                            ✏️ Edit
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleDelete(result._id)
                            }
                            className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                              darkMode
                                ? "bg-red-900/40 text-red-400 hover:bg-red-900/60"
                                : "bg-red-100 hover:bg-red-200 text-red-700"
                            }`}
                          >
                            🗑️ Delete
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </div>
      )}

    </main>
  );
}

export default Results;