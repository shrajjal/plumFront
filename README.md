# 🤖 AI Quiz App

An interactive quiz application powered by AI that generates multiple-choice questions (MCQs) dynamically based on selected topics. Built with **React**, **TailwindCSS**, and integrated with **Gemini API** for question generation.

---

## 🔗 Live Demo

👉 [Click here to try the app](https://plumfront.onrender.com/)

---

## 🚀 Features

* 🎯 AI-generated multiple-choice questions
* 📊 Progress tracking and score calculation
* 💡 Instant feedback on answers
* 🎨 Responsive UI with TailwindCSS
* 🔄 Retry mechanism to handle malformed AI responses

---

## 🛠️ Tech Stack

* **Frontend:** React, TailwindCSS, React Router DOM
* **Backend / AI:** Gemini AI
* **State Management:** React Hooks
* **HTTP Requests:** Axios

---

## 1️⃣ Problem Understanding

The goal was to create a quiz platform where **questions are not hardcoded**, but generated in real-time by an AI model.

### Key Requirements

* Generate **5 MCQs per quiz** dynamically.
* Support both **predefined** and **custom topics**.
* Provide **scoring** and **personalized AI feedback**.

### Assumptions

* AI sometimes returns invalid JSON → handled with **retry + cleanup logic**.
* Limited to single-answer MCQs for simplicity.
* English is the default quiz language.

---

## 2️⃣ AI Prompts & Iterations

* **Initial Prompt:**
  *“Generate 5 multiple-choice questions on [topic] with 4 options and 1 correct answer in JSON format.”*

* **Issues Faced:**

  * AI sometimes gave plain text instead of JSON.
  * Duplicate or missing options.

* **Refined Prompt:**
  *“Return exactly 5 multiple-choice questions in strict JSON format with fields: `question`, `options`, `answer`.”*

* **Solution:**

  * Added a **parser utility** to sanitize AI output.
  * Implemented a **retry mechanism** when JSON parsing failed.

---

## 3️⃣ Architecture & Project Structure

```
plumFront/
│── public/               # Static files served directly
│── screenshots/          # App screenshots for README
│── src/                  # Main source code
│   ├── assets/           # Images, data, or static resources
│   ├── components/       # Reusable UI components
│   ├── LandingPage.jsx   # Landing page component
│   ├── Quiz.jsx          # Quiz component
│   ├── App.jsx           # Root app component
│   ├── main.jsx          # React entry point
│   └── index.css         # Global styles
│── .gitignore            # Files to ignore in git
│── README.md             # Project documentation
│── index.html            # HTML template
│── vite.config.js        # Vite configuration
│── tailwind.config.js    # TailwindCSS configuration
│── postcss.config.js     # PostCSS configuration
│── eslint.config.js      # ESLint configuration
```

---

## ⚡ Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/shrajjal/plumFront.git
cd plumFront
```

### 2. Install dependencies

```bash
npm install
```

### 3. Add environment variables

Create a `.env` file in the root directory:

```
VITE_API_KEY=GEMINI_API_KEY
```

### 4. Run the app

```bash
npm run dev
```

---

## 🎮 Usage

1. Select a topic (e.g., General Knowledge, Science, Movies).
2. Enter any **custom topic** for quiz.
3. AI generates 5 MCQs dynamically.
4. Answer questions one by one.
5. View your score and get custom AI feedback.

---

## 📸 Screenshots

### 🏠 Landing Page

![Landing Page](./screenshots/landing.png)

### 📝 Quiz Question

![Quiz Question](./screenshots/question.png)

### 🏆 Result Page

![Result Page](./screenshots/result.png)

---

## 4️⃣ Known Issues / Improvements

* ⚠️ AI may occasionally generate vague or repetitive questions.
* ⚠️ No time limit per question yet.
* ⚠️ Basic styling — can be improved with transitions.

### Future Improvements

* ⏳ Add **timed quizzes**.
* 🌙 Add **dark mode**.
* 🌍 Add **multi-language support**.
* 📊 Save user progress across sessions.

---

## 5️⃣ Bonus Work

* ✨ Retry mechanism for invalid AI responses.
* ✨ Option to input custom quiz topics.
* ✨ Clean, responsive UI with TailwindCSS.

---

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

---

## 📜 License

This project is licensed under the **Shrajjal License** – see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

Developed by **[Shrajjal Prakash](https://github.com/shrajjal)** 🚀
