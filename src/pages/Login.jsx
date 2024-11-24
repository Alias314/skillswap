import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Log the values of email and password to check if they are set correctly
    console.log("Email:", email);
    console.log("Password:", password);

    // Manual validation
    if (!email.trim() || !password.trim()) {
      setError("Both email and password are required.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost/skillswap/backend/login.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const contentType = response.headers.get("Content-Type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        if (data.success) {
          navigate("/homepage");
        } else {
          setError(data.message || "Login failed.");
        }
      } else {
        setError("Unexpected response from the server.");
        console.error("Non-JSON response:", await response.text());
      }
    } catch (err) {
      setError("An error occurred while logging in. Please try again.");
      console.error("Login Error:", err);
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-blue-500 mb-6">
          Login
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {loading && (
          <p className="text-blue-500 text-center mb-4">Logging in...</p>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email} // Bind value to state
              onChange={(e) => setEmail(e.target.value)} // Handle state update
              required
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password} // Bind value to state
              onChange={(e) => setPassword(e.target.value)} // Handle state update
              required
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <button
              type="submit"
              className={`w-full py-2 font-semibold rounded-md ${
                loading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-500"
              }`}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Log In"}
            </button>
          </div>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <a href="/signup" className="text-blue-500 hover:underline">
              Sign Up
            </a>
          </p>
          <p className="text-sm text-gray-600 mt-2">
            <a
              href="/forgot-password"
              className="text-blue-500 hover:underline"
            >
              Forgot password?
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
