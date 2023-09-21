import { useEffect, useState } from "react";
import styles from "../../../styles/Property.module.css";
import PropertyCollection from "../../../components/PropertyCollection";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faBuildingUser,
  faImages,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Head from "next/head";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { useRouter } from "next/router";

export async function getStaticPaths() {
  const res = await fetch(
    `${process.env.CMS_URL}/items/properties?fields=slug`,
    {
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
  const data = await res.json();
  const paths = data.data.map((property) => ({
    params: { slug: property.slug },
  }));
  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  const property = await getProperty(params.slug);
  const allPropertiesForType = await getPropertiesByType(property.housing_type);
  const otherProperties = allPropertiesForType.filter(
    (p) => p.slug !== property.slug
  );

  return {
    props: {
      property,
      allPropertiesForType,
      otherProperties,
    },
    revalidate: 1,
  };
}

async function getProperty(slug) {
  const res = await fetch(
    `${process.env.CMS_URL}/items/properties?fields=*.*.*&filter[slug]=${slug}`,
    {
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
  const data = await res.json();
  return data.data[0];
}

async function getPropertiesByType(type) {
  const res = await fetch(
    `${process.env.CMS_URL}/items/properties?limit=-1&fields=*.*.*&filter[housing_type]=${type}`,
    {
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
  const data = await res.json();
  return data.data;
}

export default function PropertyPage({
  property,
  allPropertiesForType,
  otherProperties,
}) {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [housingLabel, setHousingLabel] = useState();

  const images = property.image_gallery.map(
    (image) => `${process.env.CMS_URL}/assets/${image.directus_files_id.id}`
  );

  useEffect(() => {
    const getPropertyLabel = () => {
      let label =
        property.housing_type
          .slice(0)
          .replace(/_/g, " ")
          .replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase())) +
        " Housing";
      switch (property.housing_type) {
        case "disabled":
          label = "Housing for People with Physical Disabilities";
          break;
        case "senior":
          label = "Housing for Seniors";
          break;
        case "elderly_disabled":
          label = "Housing for Seniors & People with Disabilities";
          break;
        default:
          break;
      }
      setHousingLabel(label);
      return label;
    };
    getPropertyLabel();
  }, []);

  return (
    <>
      <Head>
        <title>
          {property.name} | Properties | Portsmouth Housing Authority
        </title>
        <meta
          name="description"
          content={property.description.replace(/(<([^>]+)>)/gi, "")}
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
            property?.featured_image
              ? process.env.CMS_URL + "/assets/" + property?.featured_image.id
              : process.env.SITE_URL + "/img/portsmouth-housing_logo_horiz.png"
          }
          key="ogimage"
        />
        <meta
          property="og:site_name"
          content={"Portsmouth Housing Authority"}
          key="ogsitename"
        />
        <meta property="og:title" content={property.name} key="ogtitle" />
        <meta
          property="og:description"
          content={property.description.replace(/(<([^>]+)>)/gi, "")}
          key="ogdesc"
        />
      </Head>
      <main>
        <section className={styles.propertyHero}>
          <div className={"container"}>
            <div className={styles.propertyHeroContainer}>
              <div className={styles.propertyHeroImage}>
                <img
                  src={`${process.env.CMS_URL}/assets/${property.featured_image.id}?format=webp`}
                  alt={property.featured_image.description}
                />
                <span
                  style={{
                    position: "absolute",
                    top: "1em",
                    left: "1em",
                    fontSize: "0.75rem",
                  }}
                  className={["badge badge-dark"]}
                >
                  {housingLabel}
                </span>
              </div>
              <div className={styles.propertyHeroContent}>
                {property.image_gallery && property.image_gallery.length > 0 ? (
                  <button
                    style={{ position: "relative" }}
                    onClick={() => setIsOpen(true)}
                    className={styles.propertyGalleryContainer}
                  >
                    <Image
                      src={`${process.env.CMS_URL}/assets/${property.image_gallery[0].directus_files_id.id}?format=webp`}
                      alt={
                        property.image_gallery[0].directus_files_id.description
                      }
                      fill
                      placeholder="blur"
                      blurDataURL={`${process.env.CMS_URL}/assets/${property.image_gallery[0].directus_files_id.id}?format=webp&blur=100`}
                    />
                    <span
                      style={{
                        position: "absolute",
                        top: "1em",
                        left: "1em",
                        fontSize: "0.75rem",
                      }}
                      className={["badge badge-dark"]}
                    >
                      <FontAwesomeIcon icon={faImages} />
                      <span style={{ marginLeft: "0.5em" }}>
                        {property.image_gallery.length}
                      </span>
                    </span>
                  </button>
                ) : null}
                {property.map && (
                  <div
                    dangerouslySetInnerHTML={{ __html: property.map }}
                    className={styles.propertyMapContainer}
                  ></div>
                )}
              </div>
              <div className={styles.propertyDescriptionContainer}>
                <h1 className={styles.propertyTitle}>{property.name}</h1>
                {property.description && (
                  <div
                    dangerouslySetInnerHTML={{ __html: property.description }}
                    className={styles.propertyDescription}
                  ></div>
                )}
              </div>
              <div className={styles.propertyDetailsContainer}>
                <Link className={"btn btn-accent"} href="/applicants">
                  Apply Online
                </Link>
                {property.address ? (
                  <div className={styles.iconBlock}>
                    <FontAwesomeIcon icon={faLocationDot} />
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        property.address
                      )}`}
                      target="_blank"
                      className={styles.propertyAddress}
                    >
                      {property.address}
                    </a>
                  </div>
                ) : null}
                {property.units ? (
                  <div className={styles.iconBlock}>
                    <FontAwesomeIcon icon={faBuildingUser} />
                    <span>{property.units} Units</span>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </section>
        {allPropertiesForType.length > 1 ? (
          <section className={styles.relatedProperties}>
            <div className={"container"}>
              <h3 className={styles.leadInText}>Looking for More?</h3>
              <PropertyCollection
                exclude={property.slug}
                margin={false}
                properties={allPropertiesForType}
                niceName={`Other ${housingLabel}`}
              />
            </div>
          </section>
        ) : null}
      </main>
      {isOpen ? (
        <Lightbox
          style={{ zIndex: 9999 }}
          mainSrc={images[photoIndex]}
          nextSrc={images[(photoIndex + 1) % images.length]}
          prevSrc={images[(photoIndex + images.length - 1) % images.length]}
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() =>
            setPhotoIndex((photoIndex + images.length - 1) % images.length)
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + images.length + 1) % images.length)
          }
        />
      ) : null}
    </>
  );
}
