import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Quizzes() {

  const [quizzes, setQuizzes] = useState([]);

  const n = useNavigate();

  useEffect(() => {

    const fetchQuizzes = async () => {

      try {

        const response = await api.get("/quizzes");

        setQuizzes(response.data);

      } catch (error) {

        console.log(error);

      }
    };

    fetchQuizzes();

  }, []);

  return (

    <div className="min-h-screen bg-slate-100 p-6">

      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-r
                       from-blue-600
                       to-slate-900
                       text-white
                         rounded-3xl
                         py-12
                         mb-12
                         text-center
                         shadow-lg">

          <h1 className="text-5xl font-bold mb-3">Available Quizzes</h1>
          <p className="text-blue-100 text-lg">Select a quiz and start learning</p>
        </div>
        {   quizzes.length === 0 ? (
            <div className="text-center py-20">
                <h2 className="text-3xl font-bold text-gray-700 mb-4"> No Quizzes Available</h2>
            </div> ) : (
            <div className="flex flex-wrap justify-center gap-8">
                  {quizzes.map((quiz) => (
                    <div key={quiz.id} className=" w-80 bg-white rounded-3xl border border-slate-200
                                                  shadow-lg  overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              
              {/* Card Body */}
              <div className="p-6 min-h-[120px]">
                <h2 className="text-2xl font-bold mb-3">
                  {quiz.title}
                </h2>

                <p className="text-gray-500 leading-relaxed">
                  {quiz.description}
                </p>

              </div>

              {/* Button Section */}

              <div className="border-t bg-slate-50 p-4">

                <button
                  onClick={() => n(`/quiz/${quiz.id}`)}
                  className="
                  w-full
                  bg-blue-600
                  text-white
                  py-3
                  rounded-xl
                  font-medium
                  hover:bg-blue-700
                  transition-all
                  duration-300
                  "
                >
                  Start Quiz
                </button>

              </div>

            </div>

          ))}

        </div>
            )}

      </div>

    </div>

  );
}

export default Quizzes;