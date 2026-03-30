import "./print.css";

export default function PrintPreview({
  wedding,
  tables,
  guests,
  seating,
  onClose,
  onDownload,
}) {
  function guestsAtTable(tableId) {
    return seating
      .filter((s) => s.table_id === tableId)
      .map((s) => guests.find((g) => g.id === s.guest_id));
  }

  return (
    <div className="preview-overlay">
      <div className="preview-box">

        <h1 className="preview-title">Raspored sjedenja</h1>

{wedding.logo_url && (
  <img
    src={wedding.logo_url}
    alt="Logo"
    className="preview-logo"
  />
)}

        <h2 className="preview-names">{wedding.couple_names}</h2>
        <p className="preview-date">{wedding.wedding_date}</p>

        <hr />

        {tables.map((t) => (
          <div key={t.id} className="preview-table">
            <h3>Stol {t.name}</h3>

            <ul>
              {guestsAtTable(t.id).length === 0 && (
                <li className="preview-empty">(nema gostiju)</li>
              )}

              {guestsAtTable(t.id).map((g) => (
                <li key={g.id}>
                  {g.first_name} {g.last_name}
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="preview-buttons">
          <button onClick={onClose}>Zatvori</button>
          <button
            onClick={onDownload}
            style={{ background: "#b8860b" }}
          >
            Preuzmi PDF
          </button>
        </div>

      </div>
    </div>
  );
}
