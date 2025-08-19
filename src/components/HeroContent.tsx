import HeroSearch from "./HeroSearch";

export default async function HeroContent() {
  return (
    <section className="inner-container">
      <div className="display mt-[80px] flex w-full flex-col items-center justify-center">
        <div>
          <h1 className="font-inter mb-2 text-center text-3xl leading-tight font-extrabold md:text-6xl">
            Discover Your Dream Ride
          </h1>
          <p className="text-subPrimary mb-6 text-center text-base md:text-lg">
            Explore thousands of quality vehicles at unbeatable prices
          </p>
        </div>
        <HeroSearch />
      </div>
    </section>
  );
}
