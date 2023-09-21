import React from "react";
import styles from "../styles/PrimarySection.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const PrimarySection = ({
  title,
  description,
  buttonLink,
  relatedLinks,
  customSidebar,
}) => {
  return (
    <>
      <section className="main-info">
        <div className="container">
          <div className={styles.primaryDescriptionContainer}>
            <div>
              <h1 className="primaryTitle">{title}</h1>
              {description && (
                <div
                  dangerouslySetInnerHTML={{ __html: description }}
                  className={styles.primaryDescription}
                ></div>
              )}
            </div>
            {buttonLink || relatedLinks ? (
              <div className={styles.primaryLinks}>
                {buttonLink && (
                  <a
                    href={buttonLink?.link ? buttonLink.link : buttonLink}
                    target="_blank"
                    className="btn btn-accent"
                  >
                    {buttonLink.text || "Apply Now"}
                  </a>
                )}
                {relatedLinks && relatedLinks.length > 0
                  ? relatedLinks.map((link, index) => {
                      return (
                        <Link
                          className={styles.relatedLink}
                          href={link.link}
                          key={index}
                        >
                          <FontAwesomeIcon icon={link.icon} />
                          <span>{link.title}</span>
                        </Link>
                      );
                    })
                  : null}
              </div>
            ) : null}
            {customSidebar || null}
          </div>
        </div>
      </section>
    </>
  );
};

export default PrimarySection;
