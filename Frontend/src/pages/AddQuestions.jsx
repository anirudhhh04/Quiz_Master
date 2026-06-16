import { useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function AddQuestions() {
  const { quizId } = useParams();
  const [question, setQuestion] = useState("");
  const [optionA, setOptionA] = useState("");
  const [optionB, setOptionB] = useState("");
  const [optionC, setOptionC] = useState("");
  const [optionD, setOptionD] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("A");
  const [loading, setLoading] = useState(false);
  const [currentCount, setCurrentCount] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const n=useNavigate();
  useEffect(() => {
    const fetchQuizInfo = async () => {
      const response =
       await api.get(`/quiz-info/${quizId}`);
       setTotalQuestions( response.data.total_questions);
    };
  fetchQuizInfo();
  },[quizId]);
  const addQuestion = async (e) => {  e.preventDefault();
  try {
      setLoading(true);
      const token = localStorage.getItem("token");
      await api.post( "/add-question",
        {
          quiz_id: Number(quizId),
          question,
          option_a: optionA,
          option_b: optionB,
          option_c: optionC,
          option_d: optionD,
          correct_answer: correctAnswer
          
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      const nextCount = currentCount + 1;
      setCurrentCount(nextCount);
      if (nextCount >= totalQuestions) {
         toast.success("Quiz Created Successfully");
         n("/dashboard");
         return;
      }
      toast.success("Question Added");
      setQuestion("");
      setOptionA("");
      setOptionB("");
      setOptionC("");
      setOptionD("");
      setCorrectAnswer("A");
    } catch (error) {
        console.log(error);
        console.log(error.response);
        toast.error(error.response?.data.message ||"Failed to add question");

    }
     finally { setLoading(false);     }
  };
  return (
    <div className="
    min-h-screen
    bg-gradient-to-br
    from-blue-600
    to-slate-900
    flex
    items-center
    justify-center
    p-6
    ">

      <div className="
      bg-white
      w-full
      max-w-2xl
      rounded-3xl
      shadow-2xl
      p-8
      ">

        <h1 className="
        text-3xl
        font-bold
        mb-6
        ">
          Add Question
        </h1>
             <h2 className="text-xl font-semibold mb-4">
                Question {currentCount + 1} of {totalQuestions}
             </h2>
        <form
          onSubmit={addQuestion}
          className="space-y-4"
        >

          <input
            type="text"
            placeholder="Question"
            value={question}
            onChange={(e) =>
              setQuestion(e.target.value)
            }
            className="w-full border p-3 rounded-lg"
            required
          />

          <input
            type="text"
            placeholder="Option A"
            value={optionA}
            onChange={(e) =>
              setOptionA(e.target.value)
            }
            className="w-full border p-3 rounded-lg"
            required
          />

          <input
            type="text"
            placeholder="Option B"
            value={optionB}
            onChange={(e) =>
              setOptionB(e.target.value)
            }
            className="w-full border p-3 rounded-lg"
            required
          />

          <input
            type="text"
            placeholder="Option C"
            value={optionC}
            onChange={(e) =>
              setOptionC(e.target.value)
            }
            className="w-full border p-3 rounded-lg"
            required
          />

          <input
            type="text"
            placeholder="Option D"
            value={optionD}
            onChange={(e) =>
              setOptionD(e.target.value)
            }
            className="w-full border p-3 rounded-lg"
            required
          />

          <select
            value={correctAnswer}
            onChange={(e) =>
              setCorrectAnswer(
                e.target.value
              )
            }
            className="w-full border p-3 rounded-lg"
          >
            <option value="A">
              Option A
            </option>

            <option value="B">
              Option B
            </option>

            <option value="C">
              Option C
            </option>

            <option value="D">
              Option D
            </option>

          </select>

          <button
            type="submit"
            disabled={loading}
            className="
            w-full
            bg-blue-600
            text-white
            p-3
            rounded-lg
            hover:bg-blue-700
            "
          >
            {
              loading
              ? "Adding..."
              : "Add Question"
            }
          </button>

        </form>

      </div>

    </div>
  );
}

export default AddQuestions;