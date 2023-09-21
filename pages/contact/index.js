import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faPhone,
  faFax,
  faEnvelope,
  faTty,
} from "@fortawesome/free-solid-svg-icons";
import ContactBlock from "../../components/ContactBlock";
import PersonCard from "../../components/PersonCard";
import Head from "next/head";
import { useRouter } from "next/router";
import FAQBlock from "../../components/FAQBlock";

async function getPageData() {
  const res = await fetch(
    `${process.env.CMS_URL}/items/pages?filter[slug]=contact&limit=1&fields=*.*.*.*`,
    {
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
  const data = await res.json();

  return data.data[0];
}

async function getPeople() {
  const res = await fetch(
    `${process.env.CMS_URL}/items/people?fields=*.*.*&filter={\"status\":{\"_eq\": \"published\"}}`,
    {
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
  const data = await res.json();
  return data.data;
}

async function getPositions() {
  const res = await fetch(
    `${process.env.CMS_URL}/items/employment_listings?fields=*.*.*&filter={\"status\":{\"_eq\": \"published\"}}`,
    {
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
  const data = await res.json();
  return data.data;
}

export async function getStaticProps() {
  const [pageData, people, jobPositions] = await Promise.all([
    getPageData(),
    getPeople(),
    getPositions(),
  ]);

  // loop through people and group by team_title.team
  const teams = {};
  people.forEach((person) => {
    if (person.team_title) {
      // loop through person.team_title and get team
      person.team_title.forEach((team) => {
        if (!teams[team.team]) {
          teams[team.team] = [];
        }
        // find team_title that matches team
        const teamTitle = person.team_title.find((t) => t.team === team.team);
        teams[team.team].push({
          ...person,
          title: teamTitle.title,
        });
      });
    }
  });

  return {
    props: {
      pageData,
      teams,
      jobPositions,
    },
    revalidate: 1,
  };
}

const index = ({ pageData, teams, jobPositions }) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{pageData.title} | Portsmouth Housing Authority</title>
        <meta name="description" content={pageData?.meta_description} />

        {/* Open Graph */}
        <meta
          property="og:url"
          content={process.env.SITE_URL + router.asPath}
          key="ogurl"
        />
        <meta
          property="og:image"
          content={
            pageData?.header_image
              ? process.env.CMS_URL + "/assets/" + pageData?.header_image.id
              : process.env.SITE_URL + "/img/portsmouth-housing_logo_horiz.png"
          }
          key="ogimage"
        />
        <meta
          property="og:site_name"
          content={"Portsmouth Housing Authority"}
          key="ogsitename"
        />
        <meta
          property="og:title"
          content={pageData.title + " - Portsmouth Housing Authority"}
          key="ogtitle"
        />
        <meta
          property="og:description"
          content={pageData?.meta_description}
          key="ogdesc"
        />
      </Head>
      <main>
        <section className="header">
          <img
            src={`${process.env.CMS_URL}/assets/${pageData?.header_image.id}?format=webp`}
            alt={pageData.header_image.description}
          />
        </section>
        <section className="main-info">
          <div className="container">
            <h1 className="primaryTitle">Contact Us</h1>
            <div className="contactContainer">
              <div style={{ marginTop: "1.5em" }} className="contactInfo">
                <div>
                  <ul
                    style={{
                      padding: 0,
                      listStyle: "none",
                      display: "grid",
                      gap: "1em",
                    }}
                  >
                    <li>
                      <a
                        href="tel:(603)436-4310"
                        style={{
                          textDecoration: "underline",
                          display: "flex",
                          flexDirection: "row",
                          gap: "0.5em",
                          alignItems: "center",
                        }}
                      >
                        <FontAwesomeIcon icon={faPhone} />
                        (603) 436-4310
                      </a>
                    </li>
                    <li>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          gap: "0.5em",
                          alignItems: "center",
                        }}
                      >
                        <FontAwesomeIcon icon={faFax} />
                        <strong>Fax:</strong> 603-436-4937
                      </div>
                    </li>
                    <li>
                      <a
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          gap: "0.5em",
                          alignItems: "center",
                        }}
                      >
                        <FontAwesomeIcon icon={faTty} />
                        <strong>TDD/TTY:</strong> 800-545-1833 ext. 825
                      </a>
                    </li>
                    <li>
                      <a
                        href="mailto:info@nh-pha.com"
                        style={{
                          textDecoration: "underline",
                          display: "flex",
                          flexDirection: "row",
                          gap: "0.5em",
                          alignItems: "center",
                        }}
                      >
                        <FontAwesomeIcon icon={faEnvelope} />
                        Send an Email
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3>Office Hours:</h3>
                  <ul
                    style={{
                      padding: 0,
                      listStyle: "none",
                      display: "grid",
                      gap: "1em",
                    }}
                  >
                    <li>
                      <strong>M:</strong> 8:30–6:00
                    </li>
                    <li>
                      <strong>T-Th:</strong> 8:30–4:30
                    </li>
                    <li>
                      <strong>F:</strong> 8:30–12:00
                    </li>
                  </ul>
                </div>
              </div>
              <div className="contactSidebar">
                <div>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2914.54651338033!2d-70.7615895!3d43.072004400000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e2bf745482b203%3A0x70ce756f78966a82!2s245%20Middle%20Street%2C%20Portsmouth%2C%20NH%2003801!5e0!3m2!1sen!2sus!4v1670096634635!5m2!1sen!2sus"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading={"lazy"}
                    referrerPolicy={"no-referrer-when-downgrade"}
                  ></iframe>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5em",
                      marginTop: "1em",
                    }}
                  >
                    <FontAwesomeIcon icon={faLocationDot} />
                    <div>
                      245 Middle St.,
                      <br />
                      Portsmouth, NH 03833
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <ContactBlock />
        <section>
          <div
            className="container"
            style={{
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h1 className="primaryTitle">Staff</h1>
            {teams.operations && teams.operations.length > 0 ? (
              <div style={{ paddingTop: "5em" }}>
                <h2>Operations</h2>
                <div
                  style={{
                    display: "flex",
                    gap: "1rem",
                    flexWrap: "wrap",
                    justifyContent: "center",
                  }}
                >
                  {teams.operations.map((person, index) => (
                    <PersonCard key={index} person={person} />
                  ))}
                </div>
              </div>
            ) : null}
            {teams?.services && teams?.services.length > 0 ? (
              <div style={{ paddingTop: "5em" }}>
                <h2>Resident Services</h2>
                <div
                  style={{
                    display: "flex",
                    gap: "1rem",
                    flexWrap: "wrap",
                    justifyContent: "center",
                  }}
                >
                  {teams?.services.map((person, index) => (
                    <PersonCard key={index} person={person} />
                  ))}
                </div>
              </div>
            ) : null}

            {teams.management && teams.management.length > 0 ? (
              <div style={{ paddingTop: "5em" }}>
                <h2>Management</h2>
                <div
                  style={{
                    display: "flex",
                    gap: "1rem",
                    flexWrap: "wrap",
                    justifyContent: "center",
                  }}
                >
                  {teams.management.map((person, index) => (
                    <PersonCard key={index} person={person} />
                  ))}
                </div>
              </div>
            ) : null}
            {teams.finance && teams.finance.length > 0 ? (
              <div style={{ paddingTop: "5em" }}>
                <h2>Finance</h2>
                <div
                  style={{
                    display: "flex",
                    gap: "1rem",
                    flexWrap: "wrap",
                    justifyContent: "center",
                  }}
                >
                  {teams.finance.map((person, index) => (
                    <PersonCard key={index} person={person} />
                  ))}
                </div>
              </div>
            ) : null}
            {teams?.maintenance && teams?.maintenance.length > 0 ? (
              <div style={{ paddingTop: "5em" }}>
                <h2>Facilities &amp; Maintenance</h2>
                <div
                  style={{
                    display: "flex",
                    gap: "1rem",
                    flexWrap: "wrap",
                    justifyContent: "center",
                  }}
                >
                  {teams?.maintenance.map((person, index) => (
                    <PersonCard key={index} person={person} />
                  ))}
                </div>
              </div>
            ) : null}
          </div>
          <div style={{ paddingTop: "5em" }} />
        </section>
        <section
          id="employment"
          style={{
            scrollMarginTop: "100px",
          }}
        >
          <div
            className="container"
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h1 className="primaryTitle">Employment</h1>
            <div style={{ paddingTop: "5em", width: "100%" }}>
              {jobPositions?.length > 0 ? (
                <div
                  style={{
                    display: "flex",
                    gap: "1rem",
                    flexDirection: "column",
                    flexWrap: "nowrap",
                    justifyContent: "center",
                  }}
                >
                  {jobPositions.map((position, index) => (
                    <FAQBlock
                      key={index}
                      question={position?.position_title}
                      answer={position?.position_description}
                    />
                  ))}
                </div>
              ) : (
                <div
                  style={{
                    paddingTop: "0",
                    padding: "1rem",
                    background: "var(--light-grey)",
                    borderRadius: "10px",
                  }}
                >
                  <span>There are no open positions at this time.</span>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default index;
