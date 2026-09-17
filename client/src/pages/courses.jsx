import { useEffect, useState } from "react";

function Courses({ setPage, darkMode }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [editingCourse, setEditingCourse] = useState(null);
  const [editName, setEditName] = useState("");
  const [editCode, setEditCode] = useState("");
  const [editInstructor, setEditInstructor] = useState("");

  // GET COURSES
  const fetchCourses = () => {
    fetch("http://localhost:5000/courses")
      .then((response) => response.json())
      .then((data) => {
        setCourses(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // SEARCH
  const filteredCourses = courses.filter(
    (course) =>
      course.name.toLowerCase().includes(search.toLowerCase()) ||
      course.code.toLowerCase().includes(search.toLowerCase()) ||
      course.instructor.toLowerCase().includes(search.toLowerCase())
  );

  // DELETE
  const deleteCourse = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this course?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:5000/courses/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete course");
      }

      setCourses(
        courses.filter((course) => course._id !== id)
      );
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete course");
    }
  };

  // START EDIT
  const startEdit = (course) => {
    setEditingCourse(course);
    setEditName(course.name);
    setEditCode(course.code);
    setEditInstructor(course.instructor);
  };

  // UPDATE
  const updateCourse = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:5000/courses/${editingCourse._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: editName,
            code: editCode,
            instructor: editInstructor,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update course"
        );
      }

      setCourses(
        courses.map((course) =>
          course._id === editingCourse._id ? data : course
        )
      );

      setEditingCourse(null);
    } catch (error) {
      console.error("Update error:", error);
      alert(error.message);
    }
  };

  return (
    <div
      className={`min-h-screen p-8 transition-colors duration-300 ${
        darkMode ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-800"
      }`}
    >

      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">

        <div>
          <h1
            className={`text-3xl font-bold ${
              darkMode ? "text-white" : "text-slate-800"
            }`}
          >
            Courses
          </h1>

          <p
            className={`mt-1 ${
              darkMode ? "text-slate-400" : "text-slate-500"
            }`}
          >
            Manage all courses
          </p>
        </div>

        <button
          type="button"
          onClick={() => setPage("addCourse")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-medium shadow-sm transition"
        >
          + Add Course
        </button>

      </div>

      {/* EDIT FORM */}
      {editingCourse && (
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
            Edit Course
          </h2>

          <form onSubmit={updateCourse}>

            {/* NAME */}
            <div className="mb-5">
              <label
                className={`block text-sm font-semibold mb-2 ${
                  darkMode ? "text-slate-300" : "text-slate-700"
                }`}
              >
                Course Name
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

            {/* CODE */}
            <div className="mb-5">
              <label
                className={`block text-sm font-semibold mb-2 ${
                  darkMode ? "text-slate-300" : "text-slate-700"
                }`}
              >
                Course Code
              </label>

              <input
                type="text"
                value={editCode}
                onChange={(e) => setEditCode(e.target.value)}
                className={`w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 ${
                  darkMode
                    ? "bg-slate-800 border-slate-700 text-white"
                    : "bg-white border-slate-300 text-slate-800"
                }`}
                required
              />
            </div>

            {/* INSTRUCTOR */}
            <div className="mb-6">
              <label
                className={`block text-sm font-semibold mb-2 ${
                  darkMode ? "text-slate-300" : "text-slate-700"
                }`}
              >
                Instructor
              </label>

              <input
                type="text"
                value={editInstructor}
                onChange={(e) =>
                  setEditInstructor(e.target.value)
                }
                className={`w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 ${
                  darkMode
                    ? "bg-slate-800 border-slate-700 text-white"
                    : "bg-white border-slate-300 text-slate-800"
                }`}
                required
              />
            </div>

            <div className="flex gap-3">

              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition"
              >
                Update Course
              </button>

              <button
                type="button"
                onClick={() => setEditingCourse(null)}
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
      )}

      {/* COURSES CARD */}
      <div
        className={`rounded-2xl border shadow-sm overflow-hidden transition-colors duration-300 ${
          darkMode
            ? "bg-slate-900 border-slate-700"
            : "bg-white border-slate-200"
        }`}
      >

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
            All Courses
          </h2>

          <p
            className={`text-sm mt-1 ${
              darkMode ? "text-slate-400" : "text-slate-500"
            }`}
          >
            {courses.length} courses registered
          </p>

          {/* SEARCH */}
          <div className="mt-5">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="🔎 Search by name, code or instructor..."
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
            Loading courses...
          </div>

        ) : filteredCourses.length === 0 ? (

          <div className="p-12 text-center">

            <div
              className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-4 ${
                darkMode ? "bg-slate-800" : "bg-slate-100"
              }`}
            >
              📚
            </div>

            <h3
              className={`font-semibold ${
                darkMode ? "text-slate-200" : "text-slate-700"
              }`}
            >
              {search ? "No Courses Found" : "No Courses Yet"}
            </h3>

            <p
              className={`text-sm mt-1 ${
                darkMode ? "text-slate-400" : "text-slate-500"
              }`}
            >
              {search
                ? "Try searching with another keyword."
                : "Add your first course to get started."}
            </p>

            {!search && (
              <button
                type="button"
                onClick={() => setPage("addCourse")}
                className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition"
              >
                + Add Course
              </button>
            )}

          </div>

        ) : (

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
                    Course Name
                  </th>

                  <th
                    className={`text-left px-6 py-4 text-sm font-semibold ${
                      darkMode ? "text-slate-400" : "text-slate-600"
                    }`}
                  >
                    Code
                  </th>

                  <th
                    className={`text-left px-6 py-4 text-sm font-semibold ${
                      darkMode ? "text-slate-400" : "text-slate-600"
                    }`}
                  >
                    Instructor
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

                {filteredCourses.map((course, index) => (

                  <tr
                    key={course._id}
                    className={`transition ${
                      darkMode
                        ? "hover:bg-slate-800/40"
                        : "hover:bg-slate-50"
                    }`}
                  >

                    <td
                      className={`px-6 py-4 ${
                        darkMode ? "text-slate-400" : "text-slate-500"
                      }`}
                    >
                      {index + 1}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">

                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                            darkMode
                              ? "bg-blue-900/40 text-blue-400"
                              : "bg-blue-100 text-blue-600"
                          }`}
                        >
                          📚
                        </div>

                        <span
                          className={`font-semibold ${
                            darkMode ? "text-slate-200" : "text-slate-700"
                          }`}
                        >
                          {course.name}
                        </span>

                      </div>
                    </td>

                    <td
                      className={`px-6 py-4 ${
                        darkMode ? "text-slate-300" : "text-slate-600"
                      }`}
                    >
                      {course.code}
                    </td>

                    <td
                      className={`px-6 py-4 ${
                        darkMode ? "text-slate-300" : "text-slate-600"
                      }`}
                    >
                      {course.instructor}
                    </td>

                    <td className="px-6 py-4">

                      <div className="flex gap-2">

                        <button
                          type="button"
                          onClick={() => startEdit(course)}
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
                          onClick={() => deleteCourse(course._id)}
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

    </div>
  );
}

export default Courses;