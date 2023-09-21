import PrimarySection from "../../components/PrimarySection";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import styles from "../../styles/Home.module.css";
import PersonCard from "../../components/PersonCard";
import YouTubeEmbed from "../../components/YouTubeEmbed";
import Head from "next/head";
import { useRouter } from "next/router";

async function getPageData() {
  const res = await fetch(
    `${process.env.CMS_URL}/items/pages?filter[slug]=leadership&limit=1&fields=*.*.*.*`,
    {
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
  const data = await res.json();

  return data.data[0];
}

async function getAdditionalPageData() {
  const res = await fetch(
    `${process.env.CMS_URL}/items/leadership_page?fields=*.*.*.*`,
    {
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
  const data = await res.json();
  console.log(data);

  return data.data;
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

export async function getStaticProps() {
  const [pageData, people, additionalPageData] = await Promise.all([
    getPageData(),
    getPeople(),
    getAdditionalPageData(),
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
      additionalPageData,
    },
    revalidate: 1,
  };
}

const index = ({ pageData, teams, additionalPageData }) => {
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
        <PrimarySection
          title="Leadership"
          description={pageData?.main_text}
          customSidebar={
            <div
              className="custom-sidebar-container"
              style={{ display: "grid", marginTop: "2.5em" }}
            >
              <div
                className="leadership-portrait"
                style={{
                  position: "relative",
                  borderRadius: "10px",
                  overflow: "hidden",
                }}
              >
                <img
                  style={{
                    objectFit: "cover",
                    width: "100%",
                    height: "100%",
                  }}
                  src={
                    `${process.env.CMS_URL}/assets/${additionalPageData?.craig_photo.id}` ||
                    null
                  }
                  alt="Leadership"
                />
              </div>
              <div style={{ color: "var(--primary)" }}>
                <h2 style={{ marginBottom: 0 }}>
                  <strong>Executive Director</strong>
                </h2>
                <p style={{ marginTop: 0 }}>Craig W. Welch</p>
                <Link
                  href="mailto:craigwelch@nh-pha.com"
                  style={{ textDecoration: "underline" }}
                >
                  <FontAwesomeIcon icon={faEnvelope} />
                  <span style={{ marginLeft: ".75em" }}>Email Craig</span>
                </Link>
              </div>
            </div>
          }
        />
        {additionalPageData?.video_embed_link ? (
          <section className={styles.tedVideo}>
            <h2
              className="container"
              style={{
                fontSize: "2em",
                textAlign: "center",
                color: "var(--primary)",
                marginBottom: "1em",
              }}
            >
              {additionalPageData?.video_title || null}
            </h2>
            <YouTubeEmbed
              embedLink={additionalPageData?.video_embed_link || null}
              thumbnail={
                `${process.env.CMS_URL}/assets/${additionalPageData?.video_thumbnail.id}` ||
                null
              }
            />
            <div
              className="container"
              dangerouslySetInnerHTML={{
                __html: additionalPageData?.video_description || null,
              }}
            />
          </section>
        ) : null}
        <section className={styles.boardComm}>
          <div className="container">
            <div
              dangerouslySetInnerHTML={{
                __html: additionalPageData?.board_of_commissioners_info || null,
              }}
            />
            <h3>Current Portsmouth Housing Authority Commissioners:</h3>
            <div className={styles.boardMembers}>
              {teams.commissioners.map((person, index) => (
                <PersonCard key={index} person={person} />
              ))}
            </div>
            <div
              dangerouslySetInnerHTML={{
                __html: additionalPageData?.boc_meeting_schedule || null,
              }}
            />
          </div>
        </section>

        <section style={{ paddingBottom: "10em" }} className={styles.boardComm}>
          <div className="container">
            <div
              dangerouslySetInnerHTML={{
                __html: additionalPageData?.board_of_directors_info || null,
              }}
            />
            <h3>Current PHA Housing Development, Ltd. Directors:</h3>
            {teams.directors && teams.directors.length > 0 ? (
              <div className={styles.boardMembers}>
                {teams.directors.map((person, index) => (
                  <PersonCard key={index} person={person} />
                ))}
              </div>
            ) : null}
          </div>
        </section>
      </main>
    </>
  );
};

export default index;
