import { Carousel } from 'antd';
import './index.css';
import img3 from '../../assets/images/header3.png';
import Statistics from '../../components/statistic';
import HairSalonPoints from '../../components/point';
import Header from '../../components/header';
import Footer from '../../components/footer';
import React from 'react';

const services = [
    {
        icon: "https://cdn4.iconfinder.com/data/icons/baber-shop-1/64/hair-people-person-male-boy-man-head-hair_salon-shapescissors-haircut-256.png",
        title: "Basic Haircut",
        description: "A simple and clean haircut to keep you looking sharp."
    },
    {
        icon: "https://cdn3.iconfinder.com/data/icons/spa-element-9/64/Spa-treatments-mask-skin-beauty-256.png",
        title: "Peel off Acne",
        description: "Effective acne treatment to clear your skin and boost your confidence."
    },
    {
        icon: "https://cdn2.iconfinder.com/data/icons/barber-salon-2/64/Barber_hair_styling_cosmetic_package_pomade-256.png",
        title: "Hair styling",
        description: "Professional hair styling to give you a fresh and trendy look."
    },
    {
        icon: "https://cdn3.iconfinder.com/data/icons/barbershop-jumpicon-line/32/-__beard_trimming_grooming_facial_hair_barbering_personal_care-256.png",
        title: "Beard trimming",
        description: "Expert beard trimming to keep your facial hair neat and stylish."
    },
    {
        icon: "https://cdn2.iconfinder.com/data/icons/hair-care-3/496/hair-root-treatment-dying-salon-256.png",
        title: "Hair Dying",
        description: "High-quality hair dyeing services to give you a vibrant new color."
    },
    {
        icon: "https://cdn1.iconfinder.com/data/icons/modelling-agency-3/68/HAIR_STYLIST_MALE_hair_salon_cutting_curling_fashion_news_modeling_agency-256.png",
        title: "Hair Curling",
        description: "Beautiful hair curling to add volume and style to your hair."
    },
    {
        icon: "https://cdn0.iconfinder.com/data/icons/hair-salon-1/312/barber-hairdressing-hairstylist-006-256.png",
        title: "Hair Washing",
        description: "Refreshing hair washing to cleanse and rejuvenate your scalp."
    },
    {
        icon: "https://cdn2.iconfinder.com/data/icons/skincare-solid/64/massage_skincare_facial_skin_woman_spa_self_care-256.png",
        title: "Massage",
        description: "Relaxing massage services to relieve stress and tension."
    },
    {
        icon: "https://cdn1.iconfinder.com/data/icons/spa-38/512/ear_spa-massage-spa-relax-256.png",
        title: "Earwax",
        description: "Safe and gentle earwax removal for better hearing and comfort."
    },
    {
        icon: "https://cdn2.iconfinder.com/data/icons/hair-care-5/512/hair-care-scalp-21-256.png",
        title: "Scalp care services",
        description: "Comprehensive scalp care to promote healthy hair growth."
    }
];

function Home() {
    return (
        <div className="home-container">
        <Header/>
            <h1>WELCOME TO HAIR HAMONY SALON</h1>

            <Carousel arrows infinite={true} autoplay autoplaySpeed={5000}>
                <div>
                    <img 
                        src="https://cdn.prod.website-files.com/644a9d9ce529ef8812f82a28/647fb85c69e95444243ef9bd_Henley%27s%20Gentlemen%27s%20Grooming%20-%20Barbershop%20and%20Mens%20Grooming.webp" 
                        alt="" 
                        style={{ 
                            width: '100%', 
                            height: '600px', 
                            objectFit: 'cover' 
                        }} 
                    />
                </div>
                <div>
                    <img 
                        src="https://hairsalonbarrie.ca/wp-content/uploads/2022/10/mens-salon.jpg" 
                        alt="" 
                        style={{ 
                            width: '100%', 
                            height: '600px', 
                            objectFit: 'cover' 
                        }} 
                    />
                </div>
                <div>
                    <img 
                        src={img3} 
                        alt="" 
                        style={{ 
                            width: '100%', 
                            height: '600px', 
                            objectFit: 'cover' 
                        }} 
                    />
                </div>
            </Carousel>

            <HairSalonPoints />
            
            <Statistics />

            <div className="services">
                <h2>Hair Hamony Services</h2>
                <div className="services-grid">
                    {services.map((service, index) => (
                        <div key={index} className="service-item">
                            <img src={service.icon} alt={service.title} className="service-icon" />
                            <h3>{service.title}</h3>
                            <p>{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="hair-salon-detailing">
                <div className="image-section">
                    <img
                        src="https://img.freepik.com/free-photo/young-man-barbershop-trimming-hair_1303-26254.jpg?size=626&ext=jpg&ga=GA1.1.1819120589.1726704000&semt=ais_hybrid"
                        alt=""
                        className="hair-salon-image"
                    />
                </div>
                <div className="content-section">
                    <h3 className="about-us">ABOUT US</h3>
                    <h1 className="title">Male Hair Salon And Detailing</h1>
                    <p className="description">
                    Hair Hamony is a place that provides grooming and hairstyling services specifically for men. Common services at a male hair salon include:
                    </p>
                    <ul className="services-list">
                      <div className="column">
                        <li>Basic Haircut</li>
                        <li>Peel off Acne</li>
                        <li>Hair styling</li>
                        <li>Beard trimming</li>
                        <li>Hair Dying</li>
                      </div>
                      <div className="column">
                        <li>Hair Curling</li>
                        <li>Hair Washing</li>
                        <li>Massage</li>
                        <li>Earwax</li>
                        <li>Scalp care services</li>
                      </div>
                    </ul>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default Home;