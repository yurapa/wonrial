import Head from 'next/head';
import cx from 'classnames';

import Header from '../header/header';
import Footer from '../footer/footer';

import utilStyles from '../../styles/utils.module.css';

export default function Layout({ children, home }: { children: React.ReactNode; home?: boolean }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className={cx({ [utilStyles.pageSub]: !home })}>{children}</main>

      <Footer />
    </>
  );
}
