import { useState } from "react";
import { supabase } from "../supabaseClient";

export default function LogoUpload({ logoUrl, onUpload }) {
  const [uploading, setUploading] = useState(false);

  async function uploadLogo(e) {
    let file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    const fileExt = file.name.split(".").pop();
    const fileName = `logo-${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("wedding_logo")
      .upload(fileName, file);

    if (uploadError) {
      alert("Greška pri uploadu loga");
      setUploading(false);
      return;
    }

    // ĆITANJE javnog URL-a
    const { data: urlData } = supabase.storage
      .from("wedding_logo")
      .getPublicUrl(fileName);

    onUpload(urlData.publicUrl);
    setUploading(false);
  }

  return (
    <div>
      {logoUrl && (
        <img
          src={logoUrl}
          alt="Logo"
          style={{ width: "120px", marginBottom: "10px", display: "block" }}
        />
      )}

      <input type="file" accept="image/*" onChange={uploadLogo} />
      {uploading && <p>Učitavam...</p>}
    </div>
  );
}
