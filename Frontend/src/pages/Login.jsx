import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import api from "../services/api";

function Login() {
  const n = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response =
        await api.post("/login", {  username,  password,});

      localStorage.setItem("token",response.data.token);
      alert("Login Successful");
      localStorage.setItem("isNewUser","false");
      localStorage.setItem("username",username);
      n("/dashboard");

    } catch (error) {

      alert(
        error.response?.data?.message || "Login Failed"
      );

    }
    finally {
      setLoading(false);
    }
  };
  return (
    <AuthLayout>

      <h1 className="text-3xl font-bold text-center mb-2">
        QuizMaster
      </h1>

      <p className="text-center text-gray-500 mb-6">
        Login to continue
      </p>

      <form
        onSubmit={handleLogin}
        className="space-y-4"
      >
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
          className="
          w-full
          border
          rounded-lg
          p-3
          focus:ring-2
          focus:ring-blue-500
          outline-none
          "
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="
          w-full
          border
          rounded-lg
          p-3
          focus:ring-2
          focus:ring-blue-500
          outline-none
          "
          required
        />

        <button
          disabled={loading}
          className="
          w-full
          bg-blue-600
          hover:bg-blue-700
          text-white
          p-3
          rounded-lg
          "
        >
          {loading
            ? "Logging In..."
            : "Login"}
        </button>

      </form>

      <p className="text-center mt-6">

        Don't have an account?

        <Link
          to="/register"
          className="text-blue-600 ml-2"
        >
          Register
        </Link>

      </p>

    </AuthLayout>
  );
}

export default Login;