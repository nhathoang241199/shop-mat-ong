"use client";

import { useState, type MouseEvent } from "react";
import { messengerUrl } from "@/lib/constants";

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
  const [dismissed, setDismissed] = useState(false);

  const dismiss = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setDismissed(true);
  };

  if (!href || dismissed) return null;

  return (
    <div
      className="fixed right-4 z-40"
      style={{ bottom: "calc(1.25rem + env(safe-area-inset-bottom))" }}
    >
      <div className="relative" style={{ width: 56, height: 56 }}>
        <button
          type="button"
          aria-label="Ẩn nút Messenger"
          onClick={dismiss}
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
    </div>
  );
}
