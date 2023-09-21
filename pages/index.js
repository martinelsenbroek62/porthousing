import styles from "../styles/Home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTicket,
  faBuildingUser,
  faArrowUpRightFromSquare,
  faArrowRight,
  faHouseUser,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import ArticleSlider from "../components/ArticleSlider";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";

async function getSortedArticles() {
  // gets articles in ascending sort order
  const res = await fetch(
    `${process.env.CMS_URL}/items/Articles?fields=*.*.*&filter[status]=published&sort=sort&limit=5`,
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
  const sortedArticles = await getSortedArticles();
  return {
    props: {
      sortedArticles,
    },
    revalidate: 1,
  };
}

export default function HomePage({ sortedArticles }) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Portsmouth Housing Authority</title>
        <meta
          name="description"
          content="Portsmouth Housing is made up of two entities: the Portsmouth Housing Authority (PHA) and an affiliated nonprofit organization, PHA Housing Development LTD."
        />

        {/* Open Graph */}
        <meta
          property="og:url"
          content={process.env.SITE_URL + router.asPath}
          key="ogurl"
        />
        <meta
          property="og:image"
          content={
            process.env.SITE_URL + "/img/portsmouth-housing_logo_horiz.png"
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
          content={"Portsmouth Housing Authority"}
          key="ogtitle"
        />
        <meta
          property="og:description"
          content={
            "Portsmouth Housing is made up of two entities: the Portsmouth Housing Authority (PHA) and an affiliated nonprofit organization, PHA Housing Development LTD."
          }
          key="ogdesc"
        />
      </Head>

      <main>
        <section className={styles.mainSection}>
          <Image
            src="/img/home-cover.jpeg"
            alt="Main section lead image"
            className={styles.mainSectionBgImage}
            placeholder="blur"
            blurDataURL="/img/home-cover.jpeg"
            layout="fill"
          />
          <div className="container" style={{ paddingTop: "4rem" }}>
            <div className={styles.mainContainer}>
              <div className={styles.infoContainer}>
                <div style={{ alignSelf: "center" }}>
                  <h1 className={styles.mainHeadline}>
                    Portsmouth Housing Authority
                  </h1>
                  <p>
                    Since 1953, we’ve been making Portsmouth’s housing more
                    affordable for lower-income individuals.
                  </p>
                </div>

                <div className={styles.newsSliderContainer}>
                  {sortedArticles && sortedArticles.length > 0 ? (
                    <ArticleSlider articles={sortedArticles} />
                  ) : null}
                </div>
                <Link
                  href="/about#articles"
                  style={{
                    color: "var(--primary)",
                    marginTop: "2rem",
                    display: "flex",
                    gap: "1rem",
                    alignItems: "center",
                    padding: "0.75rem 1rem",
                    width: "fit-content",
                    background: "#fff",
                    borderRadius: "5px",
                  }}
                >
                  <span>Latest News</span>
                  <FontAwesomeIcon
                    style={{
                      color: "var(--primary)",
                    }}
                    icon={faArrowRight}
                  />
                </Link>
              </div>
            </div>

            {/* <img style={{width:'10vw', height:'10vw', position:'absolute', left:'-5vw', top:'8em', zIndex:0}} src={"/svg/accent-circle.svg"} alt="" />
            <img style={{width:'15vw', height:'15vw', position:'absolute', right:'-5vw', bottom:'calc(50% - 15vw / 2)', zIndex:0}} src={"/svg/accent-circle.svg"} alt="" /> */}
          </div>
        </section>

        <section className={styles.mainLinks}>
          <div className="container">
            <h2
              style={{
                fontSize: "2em",
                textAlign: "center",
                color: "var(--primary)",
                marginBottom: "2em",
              }}
            >
              Find Your Housing Solution
            </h2>
            <div className={styles.mainLinksContainer}>
              <Link href="/applicants" className={styles.mainLinkBox}>
                <div className={styles.linkBoxContent}>
                  <FontAwesomeIcon icon={faTicket} />
                  <h3 style={{ marginBottom: 0, marginTop: "0.25em" }}>
                    Am I Eligible for Housing?
                  </h3>
                </div>
                <div
                  className="btn btn-accent"
                  style={{
                    position: "absolute",
                    bottom: "-1em",
                    padding: "1em",
                  }}
                >
                  <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                </div>
              </Link>

              <Link
                href="/housing/voucher-program"
                className={styles.mainLinkBox}
              >
                <div className={styles.linkBoxContent}>
                  <FontAwesomeIcon icon={faBuildingUser} />
                  <h3 style={{ marginBottom: 0, marginTop: "0.25em" }}>
                    Housing Choice Voucher Program
                  </h3>
                </div>
                <div
                  className="btn btn-accent"
                  style={{
                    position: "absolute",
                    bottom: "-1em",
                    padding: "1em",
                  }}
                >
                  <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                </div>
              </Link>

              <Link
                href="https://portal.rentpayment.com/pay/login.html"
                className={styles.mainLinkBox}
              >
                <div className={styles.linkBoxContent}>
                  <FontAwesomeIcon icon={faHouseUser} />
                  <h3 style={{ marginBottom: 0, marginTop: "0.25em" }}>
                    Existing Tenants
                  </h3>
                </div>
                <div
                  className="btn btn-accent"
                  style={{
                    position: "absolute",
                    bottom: "-1em",
                    padding: "1em",
                  }}
                >
                  <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                </div>
              </Link>
              {/* 
              <Link href="" className={styles.mainLinkBox}>
                <div className={styles.linkBoxContent} style={{paddingBottom:0}}>
                  <h3>Existing Tenants</h3>
                  <div className="btn btn-accent">
                    Tenant Resources
                  </div>
                </div>
              </Link> */}
            </div>

            <Link
              href="/applicants"
              style={{
                display: "flex",
                flexDirection: "row",
                fontSize: "1em",
                gap: "0.5em",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "4em",
                color: "var(--primary)",
              }}
            >
              <span>All Applications</span>
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                style={{ height: "1em", width: "1em" }}
              />
            </Link>
          </div>
        </section>

        <section className={styles.aboutVideo}>
          <div className="container">
            <h2
              style={{
                fontSize: "2em",
                textAlign: "center",
                color: "var(--primary)",
                marginBottom: "1em",
              }}
            >
              About PHA
            </h2>
            <div
              style={{
                padding: "56.25% 0 0 0",
                position: "relative",
                borderRadius: "10px",
              }}
            >
              <iframe
                src="https://player.vimeo.com/video/804417630?h=a35cb7feef&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  borderRadius: 10,
                }}
                title="OFFICIAL - PORTSMOUTH HOUSING AUTHORITY - VIDEO PROMO"
              ></iframe>
            </div>
            <script src="https://player.vimeo.com/api/player.js"></script>
            <p className={styles.aboutVideoDescription}>
              Portsmouth Housing develops and manages quality affordable housing
              and provides rental assistance to families, seniors, and people
              with disabilities, in a manner that promotes respect for residents
              and builds strong neighborhoods. Portsmouth Housing is made up of
              two entities: the Portsmouth Housing Authority (PHA) and an
              affiliated nonprofit organization, PHA Housing Development LTD.
              Portsmouth Housing owns and manages 12 properties in the city as
              well as a Housing Choice voucher program.
            </p>
          </div>
        </section>

        <section
          className={styles.housingSection}
          style={{ position: "relative" }}
        >
          <div className="container">
            <div className={styles.housingContentContainer}>
              <h2
                style={{
                  fontSize: "2em",
                  color: "var(--primary)",
                  marginBottom: "1em",
                }}
              >
                Serving 650+ Units in Portsmouth
              </h2>
              <p>
                With 12 buildings throughout Portsmouth, NH - we’re the largest
                provider of affordable and HCV housing in the seacoast.
              </p>

              <div className={styles.housingContentScores}>
                {[
                  { count: 650, title: "Housing units" },
                  { count: 1700, title: "People served" },
                  { count: 70, title: "Years" },
                ].map((score) => (
                  <div key={score.title}>
                    <h2>{score.count}+</h2>
                    <p>{score.title}</p>
                  </div>
                ))}
              </div>

              <Link href={"/housing/properties"} className="btn btn-accent">
                See All Housing
              </Link>
            </div>
          </div>
          <img src={"/svg/connors-art.svg"} className={styles.connorsSvg} />
        </section>

        <section>
          <img
            src={"/svg/connors-art.svg"}
            className={styles.connorsSvgMobile}
          />
        </section>

        <section className={styles.supportSection}>
          <div className="container">
            <h2
              style={{
                fontSize: "2em",
                textAlign: "center",
                color: "var(--primary)",
                margin: "0",
                marginBottom: "1em",
              }}
            >
              Proudly Supported by
            </h2>

            <div className={styles.supportLinkBoxes}>
              <div className={styles.mainLinkBox}>
                <div style={{ height: "100%", width: "100%" }}>
                  <Image
                    src={"/img/cdbg.jpg"}
                    height={100}
                    width={150}
                    alt="PHA History"
                    placeholder="blur"
                    blurDataURL={"/img/cdbg.jpg"}
                  />
                </div>
              </div>

              <div className={styles.mainLinkBox}>
                <div style={{ height: "100%", width: "100%" }}>
                  <Image
                    src={"/img/usdud.png"}
                    height={100}
                    width={100}
                    alt="PHA History"
                    placeholder="blur"
                    blurDataURL={"/img/usdud.png"}
                  />
                </div>
              </div>

              <div className={styles.mainLinkBox}>
                <div style={{ height: "100%", width: "100%" }}>
                  <Image
                    src={"/img/nh-seal.png"}
                    height={100}
                    width={100}
                    alt="PHA History"
                    placeholder="blur"
                    blurDataURL={"/img/nh-seal.png"}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
