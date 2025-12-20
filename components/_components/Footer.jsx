import {
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaGithub,
    FaDribbble,
  } from "react-icons/fa";
  
  export default function Footer() {
    return (
      <footer className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          {/* Top */}
          <div className="lg:flex lg:items-start lg:gap-8">
            {/* Logo */}
            <div className="text-lime-600">
              <svg
                className="h-8"
                viewBox="0 0 28 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.2639 2.90424C7.6714 1.02234 10.6393 0 13.695 0C16.7507 0 19.7186 1.02234 22.1261 2.90424C24.5336 4.7861 26.2422 7.4194 26.98 10.3847H25.78C23.7557 10.3549 21.7729 10.9599 20.11 12.1147C18.4471 13.2695 16.4643 13.8745 14.44 13.8447H12.95C10.9257 13.8745 8.9429 13.2695 7.28 12.1147C5.6171 10.9599 3.6343 10.3549 1.61 10.3847H0.41Z"
                  fill="currentColor"
                />
              </svg>
            </div>
  
            {/* Content */}
            <div className="mt-8 grid grid-cols-2 gap-8 lg:mt-0 lg:grid-cols-5 lg:gap-y-16">
              {/* Newsletter */}
              <div className="col-span-2">
                <h2 className="text-2xl font-bold text-gray-900">
                  Get the latest news!
                </h2>
  
                <p className="mt-4 text-gray-500">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Esse non cupiditate quae nam molestias.
                </p>
              </div>
  
              {/* Sign up */}
              <div className="col-span-2 lg:col-span-3 lg:flex lg:items-end">
                <form className=" flex  gap-2">
                  <div className="border border-gray-200 p- sm:flex sm:gap-4">
                    <input
                      type="email"
                      placeholder="john@rhcp.com"
                      className="w-80 border-none px-2 py-2 text-sm focus:outline-none"
                    />
  
                  </div>
                    <button
                      type="submit"
                      className="mt-2 w-full bg-lime-600 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-lime-700 sm:mt-0 sm:w-auto"
                    >
                      Sign up
                    </button>
                </form>
              </div>
  
              {/* Services */}
              <div>
                <p className="font-medium text-gray-900">Services</p>
                <ul className="mt-6 space-y-4 text-sm text-gray-600">
                  <li>1on1 Coaching</li>
                  <li>Company Review</li>
                  <li>Accounts Review</li>
                  <li>HR Consulting</li>
                  <li>SEO Optimisation</li>
                </ul>
              </div>
  
              {/* Company */}
              <div>
                <p className="font-medium text-gray-900">Company</p>
                <ul className="mt-6 space-y-4 text-sm text-gray-600">
                  <li>About</li>
                  <li>Meet the Team</li>
                  <li>Accounts Review</li>
                </ul>
              </div>
  
              {/* Helpful Links */}
              <div>
                <p className="font-medium text-gray-900">Helpful Links</p>
                <ul className="mt-6 space-y-4 text-sm text-gray-600">
                  <li>Contact</li>
                  <li>FAQs</li>
                  <li>Live Chat</li>
                </ul>
              </div>
  
              {/* Legal */}
              <div>
                <p className="font-medium text-gray-900">Legal</p>
                <ul className="mt-6 space-y-4 text-sm text-gray-600">
                  <li>Accessibility</li>
                  <li>Returns Policy</li>
                  <li>Refund Policy</li>
                  <li>Hiring Statistics</li>
                </ul>
              </div>
  
              {/* Downloads */}
              <div>
                <p className="font-medium text-gray-900">Downloads</p>
                <ul className="mt-6 space-y-4 text-sm text-gray-600">
                  <li>Marketing Calendar</li>
                  <li>SEO Infographics</li>
                </ul>
              </div>
  
              {/* Social icons */}
              <ul className="col-span-2 flex gap-6 lg:col-span-5 lg:justify-end">
                <li>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-600 hover:text-lime-600 transition"
                  >
                    <FaFacebookF size={20} />
                  </a>
                </li>
                <li>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-600 hover:text-lime-600 transition"
                  >
                    <FaInstagram size={20} />
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-600 hover:text-lime-600 transition"
                  >
                    <FaTwitter size={20} />
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-600 hover:text-lime-600 transition"
                  >
                    <FaGithub size={20} />
                  </a>
                </li>
                <li>
                  <a
                    href="https://dribbble.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-600 hover:text-lime-600 transition"
                  >
                    <FaDribbble size={20} />
                  </a>
                </li>
              </ul>
            </div>
          </div>
  
          {/* Bottom */}
          <div className="mt-12 border-t border-gray-100 pt-8 sm:flex sm:items-center sm:justify-between">
            <p className="text-xs text-gray-500">
            © 2025 Zaynab Abdullah. All rights reserved.
            </p>
  
            <ul className="mt-4 flex gap-4 text-xs text-gray-500 sm:mt-0">
              <li>Terms</li>
              <li>Privacy</li>
              <li>Cookies</li>
            </ul>
          </div>
        </div>
      </footer>
    );
  }
  