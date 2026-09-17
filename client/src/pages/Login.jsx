import { useState } from "react";

function Login({ setPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const response = await fetch(
        "http://localhost:5000/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Save logged-in user
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      setMessage("Login successful!");

      // Go to dashboard
      setPage("dashboard");
    } catch (error) {
      console.error("Login error:", error);
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">

      <div className="w-full max-w-md">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            Student Management System
          </h1>

          <p className="text-slate-500 mt-2">
            Login to your account
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">

          <h2 className="text-2xl font-bold text-slate-800 mb-6">
            Login
          </h2>

          <form onSubmit={handleLogin} className="space-y-5">

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {message && (
              <div className="bg-blue-50 text-blue-700 px-4 py-3 rounded-xl">
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white py-3 rounded-xl font-medium"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>

          <div className="text-center mt-6">

            <p className="text-slate-500">
              Don't have an account?
            </p>

            <button
              type="button"
              onClick={() => setPage("register")}
              className="text-blue-600 hover:text-blue-800 font-semibold mt-1"
            >
              Create Account
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;