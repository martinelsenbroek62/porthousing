import PropertyCard from './PropertyCard'
import styles from '../styles/PropertyCollection.module.css'


const PropertyCollection = ({niceName, titleSize, margin, exclude, properties, otherProperties}) => {

  // if exclude is passed, filter out the properties with the slug in the exclude array
  if (exclude) {
    properties = properties.filter(property => !exclude.includes(property.slug))
  }

  return (
    <div>
      <div style={!margin ? {marginTop:0} : null} className={styles.propertyCardContainer}>
        <h1 style={titleSize ? {fontSize: titleSize} : null} className={styles.collectionTitle}>
          {niceName} 
          </h1>
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  )
}

export default PropertyCollection