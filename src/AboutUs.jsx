import React from 'react';

const AboutUs = () => {
  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div className="row g-5">
          <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s" style={{ minHeight: '400px' }}>
            <div className="relative h-full">
              <img
                className="img-fluid absolute inset-0 w-full h-full object-cover rounded-lg"
                src="assets/about.jpeg"
                alt="About Us"
              />
            </div>
          </div>
          <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.3s">
            <h6 className="section-title bg-white text-start text-primary pr-3">About Us</h6>
            <h1 className="mb-4">Welcome to <span className="text-primary">BOBO!</span></h1>
            <p className="mb-4">
            Your trusted companion for seamless hotel booking experiences!
At BOBO, we believe that travel should be as easy and enjoyable as the destination itself. Whether you’re planning a luxurious getaway, a business trip, or a spontaneous weekend escape, our platform is here to connect you with the perfect accommodations.
            </p>
            <p className="mb-4">
            At BOBO, we’re passionate about helping travelers create unforgettable memories. That’s why we constantly strive to enhance our services and provide you with a booking experience that’s simple, secure, and personalized.

Start your journey with BOBO today—because every great trip begins with a great place to stay.
            </p>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
