function Settings({
  setPage,
  darkMode,
  setDarkMode,
  notifications,
  setNotifications,
}) {

  const handleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleNotifications = () => {
    setNotifications(!notifications);
  };

  return (
    <div
      className={`min-h-screen p-8 transition-colors duration-300 ${
        darkMode
          ? "bg-slate-950 text-white"
          : "bg-slate-100 text-slate-800"
      }`}
    >

      {/* Header */}
      <div className="mb-8">
        <h1
          className={`text-3xl font-bold ${
            darkMode ? "text-white" : "text-slate-800"
          }`}
        >
          Settings
        </h1>

        <p
          className={`mt-1 ${
            darkMode ? "text-slate-400" : "text-slate-500"
          }`}
        >
          Manage your system preferences and account.
        </p>
      </div>

      <div className="max-w-4xl space-y-6">

        {/* General Settings */}
        <div
          className={`rounded-2xl shadow-sm border overflow-hidden transition-colors duration-300 ${
            darkMode
              ? "bg-slate-900 border-slate-700"
              : "bg-white border-slate-200"
          }`}
        >

          {/* Header */}
          <div
            className={`px-6 py-5 border-b ${
              darkMode
                ? "border-slate-700"
                : "border-slate-200"
            }`}
          >
            <h2
              className={`text-xl font-bold ${
                darkMode ? "text-white" : "text-slate-800"
              }`}
            >
              General Settings
            </h2>

            <p
              className={`text-sm mt-1 ${
                darkMode
                  ? "text-slate-400"
                  : "text-slate-500"
              }`}
            >
              Customize how your system works.
            </p>
          </div>

          {/* Notifications */}
          <div
            className={`flex items-center justify-between px-6 py-5 border-b ${
              darkMode
                ? "border-slate-700"
                : "border-slate-100"
            }`}
          >

            <div className="flex items-center gap-4">

              <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center text-xl">
                🔔
              </div>

              <div>
                <h3
                  className={`font-semibold ${
                    darkMode
                      ? "text-white"
                      : "text-slate-700"
                  }`}
                >
                  Notifications
                </h3>

                <p
                  className={`text-sm ${
                    darkMode
                      ? "text-slate-400"
                      : "text-slate-500"
                  }`}
                >
                  {notifications
                    ? "Notifications are enabled."
                    : "Notifications are disabled."}
                </p>
              </div>

            </div>

            {/* Notification Toggle */}
            <button
              onClick={handleNotifications}
              className={`relative w-14 h-7 rounded-full transition ${
                notifications
                  ? "bg-blue-600"
                  : "bg-slate-400"
              }`}
            >
              <span
                className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition ${
                  notifications
                    ? "right-1"
                    : "left-1"
                }`}
              ></span>
            </button>

          </div>

          {/* Dark Mode */}
          <div className="flex items-center justify-between px-6 py-5">

            <div className="flex items-center gap-4">

              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl ${
                  darkMode
                    ? "bg-indigo-900"
                    : "bg-slate-200"
                }`}
              >
                🌙
              </div>

              <div>
                <h3
                  className={`font-semibold ${
                    darkMode
                      ? "text-white"
                      : "text-slate-700"
                  }`}
                >
                  Dark Mode
                </h3>

                <p
                  className={`text-sm ${
                    darkMode
                      ? "text-slate-400"
                      : "text-slate-500"
                  }`}
                >
                  {darkMode
                    ? "Dark mode is enabled."
                    : "Dark mode is disabled."}
                </p>
              </div>

            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={handleDarkMode}
              className={`relative w-14 h-7 rounded-full transition ${
                darkMode
                  ? "bg-blue-600"
                  : "bg-slate-300"
              }`}
            >
              <span
                className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition ${
                  darkMode
                    ? "right-1"
                    : "left-1"
                }`}
              ></span>
            </button>

          </div>

        </div>

        {/* Account */}
        <div
          className={`rounded-2xl shadow-sm border overflow-hidden ${
            darkMode
              ? "bg-slate-900 border-slate-700"
              : "bg-white border-slate-200"
          }`}
        >

          <div
            className={`px-6 py-5 border-b ${
              darkMode
                ? "border-slate-700"
                : "border-slate-200"
            }`}
          >
            <h2
              className={`text-xl font-bold ${
                darkMode
                  ? "text-white"
                  : "text-slate-800"
              }`}
            >
              Account
            </h2>

            <p
              className={`text-sm mt-1 ${
                darkMode
                  ? "text-slate-400"
                  : "text-slate-500"
              }`}
            >
              Manage your account.
            </p>
          </div>

          {/* Logout */}
          <div className="px-6 py-5 flex items-center justify-between">

            <div className="flex items-center gap-4">

              <div className="w-11 h-11 rounded-xl bg-red-100 flex items-center justify-center text-xl">
                🚪
              </div>

              <div>
                <h3
                  className={`font-semibold ${
                    darkMode
                      ? "text-white"
                      : "text-slate-700"
                  }`}
                >
                  Logout
                </h3>

                <p
                  className={`text-sm ${
                    darkMode
                      ? "text-slate-400"
                      : "text-slate-500"
                  }`}
                >
                  Sign out from your account.
                </p>
              </div>

            </div>

            {/* Logout Button */}
            <button
              onClick={() => setPage("login")}
              className="px-5 py-2.5 rounded-xl bg-red-100 hover:bg-red-200 text-red-600 font-semibold transition shadow-sm"
            >
              Logout
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Settings;