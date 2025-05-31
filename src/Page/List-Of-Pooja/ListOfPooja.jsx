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
import { useSelector , useDispatch } from 'react-redux';

const PoojaSlider = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
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


  const handleBookingClick = ()=>{
    if(isAuthenticated){
        navigate('/poojaBookingDetails', { state: { poojaId: pooja._id } })
    }else{
      navigate('/login')
    }
  }

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
  onClick={handleBookingClick}
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
  onClick={handleBookingClick}
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