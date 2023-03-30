import React, { ReactNode, useEffect, useRef, useState } from "react";
import styles from "./dropdown.css";
import { stopPropagation } from "../../../../utils/react/stopPropagation";
import { Modal } from "../Modal";
import { getCoords } from "../../../../utils/js/getCoords";

interface IDropdownButtonProps {
  onClick: (event: React.MouseEvent) => void;
  setButtonRef: (a: HTMLElement | null) => void;
}

interface IDropdownProps {
  className?: string;
  button: (props: IDropdownButtonProps) => React.ReactElement;
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

  const [anchorButtonEl, setAnchorButtonEl] = useState<HTMLElement | null>(
    null
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => setIsDropdownOpen(isOpen), [isOpen]);

  useEffect(() => {
    if (!isDropdownOpen) {
      return;
    }

    const dropdownEl = dropdownRef.current;

    if (!anchorButtonEl || !dropdownEl) {
      return;
    }

    const dropdownCoors = getCoords(dropdownEl);
    const buttonCoors = getCoords(anchorButtonEl);

    setPosition({
      top: buttonCoors.top + buttonCoors.height,
      left: buttonCoors.left + buttonCoors.width / 2 - dropdownCoors.width / 2,
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

  const handleBtnClick = () => {
    if (isOpen === undefined) {
      setIsDropdownOpen(!isDropdownOpen);
    }
  };

  return (
    <>
      {button({
        onClick: stopPropagation(handleBtnClick),
        setButtonRef: (el: HTMLElement | null) => setAnchorButtonEl(el),
      })}
      {isDropdownOpen && (
        <Modal onOutsideClick={stopPropagation(() => setIsDropdownOpen(false))}>
          <div
            className={styles.dropdown}
            onClick={stopPropagation(() => setIsDropdownOpen(false))}
            style={{ ...position }}
            ref={dropdownRef}
          >
            {children}
          </div>
        </Modal>
      )}
    </>
  );
}
