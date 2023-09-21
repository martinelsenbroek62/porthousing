import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const MobileDropdownLink = ({ title, links, menuState }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    if (!menuState) {
      setDropdownOpen(false);
    }
  }, [menuState]);

  return (
    <>
      <button
        onClick={() => {
          toggleDropdown();
        }}
        className="mobile-dropdown-container"
      >
        <span>{title}</span>
        <FontAwesomeIcon
          className={dropdownOpen ? "open" : "closed"}
          icon={faAngleDown}
        />
      </button>
      {dropdownOpen ? (
        <div className="mobile-dropdown-content-container">
          <div className="dropdown-content">
            {links.map((link, index) => (
              <Link key={index} href={link.href}>
                {link.title}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default MobileDropdownLink;
