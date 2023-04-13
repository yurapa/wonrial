import { Link } from 'react-router-dom';

import Banner from '../component/banner/banner';
import Img1 from '../images/img1.jpg';
import Img2 from '../images/img2.jpg';
import Img3 from '../images/img3.jpg';

import '../component/button/button.css';

function Home() {
  return (
    <div className="page-main">
      <Banner />

      <h2>About Us</h2>

      <div className="container container_col">
        <div className="col_center col-4">
          <img src={Img2} className="img img_circle" alt="" />
          <h3>Technical Experience</h3>
          <p>
            We are well-versed in a variety of operating systems, networks, and databases. We work with just about any
            technology that a small business would encounter. We use this expertise to help customers with small to
            mid-sized projects.
          </p>
          <Link to="/contact" className="btn">
            Book online
          </Link>
        </div>

        <div className="col_center col-4">
          <img src={Img1} className="img img_circle" alt="" />
          <h3>High ROI</h3>
          <p>
            Do you spend most of your IT budget on maintaining your current system? Many companies find that constant
            maintenance eats into their budget for new technology. By outsourcing your IT management to us, you can
            focus on what you do best--running your business.
          </p>
          <Link to="/services" className="btn">
            See Services
          </Link>
        </div>

        <div className="col_center col-4">
          <img src={Img3} className="img img_circle" alt="" />
          <h3>Satisfaction Guaranteed</h3>
          <p>
            The world of technology can be fast-paced and scary. That's why our goal is to provide an experience that is
            tailored to your company's needs. No matter the budget, we pride ourselves on providing professional
            customer service. We guarantee you will be satisfied with our work.
          </p>
          <Link to="/contact" className="btn">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
