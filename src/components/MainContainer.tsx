import Footer from "./Footer";
import MobileNavigation from "./MobileNavigation";
import Navigation from "./Navigation";

export default function MainContainer({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navigation />
      <MobileNavigation />
      <main className="outer-container mt-[16px] w-full">
        {children}
        <Footer />
      </main>
    </>
  );
}
