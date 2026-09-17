import { useEffect, useState } from "react";

function Dashboard({ setPage, darkMode }) {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
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
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const presentCount = attendance.filter(
    (item) => item.status?.toLowerCase() === "present"
  ).length;

  const averageMarks =
    results.length > 0
      ? (
          results.reduce(
            (total, result) => total + Number(result.marks || 0),
            0
          ) / results.length
        ).toFixed(1)
      : 0;

  // Midabada Dynamic-ka ah
  const bgMain = darkMode ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-800";
  const bgCard = darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200";
  const bgButton = darkMode ? "bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700" : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200";
  const textSub = darkMode ? "text-slate-400" : "text-slate-500";
  const textTitle = darkMode ? "text-white" : "text-slate-800";

  return (
    <main className={`flex-1 p-8 transition-colors duration-300 min-h-screen ${bgMain}`}>
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className={`text-3xl font-bold ${textTitle}`}>
            Dashboard
          </h1>
          <p className={`mt-1 ${textSub}`}>
            Welcome to the Student Management System
          </p>
        </div>

        <button
          type="button"
          onClick={() => setPage("addStudent")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-medium shadow-sm transition"
        >
          ➕ Add Student
        </button>
      </div>

      {loading ? (
        <div className={`rounded-2xl p-12 text-center border ${bgCard} ${textSub}`}>
          Loading dashboard data...
        </div>
      ) : (
        <>
          {/* STATS CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* TOTAL STUDENTS */}
            <div
              onClick={() => setPage("students")}
              className={`rounded-2xl border shadow-sm p-6 cursor-pointer hover:scale-[1.02] transition-all duration-300 ${bgCard}`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm ${textSub}`}>Total Students</p>
                  <p className={`text-3xl font-bold mt-2 ${textTitle}`}>{students.length}</p>
                </div>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${darkMode ? "bg-blue-900/40" : "bg-blue-100"}`}>
                  👨‍🎓
                </div>
              </div>
            </div>

            {/* TOTAL COURSES */}
            <div
              onClick={() => setPage("courses")}
              className={`rounded-2xl border shadow-sm p-6 cursor-pointer hover:scale-[1.02] transition-all duration-300 ${bgCard}`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm ${textSub}`}>Total Courses</p>
                  <p className={`text-3xl font-bold mt-2 ${textTitle}`}>{courses.length}</p>
                </div>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${darkMode ? "bg-purple-900/40" : "bg-purple-100"}`}>
                  📚
                </div>
              </div>
            </div>

            {/* PRESENT TODAY */}
            <div
              onClick={() => setPage("attendance")}
              className={`rounded-2xl border shadow-sm p-6 cursor-pointer hover:scale-[1.02] transition-all duration-300 ${bgCard}`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm ${textSub}`}>Present</p>
                  <p className={`text-3xl font-bold mt-2 ${textTitle}`}>{presentCount}</p>
                </div>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${darkMode ? "bg-emerald-900/40" : "bg-green-100"}`}>
                  ✅
                </div>
              </div>
            </div>

            {/* AVG MARKS */}
            <div
              onClick={() => setPage("results")}
              className={`rounded-2xl border shadow-sm p-6 cursor-pointer hover:scale-[1.02] transition-all duration-300 ${bgCard}`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm ${textSub}`}>Avg Marks</p>
                  <p className={`text-3xl font-bold mt-2 ${textTitle}`}>{averageMarks}</p>
                </div>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${darkMode ? "bg-amber-900/40" : "bg-yellow-100"}`}>
                  🎓
                </div>
              </div>
            </div>
          </div>

          {/* QUICK ACTIONS & SUMMARY */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* QUICK ACTIONS */}
            <div className={`rounded-2xl border shadow-sm p-6 ${bgCard}`}>
              <h2 className={`text-xl font-bold mb-4 ${textTitle}`}>Quick Actions</h2>

              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setPage("addStudent")}
                  className={`p-4 rounded-xl border font-medium text-left transition ${bgButton}`}
                >
                  ➕ Add New Student
                </button>

                <button
                  type="button"
                  onClick={() => setPage("addCourse")}
                  className={`p-4 rounded-xl border font-medium text-left transition ${bgButton}`}
                >
                  📚 Add New Course
                </button>

                <button
                  type="button"
                  onClick={() => setPage("attendance")}
                  className={`p-4 rounded-xl border font-medium text-left transition ${bgButton}`}
                >
                  📝 Take Attendance
                </button>

                <button
                  type="button"
                  onClick={() => setPage("addResult")}
                  className={`p-4 rounded-xl border font-medium text-left transition ${bgButton}`}
                >
                  🏆 Add Grade Result
                </button>
              </div>
            </div>

            {/* RECENT STUDENTS LIST */}
            <div className={`rounded-2xl border shadow-sm p-6 ${bgCard}`}>
              <div className="flex items-center justify-between mb-4">
                <h2 className={`text-xl font-bold ${textTitle}`}>Recent Students</h2>
                <button
                  type="button"
                  onClick={() => setPage("students")}
                  className="text-sm font-semibold text-blue-500 hover:text-blue-600"
                >
                  View All
                </button>
              </div>

              {students.length === 0 ? (
                <p className={`text-sm ${textSub}`}>No students added yet.</p>
              ) : (
                <div className="space-y-3">
                  {students.slice(0, 4).map((student) => (
                    <div
                      key={student._id}
                      className={`flex items-center justify-between p-3 rounded-xl border ${
                        darkMode ? "bg-slate-800/40 border-slate-800" : "bg-slate-50 border-slate-100"
                      }`}
                    >
                      <div>
                        <p className={`font-semibold text-sm ${textTitle}`}>{student.name}</p>
                        <p className={`text-xs ${textSub}`}>{student.email || student.phone || "Student"}</p>
                      </div>
                      <span
                        className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                          darkMode ? "bg-blue-900/40 text-blue-400" : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        Active
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </main>
  );
}

export default Dashboard;