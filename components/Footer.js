import Link from "next/link";

const Footer = () => {
  return (
    <section className="footer">
      <div className="container">
        <div className="footer-links">
          <div className="footer-link-group">
            <h3 className="footer-link-group-title">Housing</h3>
            <Link href="/housing/properties">Properties</Link>
            <Link href="/housing/voucher-program">Voucher Program</Link>
            <Link href="/for-landlords">For Landlords</Link>
          </div>
          <div className="footer-link-group">
            <h3 className="footer-link-group-title">For Applicants</h3>
            <Link href="/applicants#apply">Apply Online</Link>
            <Link href="/applicants#faqs">Applicant FAQs</Link>
          </div>
          <div className="footer-link-group">
            <h3 className="footer-link-group-title">For Residents</h3>
            <Link href="https://portal.rentpayment.com/pay/login.html">
              Pay Rent
            </Link>
            <Link href="/residents">Resident Info</Link>
            <Link href="/residents#services">Resident Services</Link>
            <Link href="/residents#faqs">Resident FAQs</Link>
          </div>
          <div className="footer-link-group">
            <h3 className="footer-link-group-title">About</h3>
            <Link href="/about">Our History</Link>
            <Link href="/about#articles">News</Link>
            <Link href="/leadership">Leadership</Link>
            <Link href="/reports-projects">Reports & Projects</Link>
          </div>
          <div className="footer-link-group">
            <h3 className="footer-link-group-title">Legal</h3>
            <Link href="/privacy-policy">Privacy Policy</Link>
          </div>
        </div>

        <div className="footer-mission">
          <p>
            The mission of the Portsmouth Housing Authority is to be the leader
            in making quality affordable housing available for low and moderate
            income members of the community and to accomplish this mission by a
            fiscally responsible, creative organization committed to excellence.
          </p>
        </div>

        <div className="footer-detail">
          <div className="logo-container">
            <Link href="/">
              <img
                src="/img/equal-housing.png"
                alt="Equal housing logo"
                width={50}
                height={50}
                quality={100}
              />
            </Link>

            <img
              src="/img/wheelchair.png"
              alt="Equal housing logo"
              width={40}
              height={40}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
