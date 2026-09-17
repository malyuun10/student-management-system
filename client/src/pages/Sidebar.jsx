function Sidebar({ setPage, activePage }) {
  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white p-6">

      <h1 className="text-2xl font-bold mb-10">
        Student MS
      </h1>

      <nav className="space-y-3">

        <button
          onClick={() => setPage("dashboard")}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium ${
            activePage === "dashboard"
              ? "bg-blue-600 text-white shadow"
              : "text-slate-300 hover:bg-slate-800"
          }`}
        >
          🏠
          <span>Dashboard</span>
        </button>

        <button
          onClick={() => setPage("students")}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium ${
            activePage === "students"
              ? "bg-blue-600 text-white shadow"
              : "text-slate-300 hover:bg-slate-800"
          }`}
        >
          👨‍🎓
          <span>Students</span>
        </button>

        <button
          onClick={() => setPage("addStudent")}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium ${
            activePage === "addStudent"
              ? "bg-blue-600 text-white shadow"
              : "text-slate-300 hover:bg-slate-800"
          }`}
        >
          ➕
          <span>Add Student</span>
        </button>

        <button
          onClick={() => setPage("courses")}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium ${
            activePage === "courses"
              ? "bg-blue-600 text-white shadow"
              : "text-slate-300 hover:bg-slate-800"
          }`}
        >
          📚
          <span>Courses</span>
        </button>

        <button
          onClick={() => setPage("attendance")}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium ${
            activePage === "attendance"
              ? "bg-blue-600 text-white shadow"
              : "text-slate-300 hover:bg-slate-800"
          }`}
        >
          📝
          <span>Attendance</span>
        </button>

        <button
          onClick={() => setPage("results")}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium ${
            activePage === "results"
              ? "bg-blue-600 text-white shadow"
              : "text-slate-300 hover:bg-slate-800"
          }`}
        >
          🎓
          <span>Results</span>
        </button>

        <button
          onClick={() => setPage("reports")}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium ${
            activePage === "reports"
              ? "bg-blue-600 text-white shadow"
              : "text-slate-300 hover:bg-slate-800"
          }`}
        >
          📊
          <span>Reports</span>
        </button>

        <button
          onClick={() => setPage("settings")}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium ${
            activePage === "settings"
              ? "bg-blue-600 text-white shadow"
              : "text-slate-300 hover:bg-slate-800"
          }`}
        >
          ⚙️
          <span>Settings</span>
        </button>

      </nav>
    </aside>
  );
}

export default Sidebar;