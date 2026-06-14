import { useEffect, useState } from "react";
import api from "../services/api";
function MyAttempts() {
  const [attempts, setAttempts] =
    useState([]);
  useEffect(() => {
    const fetchAttempts = async () => {
      try {
        const token =localStorage.getItem("token");
        const response = await api.get("/my-attempts",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }
          );
        setAttempts(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAttempts();
  }, []);
  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-5xl mx-auto">
            <div className=" bg-gradient-to-r from-blue-600 to-slate-900 text-white rounded-3xl  py-12 mb-12 text-center shadow-lg ">
                    <h1 className="text-5xl font-bold mb-3">My Attempts</h1>
                    <p className="text-blue-100 text-lg"> View your quiz performance history</p>

            </div>
        {attempts.length === 0 ?(
             <div className="text-center py-20">
               <h2 className="text-3xl font-bold text-gray-700 mb-4">No Attempts Yet</h2>
                  <p className="text-gray-500">Take a quiz to see your results here.</p>
            </div> ) : (
        attempts.map((attempt, index) => (
          <div
            key={index}
            className="
            bg-white
            rounded-2xl
            shadow-md
            border
            border-slate-200
            p-6
            mb-4
            "
          >
            <h2 className="text-2xl font-bold">
              {attempt.title}
            </h2>

            <p className="text-blue-600 mt-2">
              Score: {attempt.score}
            </p>

            <p className="text-gray-500 mt-2">
              {attempt.attempted_at}
            </p>

          </div>

        )))}

      </div>

    </div>
  );
}

export default MyAttempts;