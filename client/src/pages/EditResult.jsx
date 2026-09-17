import { useEffect, useState } from "react";

function EditResult({ result, setEditingResult, setResults }) {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);

  const [student, setStudent] = useState(result.student?._id || "");
  const [course, setCourse] = useState(result.course?._id || "");
  const [marks, setMarks] = useState(result.marks);
  const [grade, setGrade] = useState(result.grade);

  const [loading, setLoading] = useState(false);

  // GET STUDENTS
  useEffect(() => {
    fetch("http://localhost:5000/students")
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((error) => console.error(error));
  }, []);

  // GET COURSES
  useEffect(() => {
    fetch("http://localhost:5000/courses")
      .then((res) => res.json())
      .then((data) => setCourses(data))
      .catch((error) => console.error(error));
  }, []);

  // AUTO GRADE
  const handleMarksChange = (e) => {
    const value = e.target.value;

    setMarks(value);

    const mark = Number(value);

    if (mark >= 90) {
      setGrade("A");
    } else if (mark >= 80) {
      setGrade("B");
    } else if (mark >= 70) {
      setGrade("C");
    } else if (mark >= 60) {
      setGrade("D");
    } else {
      setGrade("F");
    }
  };

  // UPDATE RESULT
  const handleUpdate = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch(
        `http://localhost:5000/grades/${result._id}`,
        {
          method: "PUT",
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

      if (!response.ok) {
        throw new Error("Failed to update result");
      }

      const updatedResult = await response.json();

      setResults((prevResults) =>
        prevResults.map((item) =>
          item._id === updatedResult._id
            ? updatedResult
            : item
        )
      );

      setEditingResult(null);

    } catch (error) {
      console.error("Error updating result:", error);
      alert("Failed to update result");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex">

      {/* SIDEBAR */}
      <aside className="w-64 min-h-screen bg-slate-900 text-white p-6">

        <h1 className="text-2xl font-bold mb-10">
          Student MS
        </h1>

        <nav className="space-y-3">

          <button
            type="button"
            onClick={() => setEditingResult(null)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800"
          >
            🎓
            <span>Back to Results</span>
          </button>

        </nav>

      </aside>


      {/* MAIN */}
      <main className="flex-1 p-8">

        <div className="max-w-2xl mx-auto">

          <div className="mb-8">

            <h2 className="text-3xl font-bold text-slate-800">
              Edit Result
            </h2>

            <p className="text-slate-500 mt-1">
              Update student academic result
            </p>

          </div>


          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">

            <form onSubmit={handleUpdate}>

              {/* STUDENT */}
              <div className="mb-6">

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Student
                </label>

                <select
                  value={student}
                  onChange={(e) => setStudent(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >

                  <option value="">
                    Select Student
                  </option>

                  {students.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  ))}

                </select>

              </div>


              {/* COURSE */}
              <div className="mb-6">

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Course
                </label>

                <select
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >

                  <option value="">
                    Select Course
                  </option>

                  {courses.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  ))}

                </select>

              </div>


              {/* MARKS */}
              <div className="mb-6">

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Marks
                </label>

                <input
                  type="number"
                  min="0"
                  max="100"
                  value={marks}
                  onChange={handleMarksChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>


              {/* GRADE */}
              <div className="mb-8">

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Grade
                </label>

                <input
                  type="text"
                  value={grade}
                  readOnly
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 font-bold text-blue-600"
                />

              </div>


              {/* BUTTONS */}
              <div className="flex gap-3">

                <button
                  type="button"
                  onClick={() => setEditingResult(null)}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 px-5 py-3 rounded-xl font-medium"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-medium"
                >
                  {loading ? "Updating..." : "💾 Update Result"}
                </button>

              </div>

            </form>

          </div>

        </div>

      </main>

    </div>
  );
}

export default EditResult;