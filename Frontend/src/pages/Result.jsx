import { useLocation, useNavigate } from "react-router-dom";

function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const score = location.state?.score || 0;
  const total = location.state?.total || 0;
  const percentage = total > 0 ? Math.round((score / total) * 100): 0;

  return (

    <div className="
    min-h-screen
    bg-slate-100
    flex
    items-center
    justify-center
    p-6
    ">

      <div className="
      bg-white
      rounded-3xl
      shadow-xl
      p-10
      w-full
      max-w-lg
      text-center
      ">

        <h1 className="
        text-4xl
        font-bold
        mb-4
        ">
          Quiz Completed 🎉
        </h1>

        <p className="
        text-gray-500
        mb-8
        ">
          Here is your result
        </p>

        <div className="
        text-6xl
        font-bold
        text-blue-600
        mb-4
        ">
          {score}/{total}
        </div>

        <div className="
        text-2xl
        font-semibold
        mb-8
        ">
          {percentage}%
        </div>

        <button
          onClick={() =>
            navigate("/dashboard")
          }
          className="
          w-full
          bg-blue-600
          text-white
          py-3
          rounded-xl
          hover:bg-blue-700
          transition
          "
        >
          Back to Dashboard
        </button>

      </div>

    </div>
  );
}

export default Result;