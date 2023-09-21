import React, { useMemo, useState } from "react";

import Image from "next/image";
import Head from "next/head";
import { useRouter } from "next/router";

// src
import PropertyGrid from "../../../components/PropertyGrid";

import styles from "../../../styles/Properties.module.css";

async function getProperties() {
  // const res = await fetch(`${process.env.CMS_URL}/items/properties?limit=-1&fields=*.*.*&filter[housing_type]=${type}`);
  const res = await fetch(
    `${process.env.CMS_URL}/items/properties?limit=-1&fields=*.*.*`,
    {
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
  const data = await res.json();

  // group properties by housing type
  const properties = data.data.reduce((acc, property) => {
    const housingType = property.housing_type;
    if (!acc[housingType]) {
      acc[housingType] = [];
    }
    acc[housingType].push(property);
    return acc;
  }, {});

  return properties;
}

async function getPageData() {
  const res = await fetch(
    `${process.env.CMS_URL}/items/pages?filter[title]=Properties&limit=1&fields=*.*.*`,
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
  const [pageData, properties] = await Promise.all([
    getPageData(),
    getProperties(),
  ]);
  return {
    props: {
      pageData,
      properties,
    },
    revalidate: 1,
  };
}

export default function Properties({ pageData, properties }) {
  const router = useRouter();
  const [filterValue, setFilterValue] = useState(null);

  const startCase = (string) => {
    switch (string) {
      case "disabled":
        return "Housing for People with Physical Disabilities";
      case "senior":
        return "Housing for Seniors";
      case "elderly_disabled":
        return "Housing for Seniors & People with Disabilities";
      default:
        break;
    }
    if (string.split(" ").length > 1) {
      return string
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join("/")
        .replace(/_/g, " ");
    } else {
      return (string.charAt(0).toUpperCase() + string.slice(1)).replace(
        /_/g,
        " "
      );
    }
  };

  const propertiesKeys = Object.keys(properties);

  const propertiesArray = useMemo(() => {
    return propertiesKeys.reduce(
      (acc, current) => [...acc, ...properties[current]],
      []
    );
  }, [properties]);

  const filteredArray = filterValue
    ? propertiesArray.filter((item) => item.housing_type === filterValue)
    : propertiesArray;

  const handleChangeFilter = (e) => {
    setFilterValue(e.target.value);
  };

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

        <section className="properties-container">
          <div className="container">
            <div className={styles.propertiesFilter}>
              <h1 className="primaryTitle">Housing Properties</h1>
              <select
                defaultValue="All"
                onChange={handleChangeFilter}
                className={styles.filterSelect}
              >
                <option key="all" value="All">
                  All
                </option>
                {propertiesKeys.map((propertyKey) => (
                  <option key={propertyKey} value={propertyKey}>
                    {startCase(propertyKey)}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.propertiesContainer}>
              <PropertyGrid
                properties={
                  // if filterValue equals 'All', return all properties
                  filterValue === "All" ? propertiesArray : filteredArray
                }
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
