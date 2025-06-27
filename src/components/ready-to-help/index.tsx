'use client';

import Image from 'next/image';
import SectionTitle from '../section-title/section-title';

const ReadyToHelp = () => {
  return (
    <section className="relative z-10 py-16 md:py-20 lg:py-28">
      <div className="container">
        <SectionTitle
          title="We are ready to help"
          paragraph="There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form."
          center
          mb="80px"
        />

        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="wow fadeInUp mx-auto max-w-[770px] overflow-hidden rounded-md" data-wow-delay=".15s">
              <div className="relative aspect-[77/40] items-center justify-center">
                <Image src="/images/ready-to-help.jpg" alt="video image" fill />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-[-1] h-full w-full bg-[url(/images/shape.svg)] bg-cover bg-center bg-no-repeat"></div>
    </section>
  );
};

export default ReadyToHelp;
