import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaSearchPlus, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Gallery = () => {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState(0);
    const [filterCategory, setFilterCategory] = useState('all');

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: false,
            mirror: true
        });
    }, []);

    // Gallery images with categories
    const galleryImages = [
        {
            id: 1,
            src: "https://img.freepik.com/free-photo/indian-hindu-wedding-ceremony_93675-132464.jpg",
            alt: "Hindu Wedding Ceremony",
            category: "ceremonies",
            title: "Traditional Hindu Wedding"
        },
        {
            id: 2,
            src: "https://img.freepik.com/free-photo/traditional-indian-wedding-ceremony_8353-9765.jpg",
            alt: "Ganesh Pooja",
            category: "pooja",
            title: "Ganesh Chaturthi Celebration"
        },
        {
            id: 3,
            src: "https://img.freepik.com/free-photo/indian-wedding-ritual-with-coconut_8353-9769.jpg",
            alt: "Wedding Ritual",
            category: "ceremonies",
            title: "Sacred Wedding Rituals"
        },
        {
            id: 4,
            src: "https://img.freepik.com/free-photo/oil-lamp-with-diwali-festival_1340-33551.jpg",
            alt: "Diwali Celebration",
            category: "festivals",
            title: "Diwali Lamp Ceremony"
        },
        {
            id: 5,
            src: "https://img.freepik.com/free-photo/young-indian-man-traditional-wear-praying_23-2149413863.jpg",
            alt: "Prayer Ceremony",
            category: "pooja",
            title: "Morning Prayer Ritual"
        },
        {
            id: 6,
            src: "https://img.freepik.com/free-photo/young-indian-man-traditional-wear-praying_23-2149413863.jpg",
            alt: "Aarti Ceremony",
            category: "pooja",
            title: "Divine Aarti Ceremony"
        },
        {
            id: 7,
            src: "https://img.freepik.com/free-photo/colored-powder-holi-festival_23-2148170311.jpg",
            alt: "Holi Celebration",
            category: "festivals",
            title: "Vibrant Holi Festival"
        },
        {
            id: 8,
            src: "https://img.freepik.com/free-photo/priest-performing-ceremony-temple_1157-33500.jpg",
            alt: "Temple Ceremony",
            category: "ceremonies",
            title: "Sacred Temple Rituals"
        },
        {
            id: 9,
            src: "https://img.freepik.com/free-photo/indian-wedding-arrangement_8353-851.jpg",
            alt: "Wedding Decoration",
            category: "decorations",
            title: "Traditional Wedding Decorations"
        },
        {
            id: 10,
            src: "https://img.freepik.com/free-photo/close-up-beautiful-indian-wedding-decorations_8353-9764.jpg",
            alt: "Mandap Decoration",
            category: "decorations",
            title: "Elegant Mandap Setup"
        },
        {
            id: 11,
            src: "https://img.freepik.com/free-photo/ganesh-chaturthi-festival-celebration-concept_93675-84353.jpg",
            alt: "Ganesh Festival",
            category: "festivals",
            title: "Ganesh Chaturthi Festival"
        },
        {
            id: 12,
            src: "https://img.freepik.com/free-photo/karwa-chauth-festival-celebration-concept_93675-129696.jpg",
            alt: "Karwa Chauth",
            category: "ceremonies",
            title: "Karwa Chauth Celebration"
        }
    ];

    // Filter images based on selected category
    const filteredImages = filterCategory === 'all'
        ? galleryImages
        : galleryImages.filter(img => img.category === filterCategory);

    // Open lightbox with specific image
    const openLightbox = (index) => {
        setCurrentImage(index);
        setLightboxOpen(true);
        document.body.style.overflow = 'hidden';
    };

    // Close lightbox
    const closeLightbox = () => {
        setLightboxOpen(false);
        document.body.style.overflow = 'auto';
    };

    // Navigate to next image
    const nextImage = () => {
        setCurrentImage((prev) => (prev === filteredImages.length - 1 ? 0 : prev + 1));
    };

    // Navigate to previous image
    const prevImage = () => {
        setCurrentImage((prev) => (prev === 0 ? filteredImages.length - 1 : prev - 1));
    };

    // Handle key press events for lightbox navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!lightboxOpen) return;

            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [lightboxOpen]);

    return (
        <section className="gallery-section">
            <Container>
                <div className="section-header" data-aos="fade-up">
                    <div className="ornament-line " data-aos="zoom-in" duration="1000">
                        <span className="om-symbol">ॐ</span>
                    </div>
                    <div className='section-title'>
                    <h3>Sacred Moments <span>Gallery</span></h3>
                    </div>
                   
                    <p>Explore our collection of divine moments captured during various poojas and ceremonies</p>
                </div>

                <div className="gallery-filter" data-aos="fade-up">
                    <button
                        className={`filter-btn ${filterCategory === 'all' ? 'active' : ''}`}
                        onClick={() => setFilterCategory('all')}
                    >
                        All
                    </button>
                    <button
                        className={`filter-btn ${filterCategory === 'pooja' ? 'active' : ''}`}
                        onClick={() => setFilterCategory('pooja')}
                    >
                        Poojas
                    </button>
                    <button
                        className={`filter-btn ${filterCategory === 'ceremonies' ? 'active' : ''}`}
                        onClick={() => setFilterCategory('ceremonies')}
                    >
                        Ceremonies
                    </button>
                    <button
                        className={`filter-btn ${filterCategory === 'festivals' ? 'active' : ''}`}
                        onClick={() => setFilterCategory('festivals')}
                    >
                        Festivals
                    </button>
                    <button
                        className={`filter-btn ${filterCategory === 'decorations' ? 'active' : ''}`}
                        onClick={() => setFilterCategory('decorations')}
                    >
                        Decorations
                    </button>
                </div>

                <Row className="gallery-container">
                    {filteredImages.map((image, index) => (
                        <Col lg={4} md={6} sm={12} className="gallery-item" key={image.id} data-aos="zoom-in" data-aos-delay={index * 100}>
                            <div className="gallery-wrap">
                                <img src={image.src} alt={image.alt} className="img-fluid" />
                                <div className="gallery-info">
                                    <h4>{image.title}</h4>
                                    <p>{image.category}</p>
                                    <div className="gallery-links">
                                        <button onClick={() => openLightbox(index)} className="gallery-lightbox">
                                            <FaSearchPlus />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>

            {/* Lightbox */}
            {lightboxOpen && (
                <div className="gallery-lightbox-container" onClick={closeLightbox}>
                    <button className="close-lightbox" onClick={closeLightbox}>
                        <FaTimes />
                    </button>
                    <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                        <img src={filteredImages[currentImage].src} alt={filteredImages[currentImage].alt} />
                        <div className="lightbox-caption">
                            <h4>{filteredImages[currentImage].title}</h4>
                            <p>{filteredImages[currentImage].category}</p>
                        </div>
                        <button className="lightbox-prev" onClick={prevImage}>
                            <FaChevronLeft />
                        </button>
                        <button className="lightbox-next" onClick={nextImage}>
                            <FaChevronRight />
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Gallery;