export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div>
        <span
          style={{
            fontFamily: "Fraunces, serif",
            fontSize: "1.1rem",
            fontWeight: 600,
            color: "#2c1f0e",
            letterSpacing: "0.02em",
          }}
        >
          Mật Ong
        </span>
        <span
          style={{
            fontFamily: "Fraunces, serif",
            fontSize: "1.1rem",
            fontWeight: 300,
            color: "#c47c1a",
            letterSpacing: "0.02em",
          }}
        >
          {" "}
          Phan Thiết
        </span>
      </div>
    </div>
  );
}
