import React, { useEffect } from "react";
import styles from "./dropdown.css";
import {stopPropagation} from "../../../../utils/react/stopPropagation";

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

  useEffect(() => {
    if (isDropdownOpen) {
      document.body.addEventListener("click", handleBodyClick);
    } else {
      document.body.removeEventListener("click", handleBodyClick);
    }

    return () => document.body.removeEventListener("click", handleBodyClick);
  }, [isDropdownOpen]);

  React.useEffect(() => setIsDropdownOpen(isOpen), [isOpen]);
  React.useEffect(
    () => (isDropdownOpen ? onOpen() : onClose()),
    [isDropdownOpen]
  );

  const handleBodyClick = () => {
    setIsDropdownOpen(false);
  };

  const handleOpen = () => {
    if (isOpen === undefined) {
      setIsDropdownOpen(!isDropdownOpen);
    }
  };

  return (
    <div className={[styles.container, className].join(" ")}>
      <div onClick={stopPropagation(handleOpen)}>{button}</div>
      {isDropdownOpen && (
        <div className={styles.listContainer}>
          <div
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
