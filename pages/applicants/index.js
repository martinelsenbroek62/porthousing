import PrimarySection from "../../components/PrimarySection";
import FAQs from "../../components/FAQs";
import {
  faQuestionCircle,
  faBuilding,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Head from "next/head";
import { useRouter } from "next/router";

async function getPageData() {
  const res = await fetch(
    `${process.env.CMS_URL}/items/pages?filter[slug]=applicants&limit=1&fields=*.*.*.*`,
    {
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
  const data = await res.json();

  return data.data[0];
}

export async function getStaticProps() {
  const pageData = await getPageData();
  return {
    props: {
      pageData,
    },
    revalidate: 1,
  };
}

const index = ({ pageData }) => {
  const router = useRouter();

  return (
    <>
      <main>
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
                : process.env.SITE_URL +
                  "/img/portsmouth-housing_logo_horiz.png"
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
        <section className="header">
          <img
            src={`${process.env.CMS_URL}/assets/${pageData?.header_image.id}?format=webp`}
            alt={pageData.header_image.description}
          />
        </section>
        <PrimarySection
          relatedLinks={[
            { title: "Applicant FAQs", link: "#faqs", icon: faQuestionCircle },
            {
              title: "Our Properties",
              link: "/housing/properties",
              icon: faBuilding,
            },
          ]}
          buttonLink={{
            text: "Apply Now",
            link: "https://www.waitlistcheck.com/NH3154",
          }}
          title="Apply Online"
          description={pageData?.main_text}
        />
        <FAQs title="Applicant FAQs" faqData={pageData?.faqs} />
      </main>
    </>
  );
};

export default index;
