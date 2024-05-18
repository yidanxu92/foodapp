
import BusinessInfo from "../components/layout/BusinessInfo";
import AboutSection from "../components/layout/AboutSection";
import HomeMenu from "../components/layout/HomeMenu";
import HomeSlider from "../components/layout/HomeSlider";  
import ServicesSection from "../components/layout/ServicesSection"; 
import ContactInfo from "../components/layout/ContactInfo";

export default function Home() {
  return (
    <>
    <HomeSlider/>
    <BusinessInfo/>
    <AboutSection />
    <ServicesSection/>
    <HomeMenu className="pt-24"/>
    <ContactInfo/>
      
    </>
  )
}