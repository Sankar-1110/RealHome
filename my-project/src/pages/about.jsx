import { FaInstagram, FaTwitter, FaEnvelope } from 'react-icons/fa';

export const About=()=>{
return(
    <div className="px-4 sm:px-10 md:px-40 lg:px-56 mt-28 sm:mt-32 bg-white pb-20">
      <h1 className="text-2xl sm:text-4xl text-slate-600 font-bold">About Real Home</h1>
      <br/>
     <p className="text-slate-600 font-semibold">
     Welcome to RealHome, your trusted partner in finding the perfect place to call home. Whether you're looking to buy your dream house or find the ideal rental, we're here to make the process seamless and enjoyable
     <br/>
     <span className="">Extensive Listings:</span> Explore a wide range of properties, from cozy apartments to luxurious houses, all in one place.
     <br/>
<span>Detailed Information: </span>Access comprehensive details about each property, including high-quality photos, virtual tours, and neighborhood insights.
<br/>
<span>Personalized Service:</span>
 Receive personalized recommendations and expert advice to help you make informed decisions.
     </p>
     <h1 className="text-2xl text-slate-600 font-bold my-3">Our Mission</h1>
     <p className="text-slate-600 font-semibold">
     Our mission is to revolutionize the real estate market by offering a transparent, efficient, and enjoyable experience for buyers, sellers, landlords, and renters. We aim to connect people with their perfect homes through innovative technology, expert guidance, and a deep understanding of the market.
     </p>
     <h1 className="text-2xl text-slate-600 font-bold my-3">Why RealHome ?</h1>
     <p>At RealHome, we understand that finding the perfect home can be a challenging process. That’s why we've created an intuitive platform to simplify your search, allowing you to filter by location, price, size, and amenities, all in one place. We are committed to providing a user-friendly experience that helps you find homes that meet your needs, whether you're looking for a cozy apartment, a spacious family house, or a luxury property.</p>
     <h1 className="text-2xl text-slate-600 font-bold my-3">Connecting You with Homeowners</h1>
     <p>Our platform isn't just about listings – it's about making real connections. We provide direct communication between home seekers and property owners, allowing you to negotiate terms, ask questions, and make arrangements without intermediaries. This helps foster transparency and trust throughout the home-buying or renting process.</p>
     <h1 className="text-2xl text-slate-600 font-bold my-3">Get in Touch
     </h1>
     <p>Looking for your next home? Get started with RealHome today! Have any questions? Feel free to contact us, and we’ll be happy to assist you.</p>
     <br/>
      <div className='flex gap-4'>
        <FaInstagram  className='text-xl cursor-pointer'/>
        <FaEnvelope className='text-xl cursor-pointer'/>
        <FaTwitter  className='text-xl cursor-pointer'/>
      </div>
    </div>
    
)
}