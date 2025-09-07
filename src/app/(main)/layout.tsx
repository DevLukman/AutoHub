import Navigation from "../../components/Navigation";
import MobileNavigation from "../../components/MobileNavigation";
import Footer from "../../components/Footer";
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navigation />
      <MobileNavigation />
      <main className="outer-container my-4 w-full">
        {children}
        <Footer />
      </main>
    </>
  );
}
