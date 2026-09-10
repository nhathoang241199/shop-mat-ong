import { messengerUrl, zaloUrl } from "@/lib/constants";

export function ContactFloatButtons() {
  return (
    <div className="fixed bottom-5 right-4 z-40 flex flex-col gap-3 items-end">
      <a
        href={messengerUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat Messenger"
        title="Messenger"
        className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105"
        style={{ background: "linear-gradient(135deg, #0084ff 0%, #00c6ff 100%)" }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff" aria-hidden>
          <path d="M12 2C6.36 2 2 6.13 2 11.3c0 2.91 1.43 5.5 3.66 7.2V22l3.35-1.84c.94.26 1.94.4 2.99.4 5.64 0 10.2-4.13 10.2-9.26C22.2 6.13 17.64 2 12 2zm1.01 12.47-2.6-2.77-5.08 2.77 5.58-5.92 2.66 2.77 5.02-2.77-5.58 5.92z" />
        </svg>
      </a>

      <a
        href={zaloUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat Zalo"
        title="Zalo"
        className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105"
        style={{ background: "#0068ff" }}
      >
        <svg width="26" height="26" viewBox="0 0 50 50" fill="#fff" aria-hidden>
          <path d="M25 4C13.4 4 4 12.7 4 23.4c0 5.9 3 11.1 7.7 14.5v6.7l7-3.8c2 .5 4.1.8 6.3.8 11.6 0 21-8.7 21-19.4S36.6 4 25 4zm6.8 26.3c-4.1 0-7.5-1.1-10.6-3.4l-1.1-.8 1.9-2.6 1 .7c2.5 1.7 5.1 2.6 7.8 2.6 2.3 0 3.6-1 3.6-2.4 0-1.5-1.1-2.2-4.3-3.3-4.1-1.4-6.9-3.3-6.9-7.1 0-4 3.4-6.7 8.5-6.7 3.3 0 6.2.9 8.9 2.7l1.1.8-1.8 2.6-1-.7c-2.2-1.4-4.5-2.1-7.1-2.1-2.3 0-3.5 1-3.5 2.3 0 1.5 1.3 2.2 4.7 3.4 4.3 1.5 6.8 3.5 6.8 7.2 0 4.2-3.5 7.1-9 7.1z" />
        </svg>
      </a>
    </div>
  );
}
