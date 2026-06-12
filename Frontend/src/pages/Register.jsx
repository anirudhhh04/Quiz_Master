import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import api from "../services/api";

function Register() {
  const n = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await api.post("/register", {
        username,
        password,
      });
      alert("Registration Successful");
      n("/");
    }catch (error) {
      alert(
        error.response?.data?.message ||
          "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <AuthLayout>

      <h1 className="text-3xl font-bold text-center mb-2">
        Create Account
      </h1>

      <p className="text-center text-gray-500 mb-6">
        Join QuizMaster
      </p>

      <form
        onSubmit={handleRegister}
        className="space-y-4"
      >

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
          className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
          required
        />

        <button
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg"
        >
          {loading
            ? "Creating Account..."
            : "Register"}
        </button>

      </form>

      <p className="text-center mt-6">
        Already have an account?

        <Link
          to="/"
          className="text-blue-600 ml-2"
        >
          Login
        </Link>
      </p>

    </AuthLayout>
  );
}

export default Register;