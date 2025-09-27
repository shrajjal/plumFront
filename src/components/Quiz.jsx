import React, { useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Quiz = () => {
  const { topic } = useParams();
  const navigate = useNavigate();

  // States
  const [data, setData] = useState([]);
  const [question, setQuestion] = useState(null);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [lock, setLock] = useState(false);
  const [result, setResult] = useState(false);
  const [loading, setLoading] = useState(true);

  // Refs for options
  const option1 = useRef(null);
  const option2 = useRef(null);
  const option3 = useRef(null);
  const option4 = useRef(null);
  const option_array = [option1, option2, option3, option4];

  // Fetch quiz on topic change
  useEffect(() => {
    const fetchQuiz = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://plum-project-backend.onrender.com/generate/${topic}
`);
        const quizArray = response.data.array || [];
        setData(quizArray);
        setQuestion(quizArray[0] || null);
        setAnswers(Array(quizArray.length).fill(null));
        setIndex(0);
        setScore(0);
        setLock(false);
        setResult(false);
      } catch (error) {
        console.error("Error fetching quiz:", error);
        setData([]);
        setQuestion(null);
      } finally {
        setLoading(false);
      }
    };

    if (topic) fetchQuiz();
  }, [topic]);

  // Reset option styles safely
  const resetOptions = () => {
    option_array.forEach((option) => {
      if (option.current) {
        option.current.classList.remove(
          "bg-[#dffff2]",
          "border-[#00d397]",
          "bg-[#FFEBEB]",
          "border-[#FF4A4A]"
        );
      }
    });
  };

  // Load previous answer
  const loadAnswer = () => {
    if (!question) return;
    resetOptions();

    const chosen = answers[index];
    if (chosen !== null && option_array[chosen - 1]?.current) {
      if (chosen === question.ans) {
        option_array[chosen - 1].current.classList.add("bg-[#dffff2]", "border-[#00d397]");
      } else {
        option_array[chosen - 1].current.classList.add("bg-[#FFEBEB]", "border-[#FF4A4A]");
        option_array[question.ans - 1]?.current?.classList.add("bg-[#dffff2]", "border-[#00d397]");
      }
      setLock(true);
    } else {
      setLock(false);
    }
  };

  // Update options when question or index changes
  useEffect(() => {
    loadAnswer();
  }, [question, index]);

  // Check answer
  const checkAns = (e, ans) => {
    if (lock) return;
    const correct = question.ans;

    let updatedAnswers = [...answers];
    updatedAnswers[index] = ans;
    setAnswers(updatedAnswers);

    if (ans === correct) {
      e.target.classList.add("bg-[#dffff2]", "border-[#00d397]");
      setScore((prev) => prev + 1);
    } else {
      e.target.classList.add("bg-[#FFEBEB]", "border-[#FF4A4A]");
      option_array[correct - 1]?.current?.classList.add("bg-[#dffff2]", "border-[#00d397]");
    }
    setLock(true);
  };

  // Next question
  const next = () => {
    if (!lock) return;
    if (index === data.length - 1) return setResult(true);
    setIndex((prev) => prev + 1);
    setQuestion(data[index + 1]);
  };

  // Previous question
  const prev = () => {
    if (index > 0) {
      setIndex((prev) => prev - 1);
      setQuestion(data[index - 1]);
    }
  };

  // Reset quiz
  const reset = () => {
    setIndex(0);
    setQuestion(data[0]);
    setScore(0);
    setLock(false);
    setResult(false);
    setAnswers(Array(data.length).fill(null));
    resetOptions();
  };

  // Feedback
  const feedbackMessage = () => {
    const percent = (score / data.length) * 100;
    if (percent === 100) return "🎉 Perfect Score! You nailed it!";
    if (percent >= 70) return "👏 Great job! You did really well.";
    if (percent >= 40) return "🙂 Not bad! Keep practicing.";
    return "😅 Don’t worry, try again and you’ll improve!";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#D8C7FF] to-[#19006C] font-[poppins] flex items-start justify-center py-20">
      <div className="w-[640px] bg-white text-[#262626] flex flex-col gap-5 rounded-[10px] px-[50px] py-[40px]">
        <h1 className="text-3xl font-bold text-[#553f9a] mb-4">Quiz questions</h1>
        <hr className="mb-0.5" />

        {loading ? (
          <div className="flex flex-col items-center justify-center h-64">
            <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-20 w-20 mb-4"></div>
            <p className="text-lg">Generating quiz, please wait...</p>
          </div>
        ) : result ? (
          <>
            <h2 className="text-xl font-semibold mb-4">
              You scored {score} out of {data.length}
            </h2>
            <p className="text-lg mb-6">{feedbackMessage()}</p>
            <button
              onClick={reset}
              className="w-[120px] h-[50px] bg-[#553f9a] text-white text-lg font-medium rounded-lg cursor-pointer"
            >
              Reset
            </button>
            <div
              onClick={() => navigate("/")}
              className="text-blue-500 cursor-pointer hover:underline mt-1 text-center"
            >
              Click here to go back to Home
            </div>
          </>
        ) : question ? (
          <>
            <h2 className="text-[27px] font-medium">{index + 1}. {question.question}</h2>
            <ul>
              {[question.option1, question.option2, question.option3, question.option4].map((opt, i) => (
                <li
                  key={i}
                  ref={option_array[i]}
                  onClick={(e) => checkAns(e, i + 1)}
                  className="flex items-center h-[50px] pl-[15px] border border-[#686868] rounded-lg mb-2 text-[20px] cursor-pointer"
                >
                  {opt}
                </li>
              ))}
            </ul>
            <div className="flex justify-between mt-1">
              <button
                onClick={prev}
                disabled={index === 0}
                className={`w-[120px] h-[50px] rounded-lg font-medium ${
                  index === 0 ? "bg-gray-300 text-gray-600 cursor-not-allowed" : "bg-gray-500 text-white hover:bg-gray-600"
                }`}
              >
                Previous
              </button>
              <button
                onClick={next}
                className="w-[120px] h-[50px] bg-[#553f9a] text-white text-lg font-medium rounded-lg cursor-pointer"
              >
                {index === data.length - 1 ? "Finish" : "Next"}
              </button>
            </div>
            <div className="mt-1 text-gray-600">{index + 1} of {data.length} questions</div>
            <div
              onClick={() => navigate("/")}
              className="text-blue-500 cursor-pointer hover:underline mt-1 text-center"
            >
              Click here to go back to Home
            </div>
          </>
        ) : (
          <p>No quiz available for this topic.</p>
        )}
      </div>

      {/* Spinner CSS */}
      <style>{`
        .loader {
          border-top-color: #553f9a;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Quiz;
