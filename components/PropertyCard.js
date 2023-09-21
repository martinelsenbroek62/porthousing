import styles from "../styles/PropertyCard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";

const PropertyCard = ({ property }) => {
  return (
    <div className={styles.propertyCard}>
      <Link
        className={styles.propertyCardImage}
        href={`/housing/properties/${property.slug}`}
      >
        <Image
          src={`${process.env.CMS_URL}/assets/${property.featured_image.id}?format=webp`}
          alt={property.featured_image.description}
          fill
          placeholder="blur"
          blurDataURL={`${process.env.CMS_URL}/assets/${property.featured_image.id}?format=webp`}
        />
        <div
          className="btn btn-accent"
          style={{
            position: "absolute",
            top: "1em",
            right: "1em",
            padding: "0.5em",
            fontSize: "1.25em",
          }}
        >
          <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
        </div>
      </Link>
      <h3 className={styles.propertyCardTitle}>{property.name}</h3>
    </div>
  );
};

export default PropertyCard;
