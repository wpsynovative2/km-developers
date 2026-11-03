import Header from "@/components/layout/Header";
import About from "@/components/sections/About";
import Achievements from "@/components/sections/Achievements";
import Contact from "@/components/sections/Contact";
import CtaBanner from "@/components/sections/CtaBanner";
import Hero from "@/components/sections/Hero";
import Innovation from "@/components/sections/Innovation";
import Journey from "@/components/sections/Journey";
import Overview from "@/components/sections/Overview";
import Philosophy from "@/components/sections/Philosophy";
import PresenceTrust from "@/components/sections/PresenceTrust";
import Projects from "@/components/sections/Projects";
import Services from "@/components/sections/Services";
import Team from "@/components/sections/Team";
import VisionMission from "@/components/sections/VisionMission";

export default function Home() {
  return (
    <>
      <Header overlay />
      <main>
        <Hero />
        <Overview />
        <About />
        <Achievements />
        <VisionMission />
        <Journey />
        <Projects />
        <CtaBanner
          title="Find a home you can be proud to own"
          text="Explore our ongoing developments in Bhayandar, Mira Road, Naigaon, Boisar and Jogeshwari. Share your details and our team will guide you."
          source="Mid-page CTA"
        />
        <Services />
        <PresenceTrust />
        <Philosophy />
        <Innovation />
        <Team />
        <CtaBanner
          title="Let's build what comes next, together"
          text="Book a site visit or ask us anything about our projects, and our team will get back to you."
          source="Pre-contact CTA"
          image="/images/vision.jpg"
        />
        <Contact />
      </main>
    </>
  );
}
