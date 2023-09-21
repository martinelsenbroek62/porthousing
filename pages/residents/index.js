import PrimarySection from "../../components/PrimarySection";
import FAQs from "../../components/FAQs";
import {
  faQuestionCircle,
  faBuilding,
} from "@fortawesome/free-solid-svg-icons";
import ServiceSwitcher from "../../components/ServiceSwitcher";
import Image from "next/image";
import Head from "next/head";
import { useRouter } from "next/router";

async function getPageData() {
  const res = await fetch(
    `${process.env.CMS_URL}/items/pages?filter[slug]=residents&limit=1&fields=*.*.*.*`,
    {
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
  const data = await res.json();

  return data.data[0];
}

async function getServices() {
  const res = await fetch(
    `${process.env.CMS_URL}/items/resident_services?fields=*.*.*.*`,
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
  const [pageData, services] = await Promise.all([
    getPageData(),
    getServices(),
  ]);
  return {
    props: {
      pageData,
      services,
    },
    revalidate: 1,
  };
}

const index = ({ pageData, services }) => {
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
          buttonLink={{
            text: "Pay Rent Online",
            link: "https://portal.rentpayment.com/pay/login.html",
          }}
          relatedLinks={[
            { title: "Resident FAQs", link: "#faqs", icon: faQuestionCircle },
            { title: "Resident Services", link: "#services", icon: faBuilding },
          ]}
          title="Pay Rent"
          description={pageData?.main_text}
        />
        {services && services.length > 0 ? (
          <section
            style={{ paddingTop: "10em", scrollMarginTop: "0" }}
            id="services"
          >
            <h1
              className="primaryTitle"
              style={{ textAlign: "center", marginBottom: "1.5em" }}
            >
              Programs and Services
            </h1>
            <div className="container">
              <ServiceSwitcher services={services} />
            </div>
          </section>
        ) : null}
        <section style={{ padding: "10em 0" }}>
          <div className="container">
            <h1
              className="primaryTitle"
              style={{ textAlign: "center", marginBottom: "1.5em" }}
            >
              Looking for More?
            </h1>
            <div
              style={{
                position: "relative",
                height: "5vw",
                aspectRatio: "5/1",
                margin: "0 auto",
                minHeight: "50px",
              }}
            >
              <Image
                src="/img/dial211.png"
                alt="Dial 211"
                layout="fill"
                blurDataURL="/img/dial211.png"
                placeholder="blur"
              />
            </div>
            <div
              style={{ textAlign: "center", marginTop: "1em", display: "grid" }}
            >
              <small>Or Call:</small>
              <a
                style={{
                  fontSize: "2.15em",
                  textDecoration: "underline",
                  color: "var(--primary)",
                }}
                href="tel:18664444211"
              >
                1.866.444.4211
              </a>
              <small style={{ marginTop: "2.5em" }}>Powered by:</small>
              <div
                style={{
                  position: "relative",
                  height: "5vw",
                  aspectRatio: "2/1",
                  margin: "0 auto",
                  minHeight: "50px",
                }}
              >
                <Image
                  src="/img/unitedwaylogo.png"
                  alt="Dial 211"
                  layout="fill"
                  blurDataURL="/img/unitedwaylogo.png"
                  placeholder="blur"
                />
              </div>
            </div>
          </div>
        </section>
        {pageData.faqs && pageData.faqs.length > 0 ? (
          <FAQs title="Resident FAQs" faqData={pageData?.faqs} />
        ) : null}
      </main>
    </>
  );
};

export default index;
