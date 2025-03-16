import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import StudentLearningAnimation from './assets/Student-Learning.json'; // Import the JSON file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faVideo, faLock, faCheckCircle, faUsers, faChartLine, faTrophy } from '@fortawesome/free-solid-svg-icons';

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

      {/* Success Stories Section */}
      <section className="bg-gray-50 py-16 blocks">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-12">Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Story 1 */}
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <FontAwesomeIcon
                icon={faTrophy}
                className="w-16 h-16 mx-auto mb-6 text-yellow-500"
              />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">John Doe</h3>
              <p className="text-gray-600">
                "DSVICTORY helped me score top grades in my exams. Highly recommended!"
              </p>
            </div>

            {/* Story 2 */}
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <FontAwesomeIcon
                icon={faChartLine}
                className="w-16 h-16 mx-auto mb-6 text-green-500"
              />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Jane Smith</h3>
              <p className="text-gray-600">
                "The platform is user-friendly, and the content is top-notch. A game-changer!"
              </p>
            </div>

            {/* Story 3 */}
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <FontAwesomeIcon
                icon={faUsers}
                className="w-16 h-16 mx-auto mb-6 text-blue-500"
              />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Alex Johnson</h3>
              <p className="text-gray-600">
                "I improved my grades significantly with DSVICTORY's resources."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-12">Pricing Plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Basic Plan */}
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Basic</h3>
              <p className="text-gray-600 mb-6">Perfect for beginners</p>
              <p className="text-4xl font-bold text-blue-600 mb-6">$9.99/month</p>
              <ul className="text-gray-600 mb-6">
                <li className="mb-2">
                  <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 mr-2" />
                  Access to Notes
                </li>
                <li className="mb-2">
                  <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 mr-2" />
                  Limited Videos
                </li>
              </ul>
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
                Get Started
              </button>
            </div>

            {/* Pro Plan */}
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Pro</h3>
              <p className="text-gray-600 mb-6">For serious learners</p>
              <p className="text-4xl font-bold text-purple-600 mb-6">$19.99/month</p>
              <ul className="text-gray-600 mb-6">
                <li className="mb-2">
                  <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 mr-2" />
                  Access to All Notes
                </li>
                <li className="mb-2">
                  <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 mr-2" />
                  Unlimited Videos
                </li>
                <li className="mb-2">
                  <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 mr-2" />
                  Priority Support
                </li>
              </ul>
              <button className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors">
                Get Started
              </button>
            </div>

            {/* Premium Plan */}
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Premium</h3>
              <p className="text-gray-600 mb-6">For top performers</p>
              <p className="text-4xl font-bold text-green-600 mb-6">$29.99/month</p>
              <ul className="text-gray-600 mb-6">
                <li className="mb-2">
                  <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 mr-2" />
                  Access to All Notes
                </li>
                <li className="mb-2">
                  <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 mr-2" />
                  Unlimited Videos
                </li>
                <li className="mb-2">
                  <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 mr-2" />
                  One-on-One Mentorship
                </li>
              </ul>
              <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-600 py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Join DSVICTORY Today!</h2>
          <p className="text-xl text-gray-200 mb-8">
            Start your journey towards academic excellence with our comprehensive resources.
          </p>
          <Link
            to="/upload"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300"
          >
            Get Started
          </Link>
        </div>
      </section>

    </div>
  );
}

export default Home;