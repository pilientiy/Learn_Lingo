import Image from 'next/image';
import Feature from './components/feature';
import { Toaster } from 'react-hot-toast';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="bg-bg-color flex flex-col justify-center items-center gap-6 max-w-[1440px] sm:p-4 px-16 pb-8 mx-auto">
      <div className="flex sm:flex-wrap md:flex-wrap gap-[24px]">
        <div className="flex gap-16 flex-col bg-guyabano sm:p-4 px-16 py-[98px] mx-auto max-w-[720px] rounded-[30px]">
          <div className="flex flex-col gap-8">
            <h1 className="text-5xl font-medium leading-[1.17em] tracking-tight">
              Unlock your potential with the best{' '}
              <span className="bg-light-red rounded-lg italic font-normal px-2">
                language
              </span>{' '}
              tutors
            </h1>
            <p className="leading-[1.37em] tracking-tight max-w-[471px]">
              Embark on an Exciting Language Journey with Expert Language
              Tutors: Elevate your language proficiency to new heights by
              connecting with highly qualified and experienced tutors.
            </p>
          </div>
          <Link
            href={'/teachers'}
            className="bg-red font-bold text-lg leading-[1.56em] max-w-[267px] py-4 px-[88px] rounded-xl red-button-hover"
          >
            Get started
          </Link>
        </div>
        <div className="mx-auto">
          <Image
            src={'/images/bg.jpg'}
            alt={'A girl and a laptop'}
            width={568}
            height={530}
            quality={100}
            priority
          />
        </div>
      </div>
      <ul className="sm:p-[20px] sm:gap-6 sm:flex-col md:gap-6 md:flex-col flex lg:flex-row lg:gap-0 justify-around items-center w-full py-[40px] border-dashed border-2 border-red rounded-[30px] mx-auto">
        <li>
          <Feature number={'32,000'} description={'Experienced tutors'} />
        </li>
        <li>
          <Feature number={'300,000'} description={'5-star tutor reviews'} />
        </li>
        <li>
          <Feature number={'120'} description={'Subjects taught'} />
        </li>
        <li>
          <Feature number={'200'} description={'Tutor nationalities'} />
        </li>
      </ul>

      <Toaster />
    </div>
  );
}
