import { FC } from 'react';
import Link from 'next/link';

import styles from './button.module.scss';

export namespace Button {
  export type Props = Readonly<{
    label: string;
    link: string;
  }>;

  export const $: FC<Props> = (props) => {
    const { label, link } = props;

    return (
      <Link href={link} className={styles.btn}>
        {label}
      </Link>
    );
  };
}
