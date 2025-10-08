import HeroSearch from "./HeroSearch";

export default async function HeroContent() {
  return (
    <section className="inner-container">
      <div className="display mt-[80px] flex w-full flex-col items-center justify-center">
        <div>
          <h1 className="font-inter mb-2 text-center text-3xl leading-tight font-extrabold md:text-6xl">
            Drive the Future You Deserve
          </h1>
          <p className="text-subPrimary mb-6 text-center text-base font-normal">
            Browse thousands of trusted listings, compare deals, and drive away
            with confidence.
          </p>
        </div>
        <HeroSearch />
      </div>
    </section>
  );
}
