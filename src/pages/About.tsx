const About = () => {
  return (
    <>
      <div className="flex flex-wrap gap-2 sm:gap-x-6 items-center justify-center">
        <h1 className="text-4xl font-bold leading-none tracking-tight sm:text-6xl">
          We love
        </h1>
        <div className="stats bg-primary shadow">
          <div className="stat">
            <div className="stat-title text-primary-content text-4xl font-bold tracking-widest">
              comfy
            </div>
          </div>
        </div>
      </div>
      <p className="mt-8 text-lg leading-8 max-w-2xl mx-auto">
        Welcome to Comfy Store, your one-stop shop for stylish and comfortable
        furniture. Discover a wide selection of tables, chairs, sofas, beds, and
        more to create your dream home. Our curated collection showcases
        high-quality pieces sourced from trusted manufacturers, ensuring
        durability and style. Transform your space into a cozy haven with Comfy
        Store - where comfort and design meet.
      </p>
    </>
  );
};
export default About;
