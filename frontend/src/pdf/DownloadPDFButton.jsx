import { supabase } from "../supabaseClient";

export default function DownloadPDFButton() {
  async function downloadPdf() {
    const token = supabase.auth.getSession().data?.session?.access_token;

    const res = await fetch("/.netlify/functions/exportPdf", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "raspored.pdf";
    link.click();
  }

  return (
    <button onClick={downloadPdf}>Preuzmi PDF</button>
  );
}
