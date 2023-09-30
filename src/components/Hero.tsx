import { Link } from 'react-router-dom';

import hero1 from '../assets/hero1.webp';
import hero2 from '../assets/hero2.webp';
import hero3 from '../assets/hero3.webp';
import hero4 from '../assets/hero4.webp';

const carouselImages = [hero1, hero2, hero3, hero4];

const Hero = () => {
  return (
    <div className="grid lg:grid-cols-2 gap-24 items-center">
      <div>
        <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl">
          We are changing the way people shop.
        </h1>
        <p className="mt-8 max-w-xl text-lg leading-8">
          Welcome to Comfy Store, your one-stop shop for stylish and comfortable
          furniture. Discover a wide selection of tables, chairs, sofas, beds,
          and more to create your dream home. Our curated collection showcases
          high-quality pieces sourced from trusted manufacturers, ensuring
          durability and style.
        </p>
        <div className="mt-10">
          <Link to="/products" className="btn btn-primary">
            Our Products
          </Link>
        </div>
      </div>
      <div className="hidden h-[28rem] lg:carousel carousel-center p-4 space-x-4 bg-neutral rounded-box">
        {carouselImages.map((image, index) => (
          <div key={index} className="carousel-item">
            <img
              src={image}
              alt="Carousel Item Photo"
              className="rounded-box h-full w-80 object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default Hero;
