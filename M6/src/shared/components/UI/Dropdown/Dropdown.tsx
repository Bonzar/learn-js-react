import React, { useEffect } from "react";
import styles from "./dropdown.css";
import { stopPropagation } from "../../../../utils/react/stopPropagation";

interface IDropdownProps {
  className?: string;
  button: React.ReactNode;
  children: React.ReactNode;
  isOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

const NOOP = () => {};

export function Dropdown({
  button,
  children,
  className,
  isOpen,
  onOpen = NOOP,
  onClose = NOOP,
}: IDropdownProps) {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(isOpen);

  useEffect(() => setIsDropdownOpen(isOpen), [isOpen]);

  useEffect(() => {
    const handleBodyClick = () => {
      setIsDropdownOpen(false);
    };

    if (isDropdownOpen) {
      document.body.addEventListener("click", handleBodyClick);
    } else {
      document.body.removeEventListener("click", handleBodyClick);
    }

    return () => document.body.removeEventListener("click", handleBodyClick);
  }, [isDropdownOpen]);

  useEffect(() => {
    if (isDropdownOpen !== undefined) {
      if (isDropdownOpen) {
        onOpen();
      } else {
        onClose();
      }
    }
  }, [isDropdownOpen]);

  const handleOpen = () => {
    if (isOpen === undefined) {
      setIsDropdownOpen(!isDropdownOpen);
    }
  };

  return (
    <div
      data-testid="dropdown"
      className={[styles.container, className].filter(Boolean).join(" ")}
    >
      <div onClick={stopPropagation(handleOpen)}>{button}</div>
      {isDropdownOpen && (
        <div data-testid="list-container" className={styles.listContainer}>
          <div
            data-testid="list"
            className={styles.list}
            onClick={(e) => {
              e.stopPropagation();
              setIsDropdownOpen(false);
            }}
          >
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
