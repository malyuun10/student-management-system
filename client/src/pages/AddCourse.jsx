import { useState } from "react";

function AddCourse({ setPage, darkMode }) {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [instructor, setInstructor] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !code || !instructor) {
      setMessage("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const response = await fetch("http://localhost:5000/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          code,
          instructor,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add course");
      }

      setMessage("Course added successfully! ✅");

      setName("");
      setCode("");
      setInstructor("");

      setTimeout(() => {
        setPage("courses");
      }, 1000);
    } catch (error) {
      console.error("Error adding course:", error);
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

        <button
          type="button"
          onClick={() => setPage("courses")}
          className={`mb-5 font-medium transition ${
            darkMode
              ? "text-blue-400 hover:text-blue-300"
              : "text-blue-600 hover:text-blue-700"
          }`}
        >
          ← Back to Courses
        </button>

        <div className="mb-8">
          <h1
            className={`text-3xl font-bold ${
              darkMode ? "text-white" : "text-slate-800"
            }`}
          >
            Add Course
          </h1>

          <p
            className={`mt-1 ${
              darkMode ? "text-slate-400" : "text-slate-500"
            }`}
          >
            Add a new course to the system
          </p>
        </div>

        <div
          className={`rounded-2xl shadow-sm border p-8 transition-colors duration-300 ${
            darkMode
              ? "bg-slate-900 border-slate-700"
              : "bg-white border-slate-200"
          }`}
        >

          <form onSubmit={handleSubmit}>

            {/* COURSE NAME */}
            <div className="mb-6">
              <label
                className={`block text-sm font-semibold mb-2 ${
                  darkMode ? "text-slate-300" : "text-slate-700"
                }`}
              >
                Course Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter course name"
                className={`w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 ${
                  darkMode
                    ? "bg-slate-800 border-slate-700 text-white placeholder-slate-500"
                    : "bg-white border-slate-300 text-slate-800 placeholder-slate-400"
                }`}
              />
            </div>

            {/* COURSE CODE */}
            <div className="mb-6">
              <label
                className={`block text-sm font-semibold mb-2 ${
                  darkMode ? "text-slate-300" : "text-slate-700"
                }`}
              >
                Course Code
              </label>

              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Example: CS101"
                className={`w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 ${
                  darkMode
                    ? "bg-slate-800 border-slate-700 text-white placeholder-slate-500"
                    : "bg-white border-slate-300 text-slate-800 placeholder-slate-400"
                }`}
              />
            </div>

            {/* INSTRUCTOR */}
            <div className="mb-8">
              <label
                className={`block text-sm font-semibold mb-2 ${
                  darkMode ? "text-slate-300" : "text-slate-700"
                }`}
              >
                Instructor
              </label>

              <input
                type="text"
                value={instructor}
                onChange={(e) => setInstructor(e.target.value)}
                placeholder="Enter instructor name"
                className={`w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 ${
                  darkMode
                    ? "bg-slate-800 border-slate-700 text-white placeholder-slate-500"
                    : "bg-white border-slate-300 text-slate-800 placeholder-slate-400"
                }`}
              />
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
                {loading ? "Adding..." : "Add Course"}
              </button>

              <button
                type="button"
                onClick={() => setPage("courses")}
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

export default AddCourse;