import { ReactElement } from 'react';

export type Feature = {
  id: number;
  icon: ReactElement;
  // Translation key under `home.features.items`
  key: string;
};
