import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
function QuizPage() {

  const { id } = useParams();
  const n = useNavigate();
  const [questions, setQuestions] =useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [quizTitle, setQuizTitle] = useState("");
  const [quizDescription, setQuizDescription] = useState("");
  useEffect(() => {
    const fetchQuiz = async () => {
    try {
      const response = await api.get(`/quiz/${id}`);
      setQuestions(response.data);
      if (response.data.length > 0) {
          setQuizTitle(response.data[0].title);
          setQuizDescription(response.data[0].description);
        }
    } catch (error) {
         console.log(error);
    } 
    finally {
      setLoading(false);}
    };
    fetchQuiz();
    }, [id]);
 const handleAnswer = (questionId,answer) => {setAnswers( {...answers,[questionId]: answer});};
 const submitQuiz = async () => {
  try {
    const token = localStorage.getItem("token");
    const formattedAnswers = Object.keys(answers).map((questionId) => ({question_id: Number(questionId), answer:answers[questionId] }) );
    const response =await api.post("/submit-quiz",
        {
          quiz_id: Number(id),
          answers:
            formattedAnswers
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

    n("/result",{state: response.data});
  } catch (error) {
    console.log(error);
  }
 };
 if (loading) {

  return (
    <h1 className="text-center mt-10">
      Loading...
    </h1>
  );
}
return (

  <div className="min-h-screen bg-slate-100 p-6">

    <div className="max-w-4xl mx-auto">

      <div className="mb-10">
          <h1 className="text-4xl font-bold mb-2"> {quizTitle}</h1>
          <p className="text-gray-500 text-lg">  {quizDescription}</p>

      </div>

      {questions.map((q) => (

        <div
          key={q.id}
          className=" bg-white
                        rounded-3xl
                        border
                      border-slate-200
                        shadow-md
                        p-6
                        mb-6
                        hover:shadow-lg
                        transition"
        >

          <h2 className="text-xl font-semibold mb-4">
            {q.question}
          </h2>

          {["A","B","C","D"].map(
            (option) => (

            <label
              key={option}
              className="
              flex
              items-center
              gap-3
              mb-3
              cursor-pointer
              "
            >

              <input
                type="radio"
                name={`question-${q.id}`}
                value={option}
                onChange={() =>
                  handleAnswer(
                    q.id,
                    option
                  )
                }
              />

              {
                q[
                  `option_${option.toLowerCase()}`
                ]
              }

            </label>

          ))}

        </div>

      ))}

      <button
        onClick={submitQuiz}
        className="
        w-full
        bg-green-600
        text-white
        py-4
        rounded-xl
        font-semibold
        hover:bg-green-700
        "
      >
        Submit Quiz
      </button>

    </div>

  </div>
);
}

export default QuizPage;