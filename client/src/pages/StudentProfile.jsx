import { useEffect, useState } from "react";

function StudentProfile({ setPage, studentId }) {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/students/${studentId}`)
      .then((res) => res.json())
      .then((data) => {
        setStudent(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching student:", error);
        setLoading(false);
      });
  }, [studentId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 p-8">
        <p className="text-slate-500">Loading profile...</p>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="min-h-screen bg-slate-100 p-8">
        <p className="text-red-500">Student not found.</p>

        <button
          onClick={() => setPage("students")}
          className="mt-4 bg-blue-600 text-white px-5 py-3 rounded-xl"
        >
          Back to Students
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Student Profile
          </h1>

          <p className="text-slate-500 mt-1">
            Student information
          </p>
        </div>

        <button
          onClick={() => setPage("students")}
          className="bg-slate-700 hover:bg-slate-800 text-white px-5 py-3 rounded-xl"
        >
          ← Back to Students
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">

        <div className="flex items-center gap-5 mb-8">

          <div className="w-20 h-20 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-3xl font-bold">
            {student.name?.charAt(0)}
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              {student.name}
            </h2>

            <p className="text-slate-500">
              Student Profile
            </p>
          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="bg-slate-50 rounded-xl p-5">
            <p className="text-sm text-slate-500">
              Full Name
            </p>

            <p className="text-lg font-semibold text-slate-800 mt-1">
              {student.name}
            </p>
          </div>

          <div className="bg-slate-50 rounded-xl p-5">
            <p className="text-sm text-slate-500">
              Email
            </p>

            <p className="text-lg font-semibold text-slate-800 mt-1">
              {student.email}
            </p>
          </div>

          <div className="bg-slate-50 rounded-xl p-5">
            <p className="text-sm text-slate-500">
              Age
            </p>

            <p className="text-lg font-semibold text-slate-800 mt-1">
              {student.age}
            </p>
          </div>

          <div className="bg-slate-50 rounded-xl p-5">
            <p className="text-sm text-slate-500">
              Course
            </p>

            <p className="text-lg font-semibold text-slate-800 mt-1">
              {student.course?.name || "No course"}
            </p>

            {student.course?.code && (
              <p className="text-sm text-slate-500 mt-1">
                {student.course.code}
              </p>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}

export default StudentProfile;