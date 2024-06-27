import React from 'react';
import './our_services.scss';
import photography from '../images/jpeg/photography.jpg';
import videography from '../images/jpeg/videography.jpg';
import drone from '../images/jpeg/drone.jpg';
import studioShoot from '../images/jpeg/studio_shoot.webp';
import equipment from '../images/jpeg/equipment.jpeg';
import postProduction from '../images/jpeg/post_production.png';

const OurServices = () => (
  <div id="our_services">
    <div id="our_sercices_text">
      <div className="h5_h2_p">
        <h5>
          <span>Our</span>
          Services
        </h5>
        <h2>What We Can Provide</h2>
      </div>
      <p>
        At Firm Media, we specialize in delivering top-tier visual
        content through photography, videography, drone shoots,
        and studio sessions. We also offer equipment leasing and
        comprehensive post-production services to ensure your projects
        are polished and professional. Let us help you capture and
        create unforgettable moments.
      </p>
    </div>
    <div id="our_services_card_container">
      <div className="our_services_item">
        <img
          className="responsive_image"
          src={photography}
          alt="our_services"
        />
        <h3>Photography</h3>
        <p>
          we offer exceptional photography services that capture
          the essence of every moment. Whether it&apos;s a corporate
          event, wedding, portrait session, or any special occasion,
          our experienced photographers use the latest equipment and
          techniques to deliver stunning images that tell your story
          beautifully. Let us help you preserve your most cherished
          memories with our professional photography services.
        </p>
      </div>
      <div className="our_services_item">
        <img
          className="responsive_image"
          src={videography}
          alt="our_services"
        />
        <h3>Videography</h3>
        <p>
          our videography services capture the essence of your moments
          with cinematic quality and creativity. From events and promotional
          videos to documentaries and commercials, our skilled team ensures
          each project is tailored to your vision, delivering engaging and
          visually stunning content. Trust us to bring your stories to life
          through the power of video.
        </p>
      </div>
      <div className="our_services_item">
        <img
          className="responsive_image"
          src={drone}
          alt="our_services"
        />
        <h3>Drone Shoot</h3>
        <p>
          Experience breathtaking aerial perspectives with our professional
          drone shoot services. Whether for weddings, real estate, events,
          or promotional content, our skilled operators use cutting-edge
          technology to capture stunning high-definition footage from above.
          Elevate your visual storytelling with unparalleled views and dynamic
          shots that only drone photography can provide.
        </p>
      </div>
      <div className="our_services_item">
        <img
          className="responsive_image"
          src={studioShoot}
          alt="our_services"
        />
        <h3>Studio Shoot</h3>
        <p>
          Our studio shoots at Firm Media provide a controlled
          environment equipped with state-of-the-art lighting,
          backdrops, and equipment to bring your creative vision
          to life. Whether you&apos;re looking to capture professional
          portraits, product images, or artistic concepts, our
          team is dedicated to delivering high-quality results
          tailored to your needs. Experience the perfect blend
          of creativity and precision in our studio.
        </p>
      </div>
      <div className="our_services_item">
        <img
          className="responsive_image"
          src={equipment}
          alt="our_services"
        />
        <h3>Equipment Rent</h3>
        <p>
          Firm Media offers a wide range of high-quality equipment for
          lease, catering to all your photography and videography needs.
          Whether you&apos;re an amateur or a professional, we have the latest
          cameras, lenses, lighting, and drone technology to help you achieve
          the perfect shot. Enjoy flexible rental terms and exceptional support,
          ensuring you have the right tools for every project.
        </p>
      </div>
      <div className="our_services_item">
        <img
          className="responsive_image"
          src={postProduction}
          alt="our_services"
        />
        <h3>Post-Production</h3>
        <p>
          our post-production services transform raw footage into captivating visual
          stories. Whether it&apos;s editing, color grading, sound design, or finalizing
          visual effects, our team ensures every detail enhances your project&apos;s impact.
          Trust us to elevate your content with precision and creativity in every frame.
        </p>
      </div>
    </div>
  </div>
);

export default OurServices;
