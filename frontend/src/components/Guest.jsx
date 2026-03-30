export default function Guest({ guest }) {
  return (
    <div
      style={{
        padding: "6px 10px",
        border: "1px solid #ccc",
        borderRadius: "6px",
        background: "white",
        marginBottom: "6px",
      }}
    >
      {guest.first_name} {guest.last_name}
    </div>
  );
}
