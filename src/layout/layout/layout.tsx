import cx from 'classnames';

import Header from '@/layout/header/header';
import Footer from '@/layout/footer/footer';
import { TopBanner } from '@/components/top-banner';

import utilStyles from '@/styles/utils.module.css';

export default function Layout({ children, home }: { children: React.ReactNode; home?: boolean }) {
  return (
    <>
      <TopBanner />
      <Header />
      <main className={cx({ [utilStyles.home]: home })}>{children}</main>
      <Footer />
    </>
  );
}
