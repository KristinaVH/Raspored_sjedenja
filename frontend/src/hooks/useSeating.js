import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

export default function useSeating() {
  const [tables, setTables] = useState([]);
  const [guests, setGuests] = useState([]);
  const [seating, setSeating] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadAll() {
    setLoading(true);

    const [t, g, s] = await Promise.all([
      supabase.from("tables").select("*"),
      supabase.from("guests").select("*"),
      supabase.from("seating").select("*"),
    ]);

    setTables(t.data || []);
    setGuests(g.data || []);
    setSeating(s.data || []);

    setLoading(false);
  }

  async function moveGuest(guestId, tableId) {
    // Save undo entry
    await fetch("/.netlify/functions/seating", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${
          supabase.auth.getSession().data?.session?.access_token
        }`,
      },
      body: JSON.stringify({ guest_id: guestId, table_id: tableId }),
    });

    loadAll();
  }

  async function undo() {
    await fetch("/.netlify/functions/undo", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${
          supabase.auth.getSession().data?.session?.access_token
        }`,
      },
    });

    loadAll();
  }

  useEffect(() => {
    loadAll();
  }, []);

  return {
    tables,
    guests,
    seating,
    loading,
    moveGuest,
    undo,
    reload: loadAll,
  };
}
