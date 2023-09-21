import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faLocationDot, faPhone, faFax, faEnvelope, faTty } from '@fortawesome/free-solid-svg-icons';
import ContactBlock from '../../components/ContactBlock';
import PersonCard from '../../components/PersonCard'
import Image from 'next/image';
import Head from 'next/head'

const index = () => {

  return (
    <>
      <Head>
        <title>Privacy Policy | Portsmouth Housing Authority</title>
        <meta name="description" content={"PHA privacy policy."} />
      </Head>
    <main>
      <section className="main-info">
        <div className="container">
          <h1 className="primaryTitle">Privacy Policy</h1>
          <br/>
          <p>Portsmouth Housing Authority (PHA) is a public housing agency based in Portsmouth, New Hampshire. Our website www.porthousing.org is an information and communication technology that informs the public about PHA’s mission and activities.</p>
          <h2>Anonymous Access</h2>
          <p>You can visit our website home page and browse specific areas of our site without disclosing personal data. PHA’s website does not share any information with third party Web service providers. However, PHA makes no claim regarding, and is not responsible for, the privacy practices or the content of websites to which our website is linked.</p>
          <h2>Collection of Information</h2>
          <p>We do not automatically log personal data nor do we link information automatically logged by other means with personal data of other individuals.</p>
          <h2>Information Collection and Purpose Specification</h2>
          <p>We do not collect information about our visitors from other sources, such as private organizations, public records or institutions.</p>
          <p>The Portsmouth Housing Authority reserves all rights to make amendments to this privacy policy.</p>
          <br/><br/>
        </div>
        <div className="container">
          <h1 className="primaryTitle">Terms of Use</h1>
          <br/>
          <p>The Portsmouth Housing Authority (PHA) neither warrants nor makes any representations as to the quality, content, accuracy, or completeness of the information, text, graphics, links and other items contained on this Web Site or any content referenced or provided herein. Such materials have been compiled from a variety of sources, and are subject to change without notice from the Portsmouth Housing Authority.</p>
          <p>By accessing this website, you are agreeing to be bound by these Terms of Use and Disclaimer. If you do not accept the Terms of Use and Disclaimer stated herein, do not use the website. PHA may revise this Disclaimer and its Terms of Use at any time by updating this posting. You should visit this page periodically to review the Terms of Use and Disclaimer because they are binding on you.</p>
          <p>The materials and services contained in this web site are provided "as is" without any representations, warranties or conditions of any kind, express or implied, including, without limitation, implied warranties or conditions of fitness for a particular purpose or use, or non-infringement. Further, no representations or warranties are made concerning the accuracy, completeness, timeliness or reliability of the materials or services, or of any information contained in any site linked to this web site. PHA does not warrant or guarantee uninterrupted access to the web site, any site linked to this web site or to the availability of internet e-mail links provided on the web site. In no event shall PHA, its officers, affiliates, agents, licensors, employees or internet service provider(s) (collectively "its representatives") be liable to you or any third party for any direct, indirect, incidental, special or consequential damages whatsoever, including but not limited to lost revenue, lost or damaged data or other commercial or economic loss, whether based in contract, tort (including negligence) or any other theory of liability. The foregoing limitation shall apply even if PHA or its representatives have been advised or should have known of the possibility of such damage.</p>
          <br/><br/>
        </div>
      </section>
    </main>
    </>
  )
}

export default index
