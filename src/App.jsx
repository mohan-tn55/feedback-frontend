import React, { useState } from "react";
import FeedbackForm from "./components/FeedbackForm";
import FeedbackList from "./components/FeedbackList";

const App = () => {
  const [feedbackList, setFeedbackList] = useState([]);

  const handleSubmit = ({ name, feedback }) => {
    const newEntry = {
      id: crypto.randomUUID(),
      name,
      feedback,
      timestamp: new Date(),
    };
    setFeedbackList((prev) => [newEntry, ...prev]);
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Navbar */}
      <nav
        className="sticky top-0 z-50 flex items-center justify-between px-6 sm:px-10 py-4"
        style={{
          background: "rgba(26, 26, 26, 0.85)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid #2A2A2A",
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #F97316, #EA580C)" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <span className="font-bold text-white text-base tracking-tight">FeedbackHub</span>
            <span className="hidden sm:inline text-xs ml-2 px-2 py-0.5 rounded-full" style={{ background: "rgba(249,115,22,0.1)", color: "#FB923C", border: "1px solid rgba(249,115,22,0.2)" }}>
              Cipher MuteX
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {feedbackList.length > 0 && (
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm"
              style={{ background: "rgba(249,115,22,0.1)", border: "1px solid rgba(249,115,22,0.2)" }}
            >
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
              <span style={{ color: "#FB923C" }} className="font-medium">
                {feedbackList.length} live
              </span>
            </div>
          )}
        </div>
      </nav>

      {/* Hero */}
      <div className="text-center px-6 pt-12 pb-8 sm:pt-16">
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase mb-4"
          style={{ background: "rgba(249,115,22,0.1)", border: "1px solid rgba(249,115,22,0.2)", color: "#FB923C" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse"></span>
          Intern Assignment — Full Stack Developer
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white mb-3 leading-tight">
          Your Voice,{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #F97316, #FB923C)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Amplified.
          </span>
        </h1>
        <p className="text-sm sm:text-base max-w-lg mx-auto" style={{ color: "#6B7280" }}>
          Share feedback, ideas, and insights. Every submission is captured in real-time on the board below.
        </p>
      </div>

      {/* Main Layout */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
          {/* Left: Form */}
          <div className="lg:sticky lg:top-24">
            <FeedbackForm onSubmit={handleSubmit} />

            {/* Stats Card */}
            {feedbackList.length > 0 && (
              <div
                className="mt-4 rounded-xl px-5 py-4 flex items-center justify-between"
                style={{ background: "#1F1F1F", border: "1px solid #2A2A2A" }}
              >
                <div>
                  <p className="text-xs" style={{ color: "#6B7280" }}>Total Responses</p>
                  <p className="text-2xl font-black" style={{ color: "#F97316" }}>
                    {feedbackList.length}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs" style={{ color: "#6B7280" }}>Latest from</p>
                  <p className="text-sm font-semibold text-white truncate max-w-32">
                    {feedbackList[0]?.name}
                  </p>
                </div>
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ background: "rgba(249,115,22,0.1)" }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                  </svg>
                </div>
              </div>
            )}
          </div>

          {/* Right: List */}
          <div>
            <FeedbackList feedbackList={feedbackList} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer
        className="text-center py-6 text-xs"
        style={{ color: "#3A3A3A", borderTop: "1px solid #222222" }}
      >
        Built with React + Vite &nbsp;·&nbsp; Cipher MuteX Internship Assignment &nbsp;·&nbsp;{" "}
        <span style={{ color: "#F97316" }}>Full Stack Developer Intern</span>
      </footer>
    </div>
  );
};

export default App;
