export const dynamic = "force-dynamic";
import { getUserSession } from "../../lib/actions/getSession";
import Footer from "../../components/Footer";
import MobileNavigation from "../../components/MobileNavigation";
import Navigation from "../../components/Navigation";
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getUserSession();
  return (
    <>
      <Navigation session={session || null} />
      <MobileNavigation session={session || null} />
      <main className="outer-container my-4 w-full">
        {children}
        <Footer />
      </main>
    </>
  );
}
