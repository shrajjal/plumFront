import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const categories = [
  { name: "General Knowledge", desc: "World facts, culture, and history." },
  { name: "Science & Technology", desc: "Physics, inventions, and more." },
  { name: "Sports", desc: "Games, players, and records." },
  { name: "Movies & Entertainment", desc: "Films, music, and celebrities." },
  { name: "History & Geography", desc: "Past events and the world map." },
  { name: "Current Affairs", desc: "Latest news and updates." },
];

const LandingPage = () => {
  const navigate = useNavigate();
  const [customTopic, setCustomTopic] = useState("");
  const [showInput, setShowInput] = useState(true); // Show custom topic first

  const handleCategoryClick = (category) => {
    navigate(`/quiz/${category}`);
  };

  const handleCustomSubmit = () => {
    if (customTopic.trim() !== "") {
      navigate(`/quiz/${customTopic}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex flex-col items-center">
      {/* Header */}
      <header className="p-8 text-center">
        <h1 className="text-5xl font-extrabold text-indigo-700 tracking-wide drop-shadow-sm">
          QuizSphere
        </h1>
        <p className="text-gray-600 mt-3 text-lg">
          Test Your Knowledge, One Quiz at a Time!
        </p>
      </header>

      {/* Custom Topic Input */}
      {showInput && (
        <section className="text-center mb-12 flex flex-col items-center gap-3">
          <h2 className="text-3xl font-semibold text-gray-800">
            Start With a Custom Topic
          </h2>
          <p className="text-gray-500 mt-1">Enter any topic and take a quiz on it.</p>
          <input
            type="text"
            placeholder="Enter your topic"
            value={customTopic}
            onChange={(e) => setCustomTopic(e.target.value)}
            className="border-2 border-indigo-400 rounded-lg p-3 w-72 focus:outline-none focus:ring-4 focus:ring-indigo-300 mt-3"
          />
          <button
            onClick={handleCustomSubmit}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition mt-2"
          >
            Start Quiz
          </button>
        </section>
      )}

      {/* Categories */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl px-6">
        {categories.map((cat, i) => (
          <div
            key={i}
            onClick={() => handleCategoryClick(cat.name)}
            className="bg-white shadow-lg rounded-2xl p-6 cursor-pointer hover:scale-105 hover:shadow-2xl transition transform duration-300"
          >
            <h3 className="text-xl font-bold text-indigo-700">{cat.name}</h3>
            <p className="text-gray-500 mt-3">{cat.desc}</p>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="mt-16 text-gray-500 text-sm">
        Copyright @Shrajjal
      </footer>
    </div>
  );
};

export default LandingPage;
