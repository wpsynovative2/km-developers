import Image from "next/image";
import EnquireButton from "@/components/enquiry/EnquireButton";
import { SERVICE_ICONS } from "@/components/ui/icons";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { company } from "@/lib/data";

export default function Services() {
  const { services } = company;
  const [plain, accent] = services.title.split(" ");
  return (
    <section id="services">
      <div className="relative overflow-hidden bg-gradient-to-b from-sky-300 to-sky-50 pt-16 lg:pt-24">
        <Image
          src="/images/construction.jpg"
          alt="Workers building a giant KM monument on site"
          fill
          sizes="100vw"
          className="object-cover object-left-bottom opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-white/95 via-white/70 to-transparent" />
        <div className="relative mx-auto flex max-w-7xl justify-end px-4 pb-48 sm:px-6 lg:pb-64">
          <Reveal className="max-w-xl rounded-3xl bg-white/70 p-6 backdrop-blur-sm sm:p-8 lg:bg-transparent lg:p-0 lg:backdrop-blur-none">
            <SectionHeading eyebrow={plain} title={accent} />
            <p className="mt-4 font-label text-xs font-semibold tracking-[0.3em] text-brown uppercase">
              {services.subtitle}
            </p>
            <p className="mt-4 leading-relaxed text-ink sm:text-lg">{services.text}</p>
          </Reveal>
        </div>
      </div>

      <div className="bg-olive pb-16 lg:pb-24">
        <div className="mx-auto -mt-32 grid max-w-6xl gap-6 px-4 sm:grid-cols-2 sm:px-6 lg:-mt-40 lg:grid-cols-3 lg:gap-8">
          {services.items.map((item, i) => {
            const Icon = SERVICE_ICONS[item.icon];
            return (
              <Reveal
                key={item.title}
                delay={(i % 3) * 100}
                className="relative flex flex-col items-start rounded-[2rem] bg-white p-8 shadow-xl"
              >
                <span className="grid size-16 place-items-center rounded-2xl bg-gradient-to-br from-copper-light/25 to-copper/15">
                  <Icon className="size-9 text-copper-dark" strokeWidth={1.6} aria-hidden />
                </span>
                <h3 className="mt-6 font-label text-base font-bold tracking-[0.12em] text-ink uppercase">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">{item.text}</p>
              </Reveal>
            );
          })}
        </div>
        <div className="mt-12 flex justify-center">
          <EnquireButton source="Services">Talk to our team</EnquireButton>
        </div>
      </div>
    </section>
  );
}
