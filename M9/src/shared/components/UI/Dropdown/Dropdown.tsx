import React, { ReactNode, useEffect, useState } from "react";
import styles from "./dropdown.css";
import { stopPropagation } from "../../../../utils/react/stopPropagation";
import { Modal } from "../Modal";

interface IDropdownProps {
  button: React.ReactNode;
  children: ReactNode;
  isOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

export function Dropdown({
  button,
  children,
  isOpen,
  onOpen,
  onClose,
}: IDropdownProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(isOpen);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [buttonEl, setButtonEl] = useState<HTMLDivElement | null>(
    null
  );

  useEffect(() => setIsDropdownOpen(isOpen), [isOpen]);

  useEffect(() => {
    if (!isDropdownOpen || !buttonEl) {
      return;
    }

    const buttonCoors = buttonEl.getBoundingClientRect();

    const LEFT_SPACE = 130;
    const TOP_SPACE = 30;

    setPosition({
      top: buttonCoors.top + TOP_SPACE,
      left: buttonCoors.left - LEFT_SPACE,
    });
  }, [isDropdownOpen]); 

  useEffect(() => {
    if (isDropdownOpen !== undefined) {
      if (isDropdownOpen) {
        onOpen?.();
      } else {
        onClose?.();
      }
    }
  }, [isDropdownOpen]);
  
  const handleBtnClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setButtonEl(e.currentTarget);

    if (isOpen === undefined) {
      setIsDropdownOpen(!isDropdownOpen);
    }
  };

  return (
    <>
      <div onClick={handleBtnClick}>{button}</div>
      {isDropdownOpen && (
        <Modal onOutsideClick={stopPropagation(() => setIsDropdownOpen(false))}>
          <div
            data-testid="dropdown"
            className={styles.dropdown}
            onClick={stopPropagation(() => setIsDropdownOpen(false))}
            style={{ ...position }}
          >
            {children}
          </div>
        </Modal>
      )}
    </>
  );
}
