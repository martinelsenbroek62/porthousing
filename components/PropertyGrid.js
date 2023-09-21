import React from "react";
import PropertyCard from "./PropertyCard";

// src

export default function PropertyGrid({ exclude, properties }) {
  // console.log('properties', properties)

  // if exclude is passed, filter out the properties with the slug in the exclude array
  if (exclude) {
    properties = properties.filter(
      (property) => !exclude.includes(property.slug)
    );
  }

  return (
    <>
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </>
  );
}
