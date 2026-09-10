"use client";

import { useState, type MouseEvent } from "react";
import { messengerUrl, zaloUrl } from "@/lib/constants";

/** Icon Messenger — cùng path với thuê máy ảnh Long Khánh. */
function MessengerIcon({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="currentColor" aria-hidden>
      <path d="M18 2C9.716 2 3 8.045 3 15.418c0 4.348 2.167 8.22 5.563 10.745L6.5 34l7.318-2.562C15.214 31.801 16.578 32 18 32c8.284 0 15-6.045 15-13.418S26.284 2 18 2zm1.616 17.848-3.924-4.185-7.676 4.185 6.485-6.885 3.924 4.185 7.676-4.185-6.485 6.885z" />
    </svg>
  );
}

export function ContactFloatButtons() {
  const href = messengerUrl();
  const [messengerDismissed, setMessengerDismissed] = useState(false);

  const dismissMessenger = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setMessengerDismissed(true);
  };

  return (
    <div
      className="fixed right-4 z-40 flex flex-col gap-3 items-end"
      style={{ bottom: "calc(1.25rem + env(safe-area-inset-bottom))" }}
    >
      {!messengerDismissed && href ? (
        <div className="relative" style={{ width: 56, height: 56 }}>
          <button
            type="button"
            aria-label="Ẩn nút Messenger"
            onClick={dismissMessenger}
            className="absolute flex items-center justify-center rounded-full"
            style={{
              top: -6,
              right: -6,
              width: 22,
              height: 22,
              background: "#374151",
              color: "#fff",
              zIndex: 1,
            }}
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </button>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat Messenger"
            title="Messenger"
            className="flex items-center justify-center rounded-full shadow-md transition-transform"
            style={{
              width: 56,
              height: 56,
              background: "#c47c1a",
              color: "#fff",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.06)";
              e.currentTarget.style.opacity = "0.92";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.opacity = "1";
            }}
          >
            <MessengerIcon size={32} />
          </a>
        </div>
      ) : null}

      <a
        href={zaloUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat Zalo"
        title="Zalo"
        className="flex items-center justify-center rounded-full shadow-md transition-transform hover:scale-105"
        style={{ width: 56, height: 56, background: "#0068ff", color: "#fff" }}
      >
        <svg width="28" height="28" viewBox="0 0 50 50" fill="currentColor" aria-hidden>
          <path d="M25 4C13.4 4 4 12.7 4 23.4c0 5.9 3 11.1 7.7 14.5v6.7l7-3.8c2 .5 4.1.8 6.3.8 11.6 0 21-8.7 21-19.4S36.6 4 25 4zm6.8 26.3c-4.1 0-7.5-1.1-10.6-3.4l-1.1-.8 1.9-2.6 1 .7c2.5 1.7 5.1 2.6 7.8 2.6 2.3 0 3.6-1 3.6-2.4 0-1.5-1.1-2.2-4.3-3.3-4.1-1.4-6.9-3.3-6.9-7.1 0-4 3.4-6.7 8.5-6.7 3.3 0 6.2.9 8.9 2.7l1.1.8-1.8 2.6-1-.7c-2.2-1.4-4.5-2.1-7.1-2.1-2.3 0-3.5 1-3.5 2.3 0 1.5 1.3 2.2 4.7 3.4 4.3 1.5 6.8 3.5 6.8 7.2 0 4.2-3.5 7.1-9 7.1z" />
        </svg>
      </a>
    </div>
  );
}
