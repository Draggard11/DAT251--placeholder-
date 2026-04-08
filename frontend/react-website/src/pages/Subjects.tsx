import React, { useState } from "react";

type Question = {
    id: string;
    text: string;
    options: string[];
    answer: string;
};

type Quiz = {
    id: string;
    title: string;
    questions: Question[];
};

type Subject = {
    id: string;
    name: string;
    quizzes: Quiz[];
};

const Subjects = () => {
    // 🔥 Hardcoded data
    const [subjects, setSubjects] = useState<Subject[]>([
        {
            id: "1",
            name: "DAT251",
            quizzes: [
                {
                    id: "q1",
                    title: "REST API Basics",
                    questions: [
                        {
                            id: "1",
                            text: "What does REST stand for?",
                            options: [
                                "Representational State Transfer",
                                "Remote Execution System",
                                "Random Endpoint Structure",
                            ],
                            answer: "Representational State Transfer",
                        },
                        {
                            id: "2",
                            text: "Which HTTP method is used to fetch data?",
                            options: ["GET", "POST", "DELETE"],
                            answer: "GET",
                        },
                    ],
                },
            ],
        },
        {
            id: "2",
            name: "DAT333",
            quizzes: [
                {
                    id: "q2",
                    title: "React Basics",
                    questions: [
                        {
                            id: "3",
                            text: "What hook is used for state?",
                            options: ["useState", "useEffect", "useRef"],
                            answer: "useState",
                        },
                    ],
                },
            ],
        },
    ]);

    const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
    const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
    const [newQuizTitle, setNewQuizTitle] = useState("");
    const [answers, setAnswers] = useState<{ [key: string]: string }>({});
    const [showResults, setShowResults] = useState(false);

    const handleAnswer = (questionId: string, option: string) => {
        setAnswers((prev) => ({
            ...prev,
            [questionId]: option,
        }));
    };

    const getScore = () => {
        if (!selectedQuiz) return 0;
        return selectedQuiz.questions.filter(
            (q) => answers[q.id] === q.answer
        ).length;
    };
    // ➕ Add quiz (still frontend only)
    const handleAddQuiz = () => {
        if (!selectedSubject || !newQuizTitle.trim()) return;

        const newQuiz: Quiz = {
            id: Date.now().toString(),
            title: newQuizTitle,
            questions: [], // empty for now
        };

        const updatedSubjects = subjects.map((subj) =>
            subj.id === selectedSubject.id
                ? { ...subj, quizzes: [...subj.quizzes, newQuiz] }
                : subj
        );

        setSubjects(updatedSubjects);
        setSelectedSubject({
            ...selectedSubject,
            quizzes: [...selectedSubject.quizzes, newQuiz],
        });

        setNewQuizTitle("");
    };

    return (
        <div
            style={{
                padding: "40px 32px",
                width: "100%",
                margin: "0 auto",
                backgroundColor: "#f5f7fa",
                minHeight: "100vh",
            }}
        >
            <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

                {/* 🔷 HEADER */}
                <section style={{ marginBottom: "48px", textAlign: "center" }}>
                    <h1 style={{ fontSize: "40px", marginBottom: "10px" }}>
                        Subjects & Quizzes
                    </h1>
                    <p style={{ color: "#666" }}>
                        Explore subjects and test your knowledge with quizzes.
                    </p>
                </section>

                {/* 🟦 SUBJECT LIST */}
                {!selectedSubject && (
                    <div
                        style={{
                            backgroundColor: "#fff",
                            padding: "24px",
                            borderRadius: "16px",
                            border: "1px solid #ddd",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                        }}
                    >
                        <h2 style={{ marginBottom: "20px" }}>Available Subjects</h2>

                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(3, 1fr)",
                                gap: "20px",
                            }}
                        >
                            {subjects.map((subject) => (
                                <div
                                    key={subject.id}
                                    onClick={() => setSelectedSubject(subject)}
                                    style={{
                                        padding: "20px",
                                        borderRadius: "12px",
                                        border: "1px solid #eee",
                                        backgroundColor: "#fafafa",
                                        cursor: "pointer",
                                        textAlign: "center",
                                        transition: "0.2s",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = "#f0f2f5";
                                        e.currentTarget.style.borderColor = "#1f2d3d";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = "#fafafa";
                                        e.currentTarget.style.borderColor = "#eee";
                                    }}
                                >
                                    <h3>{subject.name}</h3>
                                    <p style={{ color: "#666" }}>
                                        {subject.quizzes.length} quizzes
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* 🟩 SUBJECT DETAIL */}
                {selectedSubject && !selectedQuiz && (
                    <div
                        style={{
                            backgroundColor: "#fff",
                            padding: "24px",
                            borderRadius: "16px",
                            border: "1px solid #ddd",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                        }}
                    >
                        <button onClick={() => setSelectedSubject(null)}>← Back</button>

                        <h2 style={{ marginTop: "10px" }}>{selectedSubject.name}</h2>

                        <h3 style={{ marginTop: "20px" }}>Quizzes</h3>

                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(2, 1fr)",
                                gap: "16px",
                                marginTop: "16px",
                            }}
                        >
                            {selectedSubject.quizzes.map((quiz) => (
                                <div
                                    key={quiz.id}
                                    onClick={() => setSelectedQuiz(quiz)}
                                    style={{
                                        padding: "16px",
                                        border: "1px solid #eee",
                                        borderRadius: "12px",
                                        cursor: "pointer",
                                        backgroundColor: "#fafafa",
                                    }}
                                >
                                    <h4>{quiz.title}</h4>
                                    <p style={{ color: "#666" }}>
                                        {quiz.questions.length} questions
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* ➕ Add quiz */}
                        <div style={{ marginTop: "24px" }}>
                            <input
                                type="text"
                                placeholder="New quiz title"
                                value={newQuizTitle}
                                onChange={(e) => setNewQuizTitle(e.target.value)}
                                style={{
                                    padding: "8px",
                                    borderRadius: "8px",
                                    border: "1px solid #ccc",
                                }}
                            />
                            <button
                                onClick={handleAddQuiz}
                                style={{
                                    marginLeft: "10px",
                                    padding: "8px 14px",
                                    borderRadius: "8px",
                                    border: "none",
                                    backgroundColor: "#1f2d3d",
                                    color: "white",
                                    cursor: "pointer",
                                }}
                            >
                                Add Quiz
                            </button>
                        </div>
                    </div>
                )}

                {/* 🟨 QUIZ VIEW */}
                {selectedQuiz && (
                    <div
                        style={{
                            backgroundColor: "#fff",
                            padding: "24px",
                            borderRadius: "16px",
                            border: "1px solid #ddd",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                        }}
                    >
                        <button
                            onClick={() => {
                                setSelectedQuiz(null);
                                setAnswers({});
                                setShowResults(false);
                            }}
                        >
                            ← Back
                        </button>

                        <h2 style={{ marginTop: "10px" }}>{selectedQuiz.title}</h2>

                        {selectedQuiz.questions.map((q) => (
                            <div
                                key={q.id}
                                style={{
                                    marginTop: "20px",
                                    padding: "16px",
                                    border: "1px solid #eee",
                                    borderRadius: "12px",
                                    backgroundColor: "#fafafa",
                                }}
                            >
                                <p style={{ fontWeight: "bold" }}>{q.text}</p>

                                {q.options.map((opt, i) => {
                                    const isSelected = answers[q.id] === opt;
                                    const isCorrect = opt === q.answer;

                                    let background = "#fff";

                                    if (showResults) {
                                        if (isCorrect) background = "#e6f7ee";
                                        else if (isSelected) background = "#ffe6e6";
                                    } else if (isSelected) {
                                        background = "#e8f1ff";
                                    }

                                    return (
                                        <div
                                            key={i}
                                            onClick={() =>
                                                !showResults && handleAnswer(q.id, opt)
                                            }
                                            style={{
                                                padding: "10px",
                                                marginTop: "6px",
                                                border: "1px solid #ddd",
                                                borderRadius: "8px",
                                                cursor: showResults ? "default" : "pointer",
                                                background,
                                            }}
                                        >
                                            {opt}
                                        </div>
                                    );
                                })}
                            </div>
                        ))}

                        {!showResults && (
                            <button
                                onClick={() => setShowResults(true)}
                                style={{
                                    marginTop: "20px",
                                    padding: "10px 16px",
                                    borderRadius: "8px",
                                    border: "none",
                                    backgroundColor: "#1f2d3d",
                                    color: "white",
                                    cursor: "pointer",
                                }}
                            >
                                Submit Answers
                            </button>
                        )}

                        {showResults && (
                            <h3 style={{ marginTop: "20px" }}>
                                Score: {getScore()} / {selectedQuiz.questions.length}
                            </h3>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Subjects;