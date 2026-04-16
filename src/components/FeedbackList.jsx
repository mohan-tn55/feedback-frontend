import React, { useState } from "react";

const ITEMS_PER_PAGE = 5;

const formatTime = (date) => {
  const now = new Date();
  const diff = Math.floor((now - date) / 1000);
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
};

const getInitials = (name) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const avatarColors = [
  "#EA580C", "#C2410C", "#9A3412",
  "#D97706", "#B45309", "#92400E",
];

const getAvatarColor = (name) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash += name.charCodeAt(i);
  return avatarColors[hash % avatarColors.length];
};

const FeedbackCard = ({ entry, index }) => {
  const [expanded, setExpanded] = useState(false);
  const isLong = entry.feedback.length > 180;
  const displayText = isLong && !expanded
    ? entry.feedback.slice(0, 180) + "..."
    : entry.feedback;

  return (
    <div className="feedback-card rounded-xl p-5">
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div
          className="rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
          style={{
            background: getAvatarColor(entry.name),
            width: "42px",
            height: "42px",
            fontSize: "0.85rem",
          }}
        >
          {getInitials(entry.name)}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <h3 className="font-semibold text-white text-sm truncate">{entry.name}</h3>
            <span className="text-xs flex-shrink-0" style={{ color: "#5A5A5A" }}>
              {formatTime(entry.timestamp)}
            </span>
          </div>

          <p className="text-sm leading-relaxed" style={{ color: "#B0B0B0" }}>
            {displayText}
            {isLong && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="ml-1 font-medium cursor-pointer"
                style={{ color: "#F97316" }}
              >
                {expanded ? "Show less" : "Read more"}
              </button>
            )}
          </p>
        </div>
      </div>

      {/* Bottom tag */}
      <div className="mt-4 pt-3 flex items-center justify-between" style={{ borderTop: "1px solid #2A2A2A" }}>
        <span className="tag-badge text-xs px-2.5 py-1 rounded-full font-medium">
          #{index + 1} Feedback
        </span>
        <div className="flex items-center gap-1">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#5A5A5A" strokeWidth="2">
            <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z"/>
            <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
          </svg>
          <span className="text-xs" style={{ color: "#5A5A5A" }}>Logged</span>
        </div>
      </div>
    </div>
  );
};

const FeedbackList = ({ feedbackList }) => {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = feedbackList.filter(
    (entry) =>
      entry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.feedback.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Section Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <span className="logo-dot"></span>
            <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "#F97316" }}>
              All Responses
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white">Feedback Board</h2>
        </div>

        {feedbackList.length > 0 && (
          <div className="stat-pill rounded-full px-4 py-1.5 flex items-center gap-2">
            <span className="text-sm font-bold" style={{ color: "#F97316" }}>
              {feedbackList.length}
            </span>
            <span className="text-xs" style={{ color: "#9CA3AF" }}>
              {feedbackList.length === 1 ? "response" : "responses"}
            </span>
          </div>
        )}
      </div>

      {/* Search Bar (only if entries exist) */}
      {feedbackList.length > 2 && (
        <div
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl"
          style={{ background: "#222222", border: "1px solid #2E2E2E" }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5A5A5A" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="M21 21l-4.35-4.35" strokeLinecap="round"/>
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search by name or message..."
            className="bg-transparent text-sm flex-1 outline-none"
            style={{ color: "#FFFFFF" }}
          />
          {searchQuery && (
            <button
              onClick={() => { setSearchQuery(""); setPage(1); }}
              className="cursor-pointer"
              style={{ color: "#5A5A5A" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" strokeLinecap="round"/>
                <line x1="6" y1="6" x2="18" y2="18" strokeLinecap="round"/>
              </svg>
            </button>
          )}
        </div>
      )}

      {/* Feedback Cards or Empty State */}
      {feedbackList.length === 0 ? (
        <div
          className="rounded-2xl p-12 flex flex-col items-center justify-center text-center"
          style={{ background: "#1F1F1F", border: "1px dashed #2E2E2E" }}
        >
          <div className="empty-state-icon mb-4">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
          </div>
          <h3 className="font-semibold mb-1" style={{ color: "#5A5A5A" }}>No feedback yet</h3>
          <p className="text-sm" style={{ color: "#3A3A3A" }}>Be the first to share your thoughts!</p>
        </div>
      ) : filtered.length === 0 ? (
        <div
          className="rounded-2xl p-10 flex flex-col items-center justify-center text-center"
          style={{ background: "#1F1F1F", border: "1px dashed #2E2E2E" }}
        >
          <h3 className="font-semibold mb-1" style={{ color: "#5A5A5A" }}>No results found</h3>
          <p className="text-sm" style={{ color: "#3A3A3A" }}>Try a different search term.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {paginated.map((entry, i) => (
            <FeedbackCard
              key={entry.id}
              entry={entry}
              index={(page - 1) * ITEMS_PER_PAGE + i}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1.5 rounded-lg text-sm font-medium cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            style={{
              background: page === 1 ? "#222222" : "#2A2A2A",
              border: "1px solid #333333",
              color: "#9CA3AF",
            }}
          >
            ← Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className="w-8 h-8 rounded-lg text-sm font-semibold cursor-pointer transition-all"
              style={{
                background: p === page ? "linear-gradient(135deg, #F97316, #EA580C)" : "#222222",
                border: p === page ? "none" : "1px solid #333333",
                color: p === page ? "#FFFFFF" : "#9CA3AF",
              }}
            >
              {p}
            </button>
          ))}

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 py-1.5 rounded-lg text-sm font-medium cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            style={{
              background: page === totalPages ? "#222222" : "#2A2A2A",
              border: "1px solid #333333",
              color: "#9CA3AF",
            }}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
};

export default FeedbackList;
