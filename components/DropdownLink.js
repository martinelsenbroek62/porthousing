import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link'

const DropdownLink = ({title, links}) => {
  return (
    <div className="dropdown-container">
      <span>{title}</span>
      <FontAwesomeIcon icon={faAngleDown} />
      <div className="dropdown-content-container">
      <div className="dropdown-content">
        {links.map((link, index) => (
          <Link key={index} href={link.href}>{link.title}</Link>
        ))}
      </div>
      </div>
    </div>
  )
}

export default DropdownLink