import { ReactNode, useEffect, useRef } from "react";
import styles from "./modal.css";
import { createPortal } from "react-dom";
import { useIsMounted } from "../../../../hooks/useIsMounted";

interface IModalProps {
  children: ReactNode;
  onOutsideClick?: (event: MouseEvent) => void;
}

export function Modal({ children, onOutsideClick }: IModalProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isMounted] = useIsMounted();

  const modalRoot = document.querySelector("#modal-root");
  if (!modalRoot) return null;

  useEffect(() => {
    if (!isMounted) return;

    const handleOutsideClick = (event: MouseEvent) => {
      if (
        event.target instanceof Node &&
        !ref.current?.contains(event.target)
      ) {
        onOutsideClick?.(event);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isMounted]);

  return createPortal(
    <div className={styles.modal} ref={ref}>
      {children}
    </div>,
    modalRoot
  );
}
