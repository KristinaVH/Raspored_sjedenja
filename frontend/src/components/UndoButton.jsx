export default function UndoButton({ onUndo }) {
  return (
    <button
      onClick={onUndo}
      style={{
        marginTop: "20px",
        background: "#444",
      }}
    >
      Vrati zadnju promjenu
    </button>
  );
}
