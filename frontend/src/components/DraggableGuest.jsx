export default function DraggableGuest({ guest, onDragStart }) {
  function beginDrag() {
    onDragStart(guest.id);
  }

  return (
    <div
      draggable
      onDragStart={beginDrag}
      style={{
        padding: "8px 10px",
        border: "1px solid #ccc",
        background: "white",
        borderRadius: "6px",
        marginBottom: "6px",
        cursor: "grab",
      }}
    >
      {guest.first_name} {guest.last_name}
    </div>
  );
}
