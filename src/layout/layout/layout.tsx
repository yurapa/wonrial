import { ReactNode } from 'react';
import cx from 'classnames';

import utilStyles from '@/styles/utils.module.css';

export default function Layout({ children, isHomePage }: { children: ReactNode; isHomePage?: boolean }) {
  return <main className={cx({ [utilStyles.home]: isHomePage })}>{children}</main>;
}
