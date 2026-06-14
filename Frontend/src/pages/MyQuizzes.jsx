import { useEffect, useState } from "react";
import api from "../services/api";
import { FaTrash } from "react-icons/fa";

function MyQuizzes() {
  const [quizzes, setQuizzes] = useState([]);
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const token =localStorage.getItem("token");
        const response = await api.get("/my-quizzes",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }
          );
        setQuizzes(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchQuizzes();
  }, []);
  const deleteQuiz = async (quizId) => {
     const confirmDelete = window.confirm("Do you want to delete this quiz?");
     if (!confirmDelete) return;
     try {
         const token = localStorage.getItem("token");
         await api.delete(`/delete-quiz/${quizId}`,
         {
            headers: { Authorization: `Bearer ${token}` }
         }
         );
    setQuizzes(quizzes.filter((quiz) => quiz.id !== quizId));
    } 
    catch (error) {
    console.log(error);
    alert("Failed to delete quiz");
    }
};
  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className=" bg-gradient-to-r from-blue-600 to-slate-900 text-white rounded-3xl py-12 mb-12 text-center shadow-lg">
            <h1 className="text-5xl font-bold mb-3"> My Quizzes</h1>
            <p className="text-blue-100 text-lg"> Quizzes created by you</p>
        </div>
        {  quizzes.length === 0 ? (
           <div className="text-center py-20">
               <h2 className="text-3xl font-bold text-gray-700 mb-4">No Quizzes Yet</h2>
              <p className="text-gray-500"> Create your first quiz.</p>
           </div> ) :(
           <div className="flex flex-wrap justify-center gap-8">
            {quizzes.map((quiz) => (
             <div
              key={quiz.id}
              className="
              w-80
              bg-white
              rounded-3xl
              border
              border-slate-200
              shadow-lg
              overflow-hidden
              hover:shadow-xl
              hover:-translate-y-2
              transition-all
              duration-300
              "
            >

              <div className="p-6 min-h-[160px]">

                <div className=" flex justify-between items-start mb-3">

                      <h2 className="text-2xl font-bold"> {quiz.title}</h2>
                      <FaTrash onClick={() =>deleteQuiz(quiz.id)}
                         className=" text-red-500 cursor-pointer  hover:text-red-700 transition"
                         size={18}
                       />

                </div>
                <p className="text-gray-500 mb-4">
                  {quiz.description}
                </p>

                <p className="text-blue-600 font-medium">
                  Questions: {quiz.total_questions}
                </p>

              </div>

            </div>

          ))}

        </div>
      )}

      </div>
    </div>
  );
}
export default MyQuizzes;