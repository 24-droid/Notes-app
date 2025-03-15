import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import StudentLearningAnimation from './assets/Student-Learning.json'; // Import the JSON file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faVideo, faLock } from '@fortawesome/free-solid-svg-icons';

function Home() {
  const [Lottie, setLottie] = useState(null);
  const featuresRef = useRef(null); // Ref for the Features section
  const [isVisible, setIsVisible] = useState(false); // State to track visibility

  useEffect(() => {
    // Dynamically import Lottie on the client side
    import('lottie-react').then((module) => {
      setLottie(() => module.default);
    });

    // Set up IntersectionObserver for scroll-based animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true); // Trigger animation when section is in view
            observer.unobserve(entry.target); // Stop observing after animation triggers
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of the section is visible
    );

    if (featuresRef.current) {
      observer.observe(featuresRef.current); // Start observing the Features section
    }

    // Cleanup observer on unmount
    return () => {
      if (featuresRef.current) {
        observer.unobserve(featuresRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Unlock Your Potential with <span className="text-blue-600">DSVICTORY</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Access high-quality notes and video lectures curated by expert educators to excel in your studies.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/notes"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
            >
              Explore Notes
            </Link>
            <Link
              to="/videos"
              className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition duration-300"
            >
              Watch Videos
            </Link>
          </div>
        </div>
        <div className="mt-12">
          {/* Render Lottie animation only on the client side */}
          {typeof window !== 'undefined' && Lottie && (
            <div className="w-80 h-80 max-w-2xl mx-auto">
              <Lottie
                animationData={StudentLearningAnimation} // Use the imported JSON file
                loop={true} // Loop the animation
                autoplay={true} // Autoplay the animation
                className="w-full h-auto"
              />
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="bg-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-12">Why Choose DSVICTORY?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Notes Feature */}
            <div
              className={`bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${
                isVisible ? 'animate-fade-in-delay-1' : 'opacity-0'
              }`}
            >
              <FontAwesomeIcon
                icon={faBook}
                className="w-24 h-24 mx-auto mb-6 text-blue-600"
              />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Comprehensive Notes</h3>
              <p className="text-gray-600">
                Detailed and easy-to-understand notes for all subjects.
              </p>
            </div>

            {/* Videos Feature */}
            <div
              className={`bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${
                isVisible ? 'animate-fade-in-delay-2' : 'opacity-0'
              }`}
            >
              <FontAwesomeIcon
                icon={faVideo}
                className="w-24 h-24 mx-auto mb-6 text-purple-600"
              />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Engaging Video Lectures</h3>
              <p className="text-gray-600">
                Interactive video lectures by top educators.
              </p>
            </div>

            {/* Access Feature */}
            <div
              className={`bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${
                isVisible ? 'animate-fade-in-delay-3' : 'opacity-0'
              }`}
            >
              <FontAwesomeIcon
                icon={faLock}
                className="w-24 h-24 mx-auto mb-6 text-green-600"
              />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">24/7 Access</h3>
              <p className="text-gray-600">
                Learn anytime, anywhere at your own pace.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-12">What Our Students Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <p className="text-gray-600 italic mb-6">
                "The notes and videos helped me score top grades in my exams. Highly recommended!"
              </p>
              <h4 className="text-xl font-bold text-gray-900">- Harshad Gupta</h4>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <p className="text-gray-600 italic mb-6">
                "The platform is user-friendly, and the content is top-notch. A game-changer for students!"
              </p>
              <h4 className="text-xl font-bold text-gray-900">- Rohan Sharma</h4>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-900 py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-300">
            © {new Date().getFullYear()} DSVICTORY. All rights reserved.
          </p>
          <p className="text-gray-400 mt-2">
            Founded by <span className="font-semibold">Dharam Singh Chauhan</span>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Home;