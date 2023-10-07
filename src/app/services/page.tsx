import cx from 'classnames';
import { Metadata } from 'next';
import Image from 'next/image';

import Layout from '@/layout/layout/layout';

import utilStyles from '@/styles/utils.module.css';

export const metadata: Metadata = {
  title: 'Our Services :: Wonrial',
};

export default function Services() {
  return (
    <Layout>
      <div className={utilStyles.pageSub}>
        <h2>Our Services</h2>

        <div className={cx(utilStyles.container, utilStyles.container_col)}>
          <div className={cx(utilStyles.col_center, utilStyles.col6)}>
            <Image src="/images/img2.jpg" className={utilStyles.img_rectangle} width={200} height={100} alt="" />
          </div>

          <div className={cx(utilStyles.col_center, utilStyles.col6)}>
            <h3>Software development. Architecture and design of complex systems for your business</h3>
            <p>
              Custom software development is the process of designing, building, integrating, scaling, and upgrading
              software solutions to address the pressing needs or achieve objectives of your specific business.
            </p>
            <p>
              We deliver custom web, mobile, and desktop software solutions that broadly fall under 3 main categories –
              management of B2B, B2C interactions, and internal operations. Our software confidently works across all
              popular browsers, OSes, and mobile platforms, scales to millions of users and delivers immaculate UX
              through a clear, logical layout and smooth workflows.
            </p>
          </div>
        </div>

        <div className={cx(utilStyles.container, utilStyles.container_col)}>
          <div className={cx(utilStyles.col_center, utilStyles.col6)}>
            <h3>Design for interactive web applications</h3>
            <p>
              An interactive web design is a design for websites which uses other inbuilt software, modules or features
              aimed at creating an environment for a website or web application user to be actively engaged during visit
              or use as the case may be, thereby improving his or her user experience (UX).
            </p>
            <p>
              Having prior knowledge of your expected users’ profile and their presumed preferences enables the web
              design’s interactivity to accommodate them. For example, users that do not want to spend much time on your
              site should not be made to do so. Rather make it simpler for them to get the much-needed information as
              fast as possible. Such users abandon transactions or site visits when they don’t achieve their aims in a
              shorter time.
            </p>
          </div>

          <div className={cx(utilStyles.container, utilStyles.container_col)}>
            <Image src="/images/img1.jpg" className={utilStyles.img_rectangle} width={200} height={100} alt="" />
          </div>
        </div>

        <div className={cx(utilStyles.container, utilStyles.container_col)}>
          <div className={cx(utilStyles.col_center, utilStyles.col6)}>
            <Image src="/images/img3.jpg" className={utilStyles.img_rectangle} width={200} height={100} alt="" />
          </div>

          <div className={cx(utilStyles.col_center, utilStyles.col6)}>
            <h3>Integration of electronic payment systems</h3>
            <p>
              Consumers want convenience; it’s one of the reasons that online shopping continues to grow in popularity.
              A study by BigCommerce found that eCommerce is increasing 23 percent year over year. Moreover, Millennials
              and Gen Xers — two generations who make up the majority of the U.S. population — spend six hours per week
              shopping online.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
