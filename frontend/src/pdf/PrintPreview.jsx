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

        {/* NASLOV */}
        <h1 className="preview-title">Raspored sjedenja</h1>

        {/* LOGO */}
        {wedding.logo_url && (
          <img
            src={wedding.logo_url}
            alt="Logo"
            className="preview-logo"
          />
        )}

        {/* IMENA PARA I DATUM */}
        <h2 className="preview-names">{wedding.couple_names}</h2>
        <p className="preview-date">{wedding.wedding_date}</p>

        <hr />

        {/* STOL PO STOL */}
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

        {/* GUMBI */}
        <div className="preview-buttons">
          <button onClick={onClose}>Zatvori</button>
