import { useEffect, useState } from "react";

function Reports({ setPage, darkMode }) {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [results, setResults] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          studentsRes,
          coursesRes,
          attendanceRes,
          resultsRes,
        ] = await Promise.all([
          fetch("http://localhost:5000/students"),
          fetch("http://localhost:5000/courses"),
          fetch("http://localhost:5000/attendance"),
          fetch("http://localhost:5000/grades"),
        ]);

        const studentsData = await studentsRes.json();
        const coursesData = await coursesRes.json();
        const attendanceData = await attendanceRes.json();
        const resultsData = await resultsRes.json();

        setStudents(studentsData);
        setCourses(coursesData);
        setAttendance(attendanceData);
        setResults(resultsData);
      } catch (error) {
        console.error("Error fetching reports:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Attendance statistics
  const presentCount = attendance.filter(
    (item) =>
      item.status?.toLowerCase() === "present"
  ).length;

  const absentCount = attendance.filter(
    (item) =>
      item.status?.toLowerCase() === "absent"
  ).length;

  // Average marks
  const averageMarks =
    results.length > 0
      ? (
          results.reduce(
            (total, result) =>
              total + Number(result.marks || 0),
            0
          ) / results.length
        ).toFixed(1)
      : 0;

  return (
    <main
      className={`flex-1 p-8 transition-colors duration-300 min-h-screen ${
        darkMode ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-800"
      }`}
    >

      {/* HEADER */}
      <div className="mb-8">

        <h1
          className={`text-3xl font-bold ${
            darkMode ? "text-white" : "text-slate-800"
          }`}
        >
          Reports
        </h1>

        <p
          className={`mt-1 ${
            darkMode ? "text-slate-400" : "text-slate-500"
          }`}
        >
          Student management system reports and statistics
        </p>

      </div>

      {loading ? (

        <div
          className={`rounded-2xl p-12 text-center transition-colors duration-300 ${
            darkMode
              ? "bg-slate-900 text-slate-400 border border-slate-800"
              : "bg-white text-slate-500 border border-slate-200"
          }`}
        >
          Loading reports...
        </div>

      ) : (

        <>
          {/* SUMMARY CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

            {/* STUDENTS */}
            <div
              className={`rounded-2xl border shadow-sm p-6 transition-colors duration-300 ${
                darkMode
                  ? "bg-slate-900 border-slate-800"
                  : "bg-white border-slate-200"
              }`}
            >

              <div className="flex items-center justify-between">

                <div>
                  <p
                    className={`text-sm ${
                      darkMode ? "text-slate-400" : "text-slate-500"
                    }`}
                  >
                    Total Students
                  </p>

                  <p
                    className={`text-3xl font-bold mt-2 ${
                      darkMode ? "text-white" : "text-slate-800"
                    }`}
                  >
                    {students.length}
                  </p>
                </div>

                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
                    darkMode ? "bg-blue-900/40" : "bg-blue-100"
                  }`}
                >
                  👨‍🎓
                </div>

              </div>

            </div>

            {/* COURSES */}
            <div
              className={`rounded-2xl border shadow-sm p-6 transition-colors duration-300 ${
                darkMode
                  ? "bg-slate-900 border-slate-800"
                  : "bg-white border-slate-200"
              }`}
            >

              <div className="flex items-center justify-between">

                <div>
                  <p
                    className={`text-sm ${
                      darkMode ? "text-slate-400" : "text-slate-500"
                    }`}
                  >
                    Total Courses
                  </p>

                  <p
                    className={`text-3xl font-bold mt-2 ${
                      darkMode ? "text-white" : "text-slate-800"
                    }`}
                  >
                    {courses.length}
                  </p>
                </div>

                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
                    darkMode ? "bg-purple-900/40" : "bg-purple-100"
                  }`}
                >
                  📚
                </div>

              </div>

            </div>

            {/* PRESENT */}
            <div
              className={`rounded-2xl border shadow-sm p-6 transition-colors duration-300 ${
                darkMode
                  ? "bg-slate-900 border-slate-800"
                  : "bg-white border-slate-200"
              }`}
            >

              <div className="flex items-center justify-between">

                <div>
                  <p
                    className={`text-sm ${
                      darkMode ? "text-slate-400" : "text-slate-500"
                    }`}
                  >
                    Present
                  </p>

                  <p
                    className={`text-3xl font-bold mt-2 ${
                      darkMode ? "text-white" : "text-slate-800"
                    }`}
                  >
                    {presentCount}
                  </p>
                </div>

                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
                    darkMode ? "bg-emerald-900/40" : "bg-green-100"
                  }`}
                >
                  ✅
                </div>

              </div>

            </div>

            {/* AVERAGE */}
            <div
              className={`rounded-2xl border shadow-sm p-6 transition-colors duration-300 ${
                darkMode
                  ? "bg-slate-900 border-slate-800"
                  : "bg-white border-slate-200"
              }`}
            >

              <div className="flex items-center justify-between">

                <div>
                  <p
                    className={`text-sm ${
                      darkMode ? "text-slate-400" : "text-slate-500"
                    }`}
                  >
                    Average Marks
                  </p>

                  <p
                    className={`text-3xl font-bold mt-2 ${
                      darkMode ? "text-white" : "text-slate-800"
                    }`}
                  >
                    {averageMarks}
                  </p>
                </div>

                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
                    darkMode ? "bg-amber-900/40" : "bg-yellow-100"
                  }`}
                >
                  🎓
                </div>

              </div>

            </div>

          </div>

          {/* ATTENDANCE REPORT */}
          <div
            className={`rounded-2xl border shadow-sm p-6 mb-8 transition-colors duration-300 ${
              darkMode
                ? "bg-slate-900 border-slate-800"
                : "bg-white border-slate-200"
            }`}
          >

            <h2
              className={`text-xl font-bold ${
                darkMode ? "text-white" : "text-slate-800"
              }`}
            >
              Attendance Report
            </h2>

            <p
              className={`text-sm mt-1 mb-6 ${
                darkMode ? "text-slate-400" : "text-slate-500"
              }`}
            >
              Overview of student attendance
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div
                className={`rounded-xl p-6 border transition-colors duration-300 ${
                  darkMode
                    ? "bg-emerald-950/30 border-emerald-900/50"
                    : "bg-green-50 border-green-100"
                }`}
              >
                <p
                  className={`text-sm font-medium ${
                    darkMode ? "text-emerald-400" : "text-green-700"
                  }`}
                >
                  Present
                </p>

                <p
                  className={`text-3xl font-bold mt-2 ${
                    darkMode ? "text-emerald-400" : "text-green-700"
                  }`}
                >
                  {presentCount}
                </p>
              </div>

              <div
                className={`rounded-xl p-6 border transition-colors duration-300 ${
                  darkMode
                    ? "bg-rose-950/30 border-rose-900/50"
                    : "bg-red-50 border-red-100"
                }`}
              >
                <p
                  className={`text-sm font-medium ${
                    darkMode ? "text-rose-400" : "text-red-700"
                  }`}
                >
                  Absent
                </p>

                <p
                  className={`text-3xl font-bold mt-2 ${
                    darkMode ? "text-rose-400" : "text-red-700"
                  }`}
                >
                  {absentCount}
                </p>
              </div>

            </div>

          </div>

          {/* RESULTS REPORT */}
          <div
            className={`rounded-2xl border shadow-sm p-6 transition-colors duration-300 ${
              darkMode
                ? "bg-slate-900 border-slate-800"
                : "bg-white border-slate-200"
            }`}
          >

            <h2
              className={`text-xl font-bold ${
                darkMode ? "text-white" : "text-slate-800"
              }`}
            >
              Results Report
            </h2>

            <p
              className={`text-sm mt-1 mb-6 ${
                darkMode ? "text-slate-400" : "text-slate-500"
              }`}
            >
              Overview of student academic performance
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              <div
                className={`rounded-xl p-6 border transition-colors duration-300 ${
                  darkMode
                    ? "bg-blue-950/30 border-blue-900/50"
                    : "bg-blue-50 border-blue-100"
                }`}
              >
                <p
                  className={`text-sm font-medium ${
                    darkMode ? "text-blue-400" : "text-blue-700"
                  }`}
                >
                  Total Results
                </p>

                <p
                  className={`text-3xl font-bold mt-2 ${
                    darkMode ? "text-blue-400" : "text-blue-700"
                  }`}
                >
                  {results.length}
                </p>
              </div>

              <div
                className={`rounded-xl p-6 border transition-colors duration-300 ${
                  darkMode
                    ? "bg-amber-950/30 border-amber-900/50"
                    : "bg-yellow-50 border-yellow-100"
                }`}
              >
                <p
                  className={`text-sm font-medium ${
                    darkMode ? "text-amber-400" : "text-yellow-700"
                  }`}
                >
                  Average Marks
                </p>

                <p
                  className={`text-3xl font-bold mt-2 ${
                    darkMode ? "text-amber-400" : "text-yellow-700"
                  }`}
                >
                  {averageMarks}
                </p>
              </div>

              <div
                className={`rounded-xl p-6 border transition-colors duration-300 ${
                  darkMode
                    ? "bg-purple-950/30 border-purple-900/50"
                    : "bg-purple-50 border-purple-100"
                }`}
              >
                <p
                  className={`text-sm font-medium ${
                    darkMode ? "text-purple-400" : "text-purple-700"
                  }`}
                >
                  Students
                </p>

                <p
                  className={`text-3xl font-bold mt-2 ${
                    darkMode ? "text-purple-400" : "text-purple-700"
                  }`}
                >
                  {students.length}
                </p>
              </div>

            </div>

          </div>
        </>

      )}

    </main>
  );
}

export default Reports;