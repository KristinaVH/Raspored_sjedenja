import { createContext } from "react";

const DragContext = createContext({
  draggingGuest: null,
  setDraggingGuest: () => {},
});

export default DragContext;
