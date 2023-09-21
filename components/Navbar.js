import React, { useEffect, useState } from "react";
import DropdownLink from "./DropdownLink";
import MobileDropdownLink from "./MobileDropdownLink";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // close menu when route changes
    setMenuOpen(false);
  }, [router.pathname]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo-container">
          <Link href="/">
            <img
              src={"/img/portsmouth-housing_logo_horiz.png"}
              alt="PHA logo"
            />
          </Link>
        </div>
        <div className="desktop-navbar-links">
          <div className="links-container">
            <DropdownLink
              title="Housing"
              links={[
                { title: "Properties", href: "/housing/properties" },
                { title: "Voucher Program", href: "/housing/voucher-program" },
                { title: "For Landlords", href: "/for-landlords" },
              ]}
            />
            <DropdownLink
              title="For Applicants"
              links={[
                { title: "Apply Online", href: "/applicants#apply" },
                { title: "Applicant FAQs", href: "/applicants#faqs" },
              ]}
            />
            <DropdownLink
              title="For Residents"
              links={[
                {
                  title: "Pay Rent",
                  href: "https://portal.rentpayment.com/pay/login.html",
                },
                { title: "Resident Info", href: "/residents" },
                { title: "Resident Services", href: "/residents#services" },
                { title: "Resident FAQs", href: "/residents#faqs" },
              ]}
            />
            <DropdownLink
              title="About"
              links={[
                { title: "Our History", href: "/about" },
                { title: "News", href: "/about#articles" },
                { title: "Leadership", href: "/leadership" },
                { title: "Reports & Projects", href: "/reports-projects" },
                { title: "Employment", href: "/contact#employment" },
              ]}
            />
            <div className="contact-block">
              <Link href="/contact">Contact</Link>
              <a
                target="_blank"
                href="https://portal.rentpayment.com/pay/login.html"
                className="btn btn-accent"
              >
                Pay Rent
              </a>
            </div>
          </div>
        </div>
        <div className="mobile-navbar-links">
          <button
            onClick={() => {
              toggleMenu();
            }}
            className="btn btn-primary"
          >
            {menuOpen ? (
              <FontAwesomeIcon icon={faClose} />
            ) : (
              <FontAwesomeIcon icon={faBars} />
            )}
          </button>
          <a
            target="_blank"
            href="https://portal.rentpayment.com/pay/login.html"
            className="btn btn-accent"
          >
            Pay Rent
          </a>
        </div>
      </div>
      <div className={menuOpen ? "mobile-menu active" : "mobile-menu"}>
        <div className="mobile-menu-links">
          <MobileDropdownLink
            menuState={menuOpen}
            title="Housing"
            links={[
              { title: "Properties", href: "/housing/properties" },
              { title: "Voucher Program", href: "/housing/voucher-program" },
              { title: "For Landlords", href: "/for-landlords" },
            ]}
          />
          <MobileDropdownLink
            menuState={menuOpen}
            title="For Applicants"
            links={[
              { title: "Apply Online", href: "/applicants#apply" },
              { title: "Applicant FAQs", href: "/applicants#faqs" },
            ]}
          />
          <MobileDropdownLink
            menuState={menuOpen}
            title="For Residents"
            links={[
              {
                title: "Pay Rent",
                href: "https://portal.rentpayment.com/pay/login.html",
              },
              { title: "Resident Info", href: "/residents" },
              { title: "Resident Services", href: "/residents#services" },
              { title: "Resident FAQs", href: "/residents#faqs" },
            ]}
          />
          <MobileDropdownLink
            menuState={menuOpen}
            title="About"
            links={[
              { title: "Our History", href: "/about" },
              { title: "News", href: "/about#articles" },
              { title: "Leadership", href: "/leadership" },
              { title: "Reports & Projects", href: "/reports-projects" },
              { title: "Employment", href: "/contact#employment" },
            ]}
          />
          <Link
            onClick={() => toggleMenu()}
            className="mobile-dropdown-container"
            href="/contact"
          >
            Contact
          </Link>
          <button className="btn btn-accent">Pay Rent</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
