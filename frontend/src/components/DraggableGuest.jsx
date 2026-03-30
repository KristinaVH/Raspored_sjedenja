export default function DraggableGuest({ guest, onDragStart }) {
  function beginDrag() {
    onDragStart(guest.id);
  }

  return (
    <div
      draggable
      onDragStart={beginDrag}
      style={{
        padding: "10px",
        border: "2px solid #b8860b",
        borderRadius: "8px",
        background: "white",
        marginBottom: "8px",
        cursor: "grab",
        fontWeight: "600",
      }}
    >
      {guest.first_name} {guest.last_name}
    </div>
  );
}
