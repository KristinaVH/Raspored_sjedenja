import { useState } from "react";
import DragContext from "./DragContext";

export default function DragProvider({ children }) {
  const [draggingGuest, setDraggingGuest] = useState(null);

  return (
    <DragContext.Provider value={{ draggingGuest, setDraggingGuest }}>
      {children}
    </DragContext.Provider>
  );
}
