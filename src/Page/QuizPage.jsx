import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPrayingHands, FaRegSmileBeam, FaHeart } from "react-icons/fa";
import { Container, Button } from "react-bootstrap";

const quizData = [
  {
    question: "Are you starting something new?",
    suggestions: ["Ganesh Pooja", "Navagraha Yagna"],
    icon: <FaPrayingHands className="me-2 text-warning" />
  },
  {
    question: "Feeling heavy or stressed?",
    suggestions: ["Shanti Pooja", "Durga Homa"],
    icon: <FaHeart className="me-2 text-danger" />
  },
  {
    question: "Seeking overall well-being?",
    suggestions: ["Maha Mrityunjaya Jap", "Rudra Abhishek"],
    icon: <FaRegSmileBeam className="me-2 text-success" />
  }
];

const QuizPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isQuizStarted, setIsQuizStarted] = useState(false);

  const nextQuestion = () => {
    if (currentIndex < quizData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowResult(true);
    }
  };

  const restartQuiz = () => {
    setCurrentIndex(0);
    setShowResult(false);
  };

  const startQuizAnimation = () => {
    setIsQuizStarted(true);
  };

  return (
    <section style={{ backgroundColor: "#fef9f5", minHeight: "100vh", paddingTop: "5rem" }}>
      <Container className="text-center" style={{ color: "#4b2e2e" }}>
        {/* OM Symbol animation */}
        <AnimatePresence mode="wait">
          {!isQuizStarted ? (
            <motion.div
              key="om-symbol"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 5 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{
                duration: 1,
                type: "spring",
                stiffness: 100,
              }}
              style={{
                fontSize: "4rem",
                fontFamily: "serif",
                fontWeight: "bold",
              }}
            >
              <span>ॐ</span>
            </motion.div>
          ) : (
            <>
              <h2 className="fw-bold mb-4">🔮 Find Your Ritual</h2>
              <AnimatePresence mode="wait">
                {!showResult ? (
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -40 }}
                    transition={{ duration: 0.5 }}
                    className="mb-4"
                  >
                    {/* Displaying the quiz question */}
                    <h4 className="mb-3">
                      {quizData[currentIndex].icon}
                      {quizData[currentIndex].question}
                    </h4>
                    {/* Button to proceed to the next question */}
                    <Button variant="warning" className="fw-bold rounded-pill px-4" onClick={nextQuestion}>
                      Yes, Continue
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -40 }}
                    transition={{ duration: 0.5 }}
                  >
                    {/* Displaying the recommendations based on choices */}
                    <h4 className="mb-3">✨ Based on your choices, we recommend:</h4>
                    <ul className="list-unstyled fs-5">
                      {/* Mapping through suggestions */}
                      {quizData[currentIndex].suggestions.map((s, i) => (
                        <li key={`${currentIndex}-${i}`}>🔹 {s}</li>
                      ))}
                    </ul>
                    {/* Button to restart the quiz */}
                    <Button variant="outline-warning" className="mt-4 fw-bold rounded-pill" onClick={restartQuiz}>
                      Restart Quiz
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}
        </AnimatePresence>

        {/* Button to trigger quiz animation */}
        {!isQuizStarted && (
          <Button
            variant="warning"
            className="fw-bold rounded-pill mt-4"
            onClick={startQuizAnimation}
            style={{ padding: "0.8rem 2rem" }}
          >
            Start Quiz 🔮
          </Button>
        )}
      </Container>
    </section>
  );
};

export default QuizPage;
