import { Navbar } from '@/components/site/navbar';
import { Footer } from '@/components/site/footer';
import { Hero } from '@/components/sections/hero';
import { WhyBiopc } from '@/components/sections/why-biopc';
import { Benefits } from '@/components/sections/benefits';
import { Audience } from '@/components/sections/audience';
import { Curriculum } from '@/components/sections/curriculum';
import { Instructor } from '@/components/sections/instructor';
import { Testimonials } from '@/components/sections/testimonials';
import { Faq } from '@/components/sections/faq';
import { Registration } from '@/components/sections/registration';
import { FinalCta } from '@/components/sections/final-cta';
import { JsonLd } from '@/components/seo/json-ld';

export default function HomePage() {
  return (
    <>
      <JsonLd />
      <Navbar />
      <main>
        <Hero />
        <WhyBiopc />
        <Benefits />
        <Audience />
        <Curriculum />
        <Instructor />
        <Testimonials />
        <Faq />
        <Registration />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
