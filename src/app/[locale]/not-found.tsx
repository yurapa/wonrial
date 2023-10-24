import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '404 :: Wonrial',
};

export default function NotFound() {
  return (
    <div className="page-sub">
      <Link href="/">
        <Image
          src="/images/404.jpg"
          height={686} // Desired size with correct aspect ratio
          width={1200} // Desired size with correct aspect ratio
          alt="Not found"
        />
      </Link>
    </div>
  );
}
