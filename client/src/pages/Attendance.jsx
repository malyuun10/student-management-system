import { useEffect, useState } from "react";

function Attendance({ setPage, darkMode }) {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Present");

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchStudents();
    fetchAttendance();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await fetch("http://localhost:5000/students");
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const fetchAttendance = async () => {
    try {
      const response = await fetch("http://localhost:5000/attendance");
      const data = await response.json();
      setAttendance(data);
    } catch (error) {
      console.error("Error fetching attendance:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = editingId
        ? `http://localhost:5000/attendance/${editingId}`
        : "http://localhost:5000/attendance";

      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          student: selectedStudent,
          date: date,
          status: status,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      if (editingId) {
        setAttendance(
          attendance.map((item) =>
            item._id === editingId ? data : item
          )
        );
        alert("Attendance updated successfully!");
      } else {
        setAttendance([...attendance, data]);
        alert("Attendance saved successfully!");
      }

      setSelectedStudent("");
      setDate("");
      setStatus("Present");
      setEditingId(null);
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setSelectedStudent(item.student?._id || "");
    setDate(item.date.split("T")[0]);
    setStatus(item.status);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this attendance?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:5000/attendance/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      setAttendance(
        attendance.filter((item) => item._id !== id)
      );

      alert("Attendance deleted successfully!");
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setSelectedStudent("");
    setDate("");
    setStatus("Present");
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-800"
      }`}
    >

      {/* HEADER */}
      <div
        className={`border-b px-8 py-5 flex items-center justify-between transition-colors duration-300 ${
          darkMode
            ? "bg-slate-900 border-slate-800"
            : "bg-white border-slate-200"
        }`}
      >

        <div>
          <h1
            className={`text-3xl font-bold ${
              darkMode ? "text-white" : "text-slate-800"
            }`}
          >
            Attendance
          </h1>

          <p
            className={`mt-1 ${
              darkMode ? "text-slate-400" : "text-slate-500"
            }`}
          >
            Manage student attendance
          </p>
        </div>

        <button
          type="button"
          onClick={() => setPage("dashboard")}
          className={`px-5 py-2.5 rounded-xl font-medium transition ${
            darkMode
              ? "bg-slate-800 hover:bg-slate-700 text-slate-200"
              : "bg-slate-800 hover:bg-slate-700 text-white"
          }`}
        >
          ← Dashboard
        </button>

      </div>

      {/* CONTENT */}
      <main className="p-8 max-w-7xl mx-auto">

        {/* FORM CARD */}
        <div
          className={`rounded-2xl shadow-sm border p-6 mb-8 transition-colors duration-300 ${
            darkMode
              ? "bg-slate-900 border-slate-800"
              : "bg-white border-slate-200"
          }`}
        >

          <div className="mb-6">
            <h2
              className={`text-xl font-bold ${
                darkMode ? "text-white" : "text-slate-800"
              }`}
            >
              {editingId ? "Edit Attendance" : "Mark Attendance"}
            </h2>

            <p
              className={`text-sm mt-1 ${
                darkMode ? "text-slate-400" : "text-slate-500"
              }`}
            >
              {editingId
                ? "Update the attendance information"
                : "Record attendance for a student"}
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-4 gap-5"
          >

            {/* STUDENT */}
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  darkMode ? "text-slate-300" : "text-slate-700"
                }`}
              >
                Student
              </label>

              <select
                value={selectedStudent}
                onChange={(e) => setSelectedStudent(e.target.value)}
                required
                className={`w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 ${
                  darkMode
                    ? "bg-slate-800 border-slate-700 text-white"
                    : "bg-white border-slate-300 text-slate-800"
                }`}
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

            {/* DATE */}
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  darkMode ? "text-slate-300" : "text-slate-700"
                }`}
              >
                Date
              </label>

              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className={`w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 ${
                  darkMode
                    ? "bg-slate-800 border-slate-700 text-white [color-scheme:dark]"
                    : "bg-white border-slate-300 text-slate-800"
                }`}
              />
            </div>

            {/* STATUS */}
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  darkMode ? "text-slate-300" : "text-slate-700"
                }`}
              >
                Status
              </label>

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className={`w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 ${
                  darkMode
                    ? "bg-slate-800 border-slate-700 text-white"
                    : "bg-white border-slate-300 text-slate-800"
                }`}
              >
                <option value="Present">
                  Present
                </option>

                <option value="Absent">
                  Absent
                </option>
              </select>
            </div>

            {/* BUTTONS */}
            <div className="flex items-end gap-3">

              <button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-medium shadow-sm transition"
              >
                {editingId ? "Update" : "Save"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={cancelEdit}
                  className={`px-5 py-3 rounded-xl font-medium transition ${
                    darkMode
                      ? "bg-slate-800 hover:bg-slate-700 text-slate-300"
                      : "bg-slate-200 hover:bg-slate-300 text-slate-700"
                  }`}
                >
                  Cancel
                </button>
              )}

            </div>

          </form>
        </div>

        {/* ATTENDANCE RECORDS */}
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

            <h2
              className={`text-xl font-bold ${
                darkMode ? "text-white" : "text-slate-800"
              }`}
            >
              Attendance Records
            </h2>

            <p
              className={`text-sm mt-1 ${
                darkMode ? "text-slate-400" : "text-slate-500"
              }`}
            >
              List of recorded student attendance
            </p>

          </div>

          {attendance.length === 0 ? (

            <div className="p-12 text-center">

              <div className="text-5xl mb-4">
                📝
              </div>

              <h3
                className={`text-lg font-semibold ${
                  darkMode ? "text-slate-200" : "text-slate-700"
                }`}
              >
                No Attendance Records
              </h3>

              <p
                className={`text-sm mt-1 ${
                  darkMode ? "text-slate-400" : "text-slate-500"
                }`}
              >
                Start by marking attendance for a student.
              </p>

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
                      Student
                    </th>

                    <th
                      className={`text-left px-6 py-4 text-sm font-semibold ${
                        darkMode ? "text-slate-400" : "text-slate-600"
                      }`}
                    >
                      Date
                    </th>

                    <th
                      className={`text-left px-6 py-4 text-sm font-semibold ${
                        darkMode ? "text-slate-400" : "text-slate-600"
                      }`}
                    >
                      Status
                    </th>

                    <th
                      className={`text-right px-6 py-4 text-sm font-semibold ${
                        darkMode ? "text-slate-400" : "text-slate-600"
                      }`}
                    >
                      Actions
                    </th>

                  </tr>

                </thead>

                <tbody
                  className={`divide-y ${
                    darkMode ? "divide-slate-800" : "divide-slate-200"
                  }`}
                >

                  {attendance.map((item) => (

                    <tr
                      key={item._id}
                      className={`transition ${
                        darkMode
                          ? "hover:bg-slate-800/40"
                          : "hover:bg-slate-50"
                      }`}
                    >

                      <td className="px-6 py-4">

                        <div className="flex items-center gap-3">

                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              darkMode
                                ? "bg-blue-900/40 text-blue-400"
                                : "bg-blue-100 text-blue-600"
                            }`}
                          >
                            👨‍🎓
                          </div>

                          <span
                            className={`font-medium ${
                              darkMode ? "text-slate-200" : "text-slate-800"
                            }`}
                          >
                            {item.student?.name || "Unknown Student"}
                          </span>

                        </div>

                      </td>

                      <td
                        className={`px-6 py-4 ${
                          darkMode ? "text-slate-300" : "text-slate-600"
                        }`}
                      >
                        {new Date(item.date).toLocaleDateString()}
                      </td>

                      <td className="px-6 py-4">

                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                            item.status === "Present"
                              ? darkMode
                                ? "bg-emerald-900/40 text-emerald-400"
                                : "bg-green-100 text-green-700"
                              : darkMode
                              ? "bg-rose-900/40 text-rose-400"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {item.status}
                        </span>

                      </td>

                      <td className="px-6 py-4">

                        <div className="flex justify-end gap-2">

                          <button
                            type="button"
                            onClick={() => handleEdit(item)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                              darkMode
                                ? "bg-blue-900/40 text-blue-400 hover:bg-blue-900/60"
                                : "bg-blue-100 hover:bg-blue-200 text-blue-700"
                            }`}
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDelete(item._id)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                              darkMode
                                ? "bg-red-900/40 text-red-400 hover:bg-red-900/60"
                                : "bg-red-100 hover:bg-red-200 text-red-700"
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

      </main>

    </div>
  );
}

export default Attendance;