import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import Layout from '../layout/layout/layout';

import utilStyles from '../styles/utils.module.css';

export default function Contact() {
  return (
    <Layout>
      <Head>
        <title>Contact Us :: Wonrial</title>
      </Head>

      <h2>Contact Us</h2>
      <div className={utilStyles.container}>
        <p>
          Let us tailor a service package that meets your needs. Tell us a little about your business, and we will get
          back to you with some ideas as soon as possible.
        </p>
        <h3>WONRIAL</h3>
        <p>Vasili Michailidi, 9, 3026, Limassol, Cyprus</p>
        <h3>Hours</h3>
        <p>
          Mon 09:00 – 17:00 <br />
          Tue 09:00 – 17:00 <br /> Wed 09:00 – 17:00 <br />
          Thu 09:00 – 17:00 <br />
          Fri 09:00 – 17:00 <br />
          Sat Closed <br />
          Sun Closed
        </p>
        <p>
          Monday - Friday: 9am - 5pm <br />
          Saturday - Sunday: Closed
        </p>
      </div>

      <Link href="https://www.google.com/maps?daddr=Vasili+Michailidi,+9,+3026,+Limassol,+Cyprus">
        <Image
          src="/images/map.png"
          alt="Map"
          width={100}
          height={100}
          sizes="100vw"
          style={{
            width: '100%',
            height: 'auto',
          }}
        />
      </Link>
    </Layout>
  );
}
