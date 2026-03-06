import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Reviews from "@/components/Reviews";
import Provinces from "@/components/Provinces";
import ContactForm from "@/components/ContactForm";
import UrgentService from "@/components/UrgentService";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Reviews />
        <UrgentService />
        <Provinces />
        <ContactForm />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
};

export default Index;
