import { useEffect, useState } from "react";

function Students({ setPage, darkMode }) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Edit states
  const [editingStudent, setEditingStudent] = useState(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editAge, setEditAge] = useState("");
  const [editCourse, setEditCourse] = useState("");

  // Courses
  const [courses, setCourses] = useState([]);

  // Search
  const [search, setSearch] = useState("");

  // Student Profile
  const [selectedStudent, setSelectedStudent] = useState(null);

  // GET STUDENTS
  const fetchStudents = () => {
    fetch("http://localhost:5000/students")
      .then((response) => response.json())
      .then((data) => {
        setStudents(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
        setLoading(false);
      });
  };

  // GET COURSES
  const fetchCourses = () => {
    fetch("http://localhost:5000/courses")
      .then((response) => response.json())
      .then((data) => {
        setCourses(data);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  };

  useEffect(() => {
    fetchStudents();
    fetchCourses();
  }, []);

  // SEARCH STUDENTS
  const filteredStudents = students.filter((student) => {
    const searchText = search.toLowerCase();

    return (
      student.name.toLowerCase().includes(searchText) ||
      student.email.toLowerCase().includes(searchText) ||
      student.course?.name?.toLowerCase().includes(searchText) ||
      student.course?.code?.toLowerCase().includes(searchText)
    );
  });

  // DELETE STUDENT
  const deleteStudent = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:5000/students/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete student");
      }

      setStudents(
        students.filter((student) => student._id !== id)
      );

      setSelectedStudent(null);
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete student");
    }
  };

  // START EDIT
  const startEdit = (student) => {
    setEditingStudent(student);

    setEditName(student.name);
    setEditEmail(student.email);
    setEditAge(student.age);

    setEditCourse(
      student.course?._id || student.course || ""
    );

    setSelectedStudent(null);
  };

  // UPDATE STUDENT
  const updateStudent = async (e) => {
    e.preventDefault();

    if (!editCourse) {
      alert("Please select a course");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/students/${editingStudent._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: editName,
            email: editEmail,
            age: Number(editAge),
            course: editCourse,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update student"
        );
      }

      const selectedCourse = courses.find(
        (course) => course._id === editCourse
      );

      const updatedStudent = {
        ...data,
        course: selectedCourse || data.course,
      };

      setStudents(
        students.map((student) =>
          student._id === editingStudent._id
            ? updatedStudent
            : student
        )
      );

      setEditingStudent(null);
    } catch (error) {
      console.error("Update error:", error);
      alert(error.message);
    }
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-800"
      }`}
    >

      {/* MAIN CONTENT */}
      <main className="p-8">

        {/* ================= STUDENT PROFILE ================= */}
        {selectedStudent && (
          <div
            className={`rounded-2xl border shadow-sm p-8 mb-8 transition-colors duration-300 ${
              darkMode
                ? "bg-slate-900 border-slate-700"
                : "bg-white border-slate-200"
            }`}
          >

            {/* PROFILE HEADER */}
            <div className="flex items-center justify-between mb-6">

              <div>
                <h2
                  className={`text-2xl font-bold ${
                    darkMode ? "text-white" : "text-slate-800"
                  }`}
                >
                  Student Profile
                </h2>

                <p
                  className={`mt-1 ${
                    darkMode ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  Student information and details
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedStudent(null)}
                className={`px-5 py-2.5 rounded-xl font-medium transition ${
                  darkMode
                    ? "bg-slate-800 hover:bg-slate-700 text-slate-200"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                }`}
              >
                ← Back
              </button>

            </div>

            {/* STUDENT NAME */}
            <div className="flex items-center gap-5 mb-8">

              <div
                className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold ${
                  darkMode
                    ? "bg-blue-900/50 text-blue-400"
                    : "bg-blue-100 text-blue-600"
                }`}
              >
                {selectedStudent.name.charAt(0)}
              </div>

              <div>

                <h3
                  className={`text-2xl font-bold ${
                    darkMode ? "text-white" : "text-slate-800"
                  }`}
                >
                  {selectedStudent.name}
                </h3>

                <p
                  className={
                    darkMode ? "text-slate-400" : "text-slate-500"
                  }
                >
                  Student
                </p>

              </div>

            </div>

            {/* PROFILE INFORMATION */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* NAME */}
              <div
                className={`rounded-xl p-5 ${
                  darkMode ? "bg-slate-800/60" : "bg-slate-50"
                }`}
              >

                <p
                  className={`text-sm ${
                    darkMode ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  Full Name
                </p>

                <p
                  className={`font-semibold mt-1 ${
                    darkMode ? "text-white" : "text-slate-800"
                  }`}
                >
                  {selectedStudent.name}
                </p>

              </div>

              {/* EMAIL */}
              <div
                className={`rounded-xl p-5 ${
                  darkMode ? "bg-slate-800/60" : "bg-slate-50"
                }`}
              >

                <p
                  className={`text-sm ${
                    darkMode ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  Email
                </p>

                <p
                  className={`font-semibold mt-1 ${
                    darkMode ? "text-white" : "text-slate-800"
                  }`}
                >
                  {selectedStudent.email}
                </p>

              </div>

              {/* AGE */}
              <div
                className={`rounded-xl p-5 ${
                  darkMode ? "bg-slate-800/60" : "bg-slate-50"
                }`}
              >

                <p
                  className={`text-sm ${
                    darkMode ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  Age
                </p>

                <p
                  className={`font-semibold mt-1 ${
                    darkMode ? "text-white" : "text-slate-800"
                  }`}
                >
                  {selectedStudent.age}
                </p>

              </div>

              {/* COURSE */}
              <div
                className={`rounded-xl p-5 ${
                  darkMode ? "bg-slate-800/60" : "bg-slate-50"
                }`}
              >

                <p
                  className={`text-sm ${
                    darkMode ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  Course
                </p>

                <p
                  className={`font-semibold mt-1 ${
                    darkMode ? "text-white" : "text-slate-800"
                  }`}
                >
                  {selectedStudent.course?.name || "No course"}
                </p>

                {selectedStudent.course?.code && (
                  <p
                    className={`text-sm ${
                      darkMode ? "text-slate-400" : "text-slate-500"
                    }`}
                  >
                    {selectedStudent.course.code}
                  </p>
                )}

              </div>

            </div>

            {/* PROFILE ACTIONS */}
            <div className="flex gap-2 mt-8">

              <button
                type="button"
                onClick={() => startEdit(selectedStudent)}
                className={`px-3 py-2 rounded-lg font-medium transition ${
                  darkMode
                    ? "bg-blue-900/40 text-blue-400 hover:bg-blue-900/60"
                    : "bg-blue-50 text-blue-600 hover:bg-blue-100"
                }`}
              >
                Edit
              </button>

              <button
                type="button"
                onClick={() =>
                  deleteStudent(selectedStudent._id)
                }
                className={`px-3 py-2 rounded-lg font-medium transition ${
                  darkMode
                    ? "bg-red-900/40 text-red-400 hover:bg-red-900/60"
                    : "bg-red-50 text-red-600 hover:bg-red-100"
                }`}
              >
                Delete
              </button>

            </div>

          </div>
        )}

        {/* ================= HEADER ================= */}
        {!selectedStudent && (
          <div className="flex items-center justify-between mb-8">

            <div>

              <h1
                className={`text-3xl font-bold ${
                  darkMode ? "text-white" : "text-slate-800"
                }`}
              >
                Students
              </h1>

              <p
                className={`mt-1 ${
                  darkMode ? "text-slate-400" : "text-slate-500"
                }`}
              >
                Manage all students
              </p>

            </div>

            <button
              type="button"
              onClick={() => setPage("addStudent")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-medium shadow-sm"
            >
              + Add Student
            </button>

          </div>
        )}

        {/* ================= EDIT FORM ================= */}
        {editingStudent && !selectedStudent && (
          <div
            className={`rounded-2xl border shadow-sm p-8 mb-8 transition-colors duration-300 ${
              darkMode
                ? "bg-slate-900 border-slate-700"
                : "bg-white border-slate-200"
            }`}
          >

            <h2
              className={`text-xl font-bold mb-6 ${
                darkMode ? "text-white" : "text-slate-800"
              }`}
            >
              Edit Student
            </h2>

            <form onSubmit={updateStudent}>

              {/* NAME */}
              <div className="mb-5">

                <label
                  className={`block text-sm font-semibold mb-2 ${
                    darkMode ? "text-slate-300" : "text-slate-700"
                  }`}
                >
                  Student Name
                </label>

                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className={`w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 ${
                    darkMode
                      ? "bg-slate-800 border-slate-700 text-white"
                      : "bg-white border-slate-300 text-slate-800"
                  }`}
                  required
                />

              </div>

              {/* EMAIL */}
              <div className="mb-5">

                <label
                  className={`block text-sm font-semibold mb-2 ${
                    darkMode ? "text-slate-300" : "text-slate-700"
                  }`}
                >
                  Email
                </label>

                <input
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className={`w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 ${
                    darkMode
                      ? "bg-slate-800 border-slate-700 text-white"
                      : "bg-white border-slate-300 text-slate-800"
                  }`}
                  required
                />

              </div>

              {/* AGE */}
              <div className="mb-5">

                <label
                  className={`block text-sm font-semibold mb-2 ${
                    darkMode ? "text-slate-300" : "text-slate-700"
                  }`}
                >
                  Age
                </label>

                <input
                  type="number"
                  value={editAge}
                  onChange={(e) => setEditAge(e.target.value)}
                  className={`w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 ${
                    darkMode
                      ? "bg-slate-800 border-slate-700 text-white"
                      : "bg-white border-slate-300 text-slate-800"
                  }`}
                  required
                />

              </div>

              {/* COURSE */}
              <div className="mb-6">

                <label
                  className={`block text-sm font-semibold mb-2 ${
                    darkMode ? "text-slate-300" : "text-slate-700"
                  }`}
                >
                  Course
                </label>

                <select
                  value={editCourse}
                  onChange={(e) => setEditCourse(e.target.value)}
                  className={`w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 ${
                    darkMode
                      ? "bg-slate-800 border-slate-700 text-white"
                      : "bg-white border-slate-300 text-slate-800"
                  }`}
                  required
                >

                  <option value="">
                    Select a course
                  </option>

                  {courses.map((course) => (
                    <option
                      key={course._id}
                      value={course._id}
                    >
                      {course.name} ({course.code})
                    </option>
                  ))}

                </select>

              </div>

              {/* BUTTONS */}
              <div className="flex gap-3">

                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium"
                >
                  Update Student
                </button>

                <button
                  type="button"
                  onClick={() => setEditingStudent(null)}
                  className={`px-6 py-3 rounded-xl font-medium ${
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
        )}

        {/* ================= STUDENTS CARD ================= */}
        {!selectedStudent && !editingStudent && (
          <div
            className={`rounded-2xl border shadow-sm overflow-hidden transition-colors duration-300 ${
              darkMode
                ? "bg-slate-900 border-slate-700"
                : "bg-white border-slate-200"
            }`}
          >

            {/* CARD HEADER */}
            <div
              className={`p-6 border-b ${
                darkMode ? "border-slate-700" : "border-slate-200"
              }`}
            >

              <h2
                className={`text-xl font-bold ${
                  darkMode ? "text-white" : "text-slate-800"
                }`}
              >
                All Students
              </h2>

              <p
                className={`text-sm mt-1 ${
                  darkMode ? "text-slate-400" : "text-slate-500"
                }`}
              >
                {students.length} students registered
              </p>

              {/* SEARCH */}
              <div className="mt-5">

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="🔎 Search by name, email or course..."
                  className={`w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 ${
                    darkMode
                      ? "bg-slate-800 border-slate-700 text-white placeholder-slate-500"
                      : "bg-white border-slate-300 text-slate-800 placeholder-slate-400"
                  }`}
                />

              </div>

            </div>

            {/* LOADING */}
            {loading ? (

              <div
                className={`p-10 text-center ${
                  darkMode ? "text-slate-400" : "text-slate-500"
                }`}
              >
                Loading students...
              </div>

            ) : filteredStudents.length === 0 ? (

              <div className="p-12 text-center">

                <div
                  className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-4 ${
                    darkMode ? "bg-slate-800" : "bg-slate-100"
                  }`}
                >
                  👨‍🎓
                </div>

                <h3
                  className={`font-semibold ${
                    darkMode ? "text-slate-200" : "text-slate-700"
                  }`}
                >
                  {search
                    ? "No Students Found"
                    : "No Students Yet"}
                </h3>

                <p
                  className={`text-sm mt-1 ${
                    darkMode ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  {search
                    ? "Try searching with another name, email or course."
                    : "Add your first student to get started."}
                </p>

                {!search && (
                  <button
                    type="button"
                    onClick={() => setPage("addStudent")}
                    className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium"
                  >
                    + Add Student
                  </button>
                )}

              </div>

            ) : (

              /* TABLE */
              <div className="overflow-x-auto">

                <table className="w-full">

                  <thead
                    className={
                      darkMode ? "bg-slate-800/60" : "bg-slate-50"
                    }
                  >

                    <tr>

                      <th
                        className={`text-left px-6 py-4 text-sm font-semibold ${
                          darkMode ? "text-slate-400" : "text-slate-600"
                        }`}
                      >
                        #
                      </th>

                      <th
                        className={`text-left px-6 py-4 text-sm font-semibold ${
                          darkMode ? "text-slate-400" : "text-slate-600"
                        }`}
                      >
                        Name
                      </th>

                      <th
                        className={`text-left px-6 py-4 text-sm font-semibold ${
                          darkMode ? "text-slate-400" : "text-slate-600"
                        }`}
                      >
                        Email
                      </th>

                      <th
                        className={`text-left px-6 py-4 text-sm font-semibold ${
                          darkMode ? "text-slate-400" : "text-slate-600"
                        }`}
                      >
                        Age
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
                        Actions
                      </th>

                    </tr>

                  </thead>

                  <tbody
                    className={`divide-y ${
                      darkMode ? "divide-slate-800" : "divide-slate-100"
                    }`}
                  >

                    {filteredStudents.map((student, index) => (

                      <tr
                        key={student._id}
                        className={`transition ${
                          darkMode
                            ? "hover:bg-slate-800/40"
                            : "hover:bg-slate-50"
                        }`}
                      >

                        {/* NUMBER */}
                        <td
                          className={`px-6 py-4 ${
                            darkMode ? "text-slate-400" : "text-slate-500"
                          }`}
                        >
                          {index + 1}
                        </td>

                        {/* NAME / PROFILE */}
                        <td className="px-6 py-4">

                          <button
                            type="button"
                            onClick={() =>
                              setSelectedStudent(student)
                            }
                            className="flex items-center gap-3 text-left"
                          >

                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                                darkMode
                                  ? "bg-blue-900/40 text-blue-400"
                                  : "bg-blue-100 text-blue-600"
                              }`}
                            >
                              {student.name.charAt(0)}
                            </div>

                            <span
                              className={`font-semibold ${
                                darkMode
                                  ? "text-blue-400 hover:text-blue-300"
                                  : "text-blue-600 hover:text-blue-800"
                              }`}
                            >
                              {student.name}
                            </span>

                          </button>

                        </td>

                        {/* EMAIL */}
                        <td
                          className={`px-6 py-4 ${
                            darkMode ? "text-slate-300" : "text-slate-600"
                          }`}
                        >
                          {student.email}
                        </td>

                        {/* AGE */}
                        <td
                          className={`px-6 py-4 ${
                            darkMode ? "text-slate-300" : "text-slate-600"
                          }`}
                        >
                          {student.age}
                        </td>

                        {/* COURSE */}
                        <td className="px-6 py-4">

                          {student.course ? (

                            <div>

                              <p
                                className={`font-semibold ${
                                  darkMode ? "text-slate-200" : "text-slate-700"
                                }`}
                              >
                                {student.course.name}
                              </p>

                              <p
                                className={`text-sm ${
                                  darkMode ? "text-slate-400" : "text-slate-500"
                                }`}
                              >
                                {student.course.code}
                              </p>

                            </div>

                          ) : (

                            <span
                              className={
                                darkMode ? "text-slate-500" : "text-slate-400"
                              }
                            >
                              No course
                            </span>

                          )}

                        </td>

                        {/* ACTIONS */}
                        <td className="px-6 py-4">

                          <div className="flex gap-2">

                            <button
                              type="button"
                              onClick={() =>
                                startEdit(student)
                              }
                              className={`px-3 py-2 rounded-lg font-medium transition ${
                                darkMode
                                  ? "bg-blue-900/40 text-blue-400 hover:bg-blue-900/60"
                                  : "bg-blue-50 text-blue-600 hover:bg-blue-100"
                              }`}
                            >
                              Edit
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                deleteStudent(student._id)
                              }
                              className={`px-3 py-2 rounded-lg font-medium transition ${
                                darkMode
                                  ? "bg-red-900/40 text-red-400 hover:bg-red-900/60"
                                  : "bg-red-50 text-red-600 hover:bg-red-100"
                              }`}
                            >
                              Delete
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

    </div>
  );
}

export default Students;