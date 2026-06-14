import { useNavigate } from "react-router-dom";
import {FaPlusCircle, FaPlayCircle, FaHistory, FaBook, FaSignOutAlt} from "react-icons/fa";

function Dashboard() {
  const n = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    n("/");
  };
  const cards = [
    {
      title: "Create Quiz",
      icon: <FaPlusCircle size={40} />,
      color: "bg-blue-500",
      route: "/create-quiz"
    },
    {
      title: "Take Quiz",
      icon: <FaPlayCircle size={40} />,
      color: "bg-green-500",
      route: "/quizzes"
    },
    {
      title: "My Attempts",
      icon: <FaHistory size={40} />,
      color: "bg-purple-500",
      route: "/attempts"
    },
    {
      title: "My Quizzes",
      icon: <FaBook size={40} />,
      color: "bg-orange-500",
      route: "/my-quizzes"
    }
  ];
  const username = localStorage.getItem("username");
  const isNewUser = localStorage.getItem("isNewUser") === "true";
  return (
    <div className="min-h-screen bg-slate-100">
      {/* Navbar */}
      <nav className="bg-slate-900 text-white px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          QuizMaster
        </h1>
        <button
          onClick={logout}
          className="flex items-center gap-2 bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          <FaSignOutAlt />
          Logout
        </button>

      </nav>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-slate-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-5xl font-bold mb-4">
               {isNewUser ? `Welcome, ${username}` : `Welcome Back, ${username}`}
          </h1>
          <p className="text-xl text-blue-100">
            Create quizzes, challenge friends,
            and test your knowledge.
          </p>

        </div>

      </div>
      {/* Cards */}
      <div className="max-w-6xl mx-auto px-6 py-10">

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          {cards.map((card) => (

            <div
              key={card.title}
              onClick={() => n(card.route)}
              className="
              bg-white
              rounded-2xl
              shadow-lg
              p-6
              cursor-pointer
              hover:scale-105
              hover:shadow-2xl
              transition
              duration-300
              "
            >
              <div
                className={`${card.color}
                text-white
                w-16
                h-16
                rounded-xl
                flex
                items-center
                justify-center
                mb-4`}
              >
                {card.icon}
              </div>

              <h2 className="text-xl font-bold mb-2">
                {card.title}
              </h2>

              <p className="text-gray-500">
                Click to continue
              </p>

            </div>

          ))}
        </div>
      </div>
    </div>
  );
}
export default Dashboard;