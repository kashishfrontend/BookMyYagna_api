import React from "react";

import MainNavbar from "./MainNavbar";
import HeroSection from "./HeroSection";
import Services from "./Services";
import WhyChooseUs from "./WhyChooseUs";
import PopularPriests from "./PopularPriests";
import Testimonials from "./Testimonials";
import FAQ from "./FAQ";
import Footer from "./Footer";
import Gallery from "./gallery";
import AdBanner from "../Page/AdBanner";
import WhyYagna from "../Page/WhyYagna";
import { Link } from "react-router-dom";
// import DivineJournal from '../Page/DivineJournal'

function HomePage() {
  return (
    <div>
      <HeroSection />
      <AdBanner />
      <Services />
      <WhyYagna />
      <Gallery />
      <WhyChooseUs />
      <PopularPriests />
      <Testimonials />
      <FAQ />
    </div>
  );
}


export default HomePage;
