import Head from 'next/head';
import cx from 'classnames';

import Header from '../header/header';
import Footer from '../footer/footer';
import TopBanner from '../../components/top-banner/top-banner';

import utilStyles from '../../styles/utils.module.css';

export default function Layout({ children, home }: { children: React.ReactNode; home?: boolean }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <TopBanner />

      <Header />

      <main className={cx({ [utilStyles.home]: home })}>{children}</main>

      <Footer />
    </>
  );
}
