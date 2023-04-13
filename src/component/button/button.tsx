import { FC, memo } from 'react';

import './button.css';

export namespace Button {
  export type Props = Readonly<{
    label: string;
    link: string;
  }>;

  export const $: FC<Props> = memo((props) => {
    const { label, link } = props;

    return <a href={link} className="btn">{label}</a>;
  });
}
