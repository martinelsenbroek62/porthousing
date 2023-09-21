import styles from "../styles/PersonCard.module.css";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const PersonCard = ({ person, hasThumbnail = false }) => {
  return (
    <div className={styles.personCard}>
      {hasThumbnail && (
        <div
          style={person.photo ? { display: "block" } : { display: "none" }}
          className={styles.personCardImage}
        >
          {person.photo ? (
            <Image
              src={`${process.env.CMS_URL}/assets/${person?.photo.id}?format=webp`}
              alt={person.photo.description}
              blurDataURL={`${process.env.CMS_URL}/assets/${person?.photo.id}?format=webp`}
              placeholder="blur"
              layout="fill"
            />
          ) : null}
        </div>
      )}
      <div className={styles.personCardContent}>
        <h3 className={styles.personCardName}>{person?.name}</h3>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            gap: "1em",
          }}
        >
          {person?.title ? (
            <p className={styles.personCardTitle}>{person?.title}</p>
          ) : null}
          {person?.email ? (
            <a
              href={`mailto:${person?.email}`}
              className={styles.personCardEmail}
            >
              <FontAwesomeIcon icon={faEnvelope} />
            </a>
          ) : null}
        </div>
        {person?.phone_number ? (
          <small style={{ display: "block", marginTop: "1em" }}>
            Phone:{" "}
            <em
              dangerouslySetInnerHTML={{ __html: person?.phone_number }}
              className={styles.personCardTitle}
            ></em>
          </small>
        ) : person?.phone_extension ? (
          <small style={{ display: "block", marginTop: "1em" }}>
            Ext:{" "}
            <em
              dangerouslySetInnerHTML={{ __html: person?.phone_extension }}
              className={styles.personCardTitle}
            ></em>
          </small>
        ) : null}
      </div>
    </div>
  );
};

export default PersonCard;
