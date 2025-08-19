import Blog from "@/components/Blog";
import FeaturedVechicles from "@/components/FeaturedVechicles";
import HeroContent from "@/components/HeroContent";
import MainContainer from "@/components/MainContainer";
import PopularCategories from "@/components/PopularCategories";
import SkeletonLoading from "@/components/SkeletonLoading";
import { Suspense } from "react";

export default async function Home() {
  return (
    <MainContainer>
      <HeroContent />
      <section className="inner-container mt-[70px]">
        <h1 className="text-3xl font-bold">Featured Vechicles</h1>
        <Suspense fallback={<SkeletonLoading />}>
          <FeaturedVechicles />
        </Suspense>
      </section>
      <PopularCategories />
      <Blog />
    </MainContainer>
  );
}
