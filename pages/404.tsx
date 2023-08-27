import Head from 'next/head';
import Image from 'next/image';

export default function NoPage() {
  return (
    <>
      <Head>
        <title>404 :: Wonrial</title>
      </Head>

      <div className="page-sub">
        <a href="/">
          <Image
            src="/images/404.jpg"
            height={686} // Desired size with correct aspect ratio
            width={1200} // Desired size with correct aspect ratio
            alt="Your Name"
          />
        </a>
      </div>
    </>
  );
}
