import { FeaturedLoading } from "../../components/LoadingSkeleton";
import PopularCategories from "../../components/PopularCategories";
import { Suspense } from "react";
import Blog from "../../components/Blog";
import FeaturedVechicles from "../../components/FeaturedVechicles";
import HeroContent from "../../components/HeroContent";
export default async function Home() {
  return (
    <>
      <HeroContent />
      <section className="inner-container mt-[70px]">
        <h1 className="text-3xl font-bold">Featured Vechicles</h1>
        <Suspense fallback={<FeaturedLoading />}>
          <FeaturedVechicles />
        </Suspense>
      </section>
      <PopularCategories />
      <Blog />
    </>
  );
}
