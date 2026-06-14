import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateQuiz from "./pages/CreateQuiz";
import AddQuestions from "./pages/AddQuestions.jsx";
import Quizzes from "./pages/Quizzes";
import QuizPage from "./pages/QuizPage";
import Result from "./pages/Result.jsx";
import MyAttempts from "./pages/MyAttempts";
import MyQuizzes from "./pages/MyQuizzes";
import {Toaster } from "react-hot-toast";
function App() {
  return (
    <BrowserRouter>
    <>
    <Toaster/>
      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />
        <Route
          path="/create-quiz"
          element={<CreateQuiz />}
        />
        <Route
          path="/add-questions/:quizId"
          element={<AddQuestions />}
        />
        <Route
          path="/quizzes"
          element={<Quizzes />}
        />
        <Route
           path="/quiz/:id"
           element={<QuizPage />}

        />
        <Route
            path="/result"
            element={<Result />}
        />
        <Route
            path="/attempts"
            element={<MyAttempts />}
        />
        <Route
            path="/my-quizzes"
            element={<MyQuizzes />}
        />
      </Routes>
    </>
    </BrowserRouter>
  );
}

export default App;