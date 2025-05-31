import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import AOS from 'aos';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import 'aos/dist/aos.css';
// import '../../assets/css/ListOfCSS.css';
import '../../assets/css/ListOfCSS.css';
import MainNavbar from '../../Components/MainNavbar';
import Footer from '../../Components/Footer';
import hanumanpic from '../../assets/img/hanumanjiPic.jpg';
import axios from 'axios';
// import './PoojaSlider.css';
import { useNavigate } from 'react-router-dom';

const PoojaSlider = () => {

  const navigate = useNavigate();
  const swiperRef = useRef(null);

  // const [listPooja , setListPooja] = useState('');
  const [listPooja, setListPooja] = useState([]);

  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: false,
      mirror: true
    });
  }, []);

  const poojaServices = [
    {
      id: 1,
      name: 'Rudra Abhishekam',
      subTitle: 'Shiva Pooja',
      description: 'A divine ritual to honor Lord Shiva with the sacred Abhishekam using milk, honey, curd, ghee, and water.',
      image: hanumanpic,
      icon: '🔱'
    },
    {
      id: 2,
      name: 'Gayatri Japam',
      subTitle: 'Havan',
      description: 'Sacred recitation of the Gayatri Mantra with a purifying fire ceremony to invoke divine blessings.',
      image: hanumanpic,
      icon: '🔥'
    },
    {
      id: 3,
      name: 'Sudarshana Homa',
      subTitle: 'Vishnu Pooja',
      description: 'A powerful fire ritual dedicated to the Sudarshana Chakra of Lord Vishnu to remove obstacles.',
      image: hanumanpic,
      icon: '☸️'
    },
    {
      id: 4,
      name: 'Navagraha Pooja',
      subTitle: 'Planetary Worship',
      description: 'Worship of the nine planetary deities to mitigate negative influences and enhance positive energies.',
      image: hanumanpic,
      icon: '✨'
    },
    {
      id: 5,
      name: 'Satyanarayan Pooja',
      subTitle: 'Vishnu Katha',
      description: 'A sacred ceremony dedicated to Lord Satyanarayan (Vishnu) for prosperity and well-being.',
      image: hanumanpic,
      icon: '🙏'
    },
    {
      id: 6,
      name: 'Durga Saptashati Path',
      subTitle: 'Chandi Pooja',
      description: 'Recitation of 700 verses glorifying the Divine Mother Durga for protection and strength.',
      image: hanumanpic,
      icon: '🔺'
    },
    {
      id: 7,
      name: 'Hanuman Chalisa Paath',
      subTitle: 'Hanuman Pooja',
      description: 'Devotional recitation of forty verses dedicated to Lord Hanuman for courage and protection.',
      image: hanumanpic,
      icon: '💪'
    },
    {
      id: 8,
      name: 'Bhagavad Gita Path',
      subTitle: 'Krishna Pooja',
      description: 'Sacred recitation of the divine song of Lord Krishna, imparting timeless wisdom and guidance.',
      image: hanumanpic,
      icon: '📜'
    },
    {
      id: 9,
      name: 'Shree Yantra Pooja',
      subTitle: 'Lalita Sahasranama Archana',
      description: 'Worship of the sacred geometric symbol representing the cosmos and recitation of 1000 names of Divine Mother.',
      image: hanumanpic,
      icon: '🔯'
    }
  ];

  useEffect(() => {
    axios
      .get('https://bookmyyogna.onrender.com/pooja/getAllPoojas')
      .then((response) => {
        if (response.data.success) {
          setListPooja(response.data.poojas);
        }
      })
      .catch((error) => {
        console.error('Error fetching pandits:', error);
      });
  }, []);

  return (
    <>
      <section className="pooja-slider-section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section-title" data-aos="fade-down">
                <span className="title-icon">🕉️</span>
                <h2>Sacred Pooja Services</h2>
                <div className="divider-line"></div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12" data-aos="fade-up">

              <Swiper
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                effect={'coverflow'}

                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                coverflowEffect={{
                  rotate: 50,
                  stretch: 0,
                  depth: 100,
                  modifier: 1,
                  slideShadows: true,
                }}
                pagination={{ clickable: true }}
                navigation={true}
                autoplay={{
                  delay: 3500,
                  disableOnInteraction: false,
                }}
                modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
                className="pooja-swiper shadow-none"
              >
                {listPooja.map((pooja, _id) => (
                  <SwiperSlide key={pooja._id} onClick={() => swiperRef.current?.autoplay.stop()}>
                    <div
                      className="pooja-card"
                      onMouseEnter={() => swiperRef.current?.autoplay.stop()}
                      onMouseLeave={() => {
                        swiperRef.current?.autoplay.start();
                      }}
                    >
                      <div className="pooja-image-wrapper">
                        <img src={pooja.image} alt={pooja.heading} className="pooja-image" />
                        <div className="pooja-overlay">
                          <div className="overlay-content">
                            <span className="pooja-icon">{pooja.icon}</span>
                            <h3>{pooja.heading}</h3>
                            <p>{pooja.subHeading}</p>
                          </div>
                        </div>
                      </div>
                      <div className="pooja-info">
                        <h4>{pooja.heading}</h4>
                        <h5>{pooja.subHeading}</h5>
                        <p className='m-1'>{pooja.description}</p>
                        <div className='text-center'>

                          {/* <a className='book-now-btn1 text-center text-decoration-none' href="./poojaBookingDetails">Book Now</a> */}
                          <button
  className='book-now-btn1 text-center text-decoration-none'
  onClick={() => navigate('/poojaBookingDetails', { state: { poojaId: pooja._id } })}
>
  Book Now
</button>


                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

            </div>
          </div>

          <div className="row mt-5">
            <div className="col-12">
              <div className="pooja-grid" data-aos="fade-up" data-aos-delay="300">
                {listPooja.map((pooja) => (
                  <div
                    // key={pooja.id}
                    key={pooja._id}

                    className="pooja-tile"
                    data-aos="zoom-in"
                    data-aos-delay={100 * pooja.id}
                  >
                    <div className="pooja-tile-inner">
                      <div className="pooja-tile-front">
                        <img src={pooja.image} alt={pooja.heading} />
                        <div className="pooja-tile-overlay">
                          <h3>{pooja.heading}</h3>
                        </div>
                      </div>
                      <div className="pooja-tile-back">
                        <span className="tile-icon">{pooja.icon}</span>
                        <h4>{pooja.heading}</h4>
                        <h5>{pooja.subHeading}</h5>
                        <p>{pooja.description}</p>
                        {/* <button className="tile-book-btn">
                          <a className='text-decoration-none text-dark' href="./poojaBookingDetails">Book This Pooja</a>
                        </button> */}
                        <button
  className="tile-book-btn"
  onClick={() => navigate('/poojaBookingDetails', { state: { poojaId: pooja._id } })}
>
  <span className='text-decoration-none text-dark'>Book This Pooja</span>
</button>

                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="temple-decoration top-left"></div>
        <div className="temple-decoration top-right"></div>
        <div className="temple-decoration bottom-left"></div>
        <div className="temple-decoration bottom-right"></div>
      </section>
    </>
  );
};

export default PoojaSlider;