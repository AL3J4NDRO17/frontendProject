import React, { useState, useEffect } from 'react';
import "../styles/homepage/homepage.css";
import "../styles/homepage/aboutHomepage.css";


import Perfil from  "../resources/Perfil Lic.png"

const HomePage = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            subtitle: "Caminadora Antigravedad",
            title: "AlterG llegó a México",
            description: "Tecnología diseñada por la NASA que facilita la rehabilitación de lesiones de miembros inferiores con menos dolor, ya que reduce el impacto en las articulaciones y mejora la movilidad articular.",
            image: "/api/placeholder/600/400"
        },
        {
            subtitle: "Innovación en Rehabilitación",
            title: "Tecnología de Vanguardia",
            description: "Descubre cómo nuestras soluciones están transformando la terapia física y la rehabilitación en México.",
            image: "/api/placeholder/600/400"
        }
    ];

    const cards = [
        {
            icon: "📢",
            title: "Noticias y Experiencias",
            text: "Queremos compartir contigo experiencias, noticias, testimonios pero sobre todo información de valor que creemos puede ser de tu interés."
        },
        {
            icon: "🏃",
            title: "Therapy en Movimiento",
            text: "Therapy en Movimiento, Rehabilitación especializada y digital para pacientes recuperados de coronavirus COVID-19, adultos mayores y mucho más."
        },
        {
            icon: "📍",
            title: "Encuentranos",
            text: "Nos puedes encontrar en nueve ubicaciones en tres estados de la República Mexicana y en la Ciudad de México. Te estamos esperando, estarás en las mejores manos."
        }
    ];
    const services = [
        {
            icon: "/path-to-icon1.svg", // Reemplaza con la ruta de tus iconos
            title: "Fisioterapia y rehabilitación",
            description: "La fisioterapia se encarga de valorar, detectar y dar tratamiento a la disfunción del sistema músculo esquelético, neurológico y cardiovascular entre otros, desempeñando un papel fundamental en la reincorporación a la vida social y productiva de nuestros pacientes.",
            link: "Ver Más"
        },
        {
            icon: "/path-to-icon2.svg",
            title: "Rehabilitación especializada",
            description: "La terapia especializada hace uso de la última tecnología, que nos ayuda a acelerar el proceso de tu recuperación, con el objetivo de acortar tiempos de tratamiento y obtener el mejor resultado. Terapias individualizadas para cada paciente dependiendo de la enfermedad.",
            link: "Ver Más"
        },
        {
            icon: "/path-to-icon3.svg",
            title: "Equipos y tecnología",
            description: "Contamos con el equipo tecnológico más avanzado e internacionalmente reconocido para ofrecer a nuestros pacientes las mejores opciones de tratamiento, así como acortar los tiempos de recuperación y rehabilitación.",
            link: "Ver Más"
        }
    ];

    const secondaryServices = [
        {
            icon: "/path-to-icon4.svg",
            title: "Clínicas y programas",
            description: "Contamos con una variedad de programas, clínicas y proyectos que aportan nuevas opciones y tratamientos a nuestros pacientes. Conócenos y siéntete seguro que, en nuestras manos, tu salud está asegurada.",
            link: "Ver Más"
        },
        {
            icon: "/path-to-icon5.svg",
            title: "Terapia a domicilio",
            description: "Sabemos que algunas situaciones pueden complicar el traslado del paciente a nuestras unidades, por eso facilitamos el tratamiento en la comodidad de tu hogar. Recibe atención a domicilio desde cualquiera de nuestras unidades, en CDMX e interior de la República.",
            link: "Ver Más"
        },
        {
            icon: "/path-to-icon6.svg",
            title: "Equipos en renta",
            description: "Contamos con los mejores equipos y tecnología a nivel internacional. Conoce nuestras opciones para equipos en renta, accede al mejor equipo sin la necesidad de desembolsar una gran cantidad de dinero.",
            link: "Ver Más"
        }
    ];

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    // Auto-play del slider
    useEffect(() => {
        const timer = setInterval(nextSlide, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="homepage">
            {/* Hero Slider */}
            <section className="hero-slider">
                <div className="container-homepage">
                    <div className="slide fade-in">
                        <div className="slide-content">
                            <div className="slide-text">
                                <h3 className="slide-subtitle">{slides[currentSlide].subtitle}</h3>
                                <h2 className="slide-title">{slides[currentSlide].title}</h2>
                                <p className="slide-description">{slides[currentSlide].description}</p>
                                <div className="button-group">
                                    <button className="btn btn-primary">LEER MÁS</button>
                                    <button className="btn btn-outline">
                                        Video Informativo
                                    </button>
                                </div>
                            </div>
                            <div className="slide-image">
                                <img
                                    src={slides[currentSlide].image}
                                    alt={slides[currentSlide].title}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="slider-controls">
                    <button className="slider-control" onClick={prevSlide}>
                        &larr;
                    </button>
                    <button className="slider-control" onClick={nextSlide}>
                        &rarr;
                    </button>
                </div>
            </section>

            {/* Cards Section */}
            <section className="cards-section">
                <div className="container-cards">
                    <div className="cards-grid">
                        {cards.map((card, index) => (
                            <div key={index} className="card fade-in">
                                <div className="card-icon">{card.icon}</div>
                                <h3 className="card-title">{card.title}</h3>
                                <p className="card-text">{card.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section className="about-section">
                <div className="about-container">
                    <div className="about-header">
                        <p className="about-tagline">SOMOS EL CENTRO DE FISIOTERAPIA Y REHABILITACIÓN MAS CONFIABLE DE HUEJUTLA.</p>
                        <h1 className="about-title">Centro de Fisioterapia y Rehabilitación - PROphysio</h1>
                    </div>

                    <div className="about-experience">
                        <span className="about-experience-text">Lic. en Fisioterapia Lizbeth Mendoza.</span>
                    </div>

                    <div className="about-content">
                        <div className="about-text-content">
                            <h2 className="about-subtitle">¿Quiénes somos?</h2>

                            <p className="about-description">
                            <strong>Visión:</strong> Ser una clínica de fisioterapia reconocida por su 
                            constante capacitación y actualización en los temas relacionados 
                            en rehabilitación y bienestar para sus pacientes y trabajadores con enfoque personalista
                            </p>

                            <p className="about-description">
                            <strong>Misión:</strong> contribuir en la salud y bienestar de la población infantil, adulta y adulta mayor, 
                            poniendo a su disposición servicios de calidad a través de diversos métodos y técnicas de 
                            intervención de fisioterapia reconociendo el valor y dignidad de cada paciente
                            </p>

                            <ul className="about-features">
                                <li>Diplomado Internacional de Fisioterapia en Oncología.</li>
                                <li>Diplomado en Evaluación e Intervención en Desarrollo Motriz.</li>
                                <li>Certificación Internacional en Linfoterapia.</li>
                                <li>Certificación en Terapia Manual Instrumentalizada.
                                </li>
                                <li>Certificación Internacional DYNAMIC TAPING.</li>
                                <li>Certificación Internacional Taping Neuro Muscular.</li>
                                
                            </ul>
                        </div>

                        <div className="about-image">
                            <img
                                src={Perfil}
                                alt="Profesional de la salud"
                                className="about-doctor-image"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="services-section">
                <div className="services-grid">
                    {services.map((service, index) => (
                        <div key={index} className="service-card fade-in">
                            <div className="service-icon">
                                <img src={service.icon} alt={service.title} />
                            </div>
                            <h3 className="service-title">{service.title}</h3>
                            <p className="service-description">{service.description}</p>
                            <a href="#" className="service-link">{service.link}</a>
                        </div>
                    ))}
                </div>

                <div className="services-grid services-grid-secondary">
                    {secondaryServices.map((service, index) => (
                        <div key={index} className="service-card fade-in">
                            <div className="service-icon">
                                <img src={service.icon} alt={service.title} />
                            </div>
                            <h3 className="service-title">{service.title}</h3>
                            <p className="service-description">{service.description}</p>
                            <a href="#" className="service-link">{service.link}</a>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default HomePage;