import React from 'react'
import { FaInstagram, FaTwitter, FaEnvelope } from 'react-icons/fa';
function Footer() {
  return (
    <footer class="bg-gradient-to-br from-blue-600 to-blue-950 text-white py-12 px-10">
    <div class="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
      
      {/* <!-- About Section --> */}
      <div>
        <h2 class="text-lg font-bold mb-2">About RealHome</h2>
        <p class="text-sm">
          RealHome is a user-friendly platform that makes finding your perfect home simple and accessible. We offer an extensive list of properties and allow you to communicate directly with homeowners. Whether you’re looking to buy or rent, RealHome is here to help you every step of the way.
        </p>
      </div>
      
      {/* <!-- Explore Section --> */}
      <div>
        <h2 class="text-lg font-bold mb-2">Explore</h2>
        <ul class="text-sm space-y-2">
          <li><a href="#buy" class="hover:underline">Buy a Home</a></li>
          <li><a href="#rent" class="hover:underline">Rent a Home</a></li>
          <li><a href="#sell" class="hover:underline">List Your Property</a></li>
          <li><a href="#blog" class="hover:underline">Blog & Resources</a></li>
          <li><a href="#about" class="hover:underline">About Us</a></li>
          <li><a href="#contact" class="hover:underline">Contact Us</a></li>
        </ul>
      </div>
      
      {/* <!-- Popular Locations Section --> */}
      <div>
        <h2 class="text-lg font-bold mb-2">Popular Locations</h2>
        <ul class="text-sm space-y-2">
          <li><a href="#locations/new-york" class="hover:underline">New York</a></li>
          <li><a href="#locations/los-angeles" class="hover:underline">Los Angeles</a></li>
          <li><a href="#locations/san-francisco" class="hover:underline">San Francisco</a></li>
          <li><a href="#locations/miami" class="hover:underline">Miami</a></li>
          <li><a href="#locations/chicago" class="hover:underline">Chicago</a></li>
        </ul>
      </div>
  
      {/* <!-- Newsletter Subscription Section --> */}
      <div>
        <h2 class="text-lg font-bold mb-2">Stay Updated</h2>
        <p class="text-sm mb-4">
          Subscribe to our newsletter to get the latest property listings, news, and exclusive offers directly in your inbox.
        </p>
        <form action="#" method="POST" class="flex flex-col">
          <input type="email" name="email" placeholder="Enter your email" class="p-2 rounded mb-2 text-gray-800" required />
          <button type="#" class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            Subscribe
          </button>
        </form>
      </div>
    </div>
  
    {/* <!-- Social Media and Contact Section --> */}
    <div class="mt-8">
      <div class="container mx-auto flex flex-col md:flex-row justify-between items-center text-sm">
        <div class="flex space-x-4">
          <a href="#https://www.instagram.com" aria-label="Instagram" class="hover:text-blue-400">
            <FaInstagram size={24} />
          </a>
          <a href="#mailto:support@realhome.com" aria-label="Email" class="hover:text-blue-400">
            <FaEnvelope size={24} />
          </a>
          <a href="#www.twitter.com" aria-label="Twitter" class="hover:text-blue-400">
            <FaTwitter size={24} />
          </a>
        </div>
        <div class="mt-4 md:mt-0">
          <a href="#terms" class="hover:underline mr-4">Terms & Conditions</a>
          <a href="#privacy" class="hover:underline">Privacy Policy</a>
        </div>
      </div>
    </div>
  
    {/* <!-- Bottom Section --> */}
    <div class="border-t border-gray-700 mt-8 pt-4 flex items-center justify-center flex-col">
        <div>
            Made by Nakka Sai Sankar
        </div>
      <div class="container mx-auto text-center text-sm">
        &copy; 2024 RealHome. All rights reserved.
      </div>
    </div>
  </footer>
  

  )
}

export default Footer