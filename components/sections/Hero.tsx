import Image from "next/image";
import Link from "next/link";
import EnquireButton from "@/components/enquiry/EnquireButton";
import Leaves from "@/components/ui/Leaves";
import { company } from "@/lib/data";

export default function Hero() {
  const [first, ...rest] = company.heroTitle;
  return (
    <section id="home" className="relative overflow-hidden lg:min-h-[100svh]">
      <Image src="/images/sky.jpg" alt="" fill preload sizes="100vw" className="object-cover object-top" />

      <Leaves
        items={[
          { leaf: 3, className: "top-[24%] left-[7%] hidden lg:block", size: 64 },
          { leaf: 5, className: "top-[14%] left-[40%]", size: 34, slow: true },
          { leaf: 2, className: "top-[30%] left-[58%] hidden lg:block", size: 36 },
          { leaf: 6, className: "right-[8%] bottom-[16%]", size: 68, slow: true },
          { leaf: 4, className: "top-[12%] right-[6%] hidden lg:block", size: 46 },
        ]}
      />

      {/* Full-bleed like the design: island fills ~60% of the width, text sits on the right */}
      <div className="relative flex flex-col px-4 pt-28 pb-24 sm:px-6 md:pb-16 lg:min-h-[100svh] lg:flex-row lg:items-center lg:px-0 lg:pt-28 lg:pb-12">
        {/* The island: its own cut-out image over the sky background */}
        <div className="relative z-10 order-2 mx-auto mt-6 w-full max-w-2xl lg:order-none lg:mx-0 lg:mt-0 lg:w-[60%] lg:max-w-[1250px]">
          <Image
            src="/images/hero-island.webp"
            alt="The KM monument on a green island city with skyscrapers and wind turbines"
            width={1321}
            height={781}
            preload
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="h-auto w-full drop-shadow-[0_30px_40px_rgba(0,0,0,0.18)]"
          />
        </div>

        <div className="relative z-10 order-1 lg:order-none lg:w-[40%] lg:pr-8 lg:pl-6 xl:pl-10">
          <h1 className="font-serif leading-[0.95] font-semibold">
            <span className="text-brown-gradient block text-3xl sm:text-5xl lg:text-4xl xl:text-5xl">{first}</span>
            {rest.map((word) => (
              <span key={word} className="text-brown-gradient block text-[2.6rem] sm:text-6xl lg:text-5xl xl:text-6xl">
                {word}
              </span>
            ))}
          </h1>
          <p className="mt-5 max-w-md font-label text-sm font-semibold tracking-[0.25em] text-brown uppercase sm:text-base">
            {company.heroSubtitle}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <EnquireButton source="Hero" />
            <Link
              href="/#projects"
              className="font-label text-sm font-semibold tracking-[0.18em] text-brown uppercase underline-offset-8 hover:underline"
            >
              Explore projects
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
