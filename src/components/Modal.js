import React, { useEffect } from "react";
import ReactDOM from "react-dom";

export default function Modal({
  children,
  isOpen = false,
  className = "root-modal",
  el = "div",
}) {
  const [container] = React.useState(document.createElement(el));

  useEffect(() => {
    document.body.appendChild(container);
    container.classList.add(className);
    return () => {
      document.body.removeChild(container);
    };
  }, [container, className]);

  return isOpen && ReactDOM.createPortal(children, container);
}
