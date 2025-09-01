import React, { useState } from "react"

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
import { Helmet } from 'react-helmet-async';


function HomePage() {
  const [isHeroVisible, setIsHeroVisible] = useState(true);

  return (
    <>
      <Helmet>
        <title>Book Online Puja, Havan & Yagna Services | BookMyYagna</title>
        <meta
          name="description"
          content="Book authentic online puja, havan, and yagna services with expert priests at BookMyYagna. Customize rituals, remove doshas & bring peace and prosperity."
        />
        <meta
          name="keywords"
          content="book puja online, online havan, yagna booking, pandit online, hindu rituals, book yagna, dosh nivaran puja, vastu puja, navgraha shanti, satyanarayan puja"
        />
        <meta
          property="og:title"
          content="BookMyYagna | Personalized Online Pujas & Havans"
        />
        <meta
          property="og:description"
          content="Experience spiritual bliss with BookMyYagna. Book Navgraha Shanti, Rudrabhishek, Satyanarayan Katha, and more pujas online with certified pandits."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bookmyyagna.com/" />
        <meta property="og:image" content="https://bookmyyagna.com/images/home-og-image.jpg" />
        <link rel="canonical" href="https://bookmyyagna.com/" />
      </Helmet>
      <div>

        {/* <MainNavbar isHeroVisible={isHeroVisible} /> */}
        <HeroSection onHeroVisibleChange={setIsHeroVisible} />
        <AdBanner />
        <Services />
        <WhyYagna />
        <Gallery />
        <WhyChooseUs />
        <PopularPriests />
        <Testimonials />
        <FAQ />
      </div>
    </>
  );
}


export default HomePage;
