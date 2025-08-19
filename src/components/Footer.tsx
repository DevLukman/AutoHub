import Link from "next/link";
import {
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoTwitter,
} from "react-icons/io5";

export default function Footer() {
  return (
    <footer className="inner-container mt-[50px] pb-2">
      <div className="flex w-full flex-col justify-between pb-6 md:flex-row">
        <div className="flex flex-col gap-10 md:flex-row md:gap-16">
          <div>
            <h1 className="mb-4 text-xl font-semibold">AutoHub</h1>
            <p className="text-subPrimary text-sm font-normal md:max-w-[300px] lg:max-w-[300px]">
              We&apos;re dedicated to helping you find the perfect vehicle for
              your needs, offering a wide selection of quality cars at
              competitive prices.
            </p>
          </div>
          <div>
            <h2 className="mb-4 text-xl font-semibold">Quick Links</h2>
            <ul className="text-subPrimary space-y-3">
              <li className="text-sm">
                <Link href="/">Home</Link>
              </li>
              <li className="text-sm">
                <Link href="/">Search</Link>
              </li>
              <li className="text-sm">
                <Link href="/">Sell your car</Link>
              </li>
              <li className="text-sm">
                <Link href="/">Blog</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-10 md:flex-row md:gap-12">
          <div>
            <h1 className="mb-4 text-xl font-semibold">Contact us</h1>
            <p className="text-subPrimary mb-2 text-sm">
              1234 Car Street, Auto City, AC 12345
            </p>
            <p className="text-subPrimary mb-2 text-sm">
              Phone: (123) 456-7890
            </p>
            <p className="text-subPrimary text-sm">
              Email: info@carmarketplace.com
            </p>
          </div>
          <div>
            <h2 className="mb-4 text-xl font-semibold">Follow Us</h2>
            <div className="flex space-x-4">
              <Link href="/" className="transition duration-300">
                <IoLogoFacebook className="text-subPrimary hover:text-primary size-6" />
              </Link>
              <Link className="transition duration-300" href="/">
                <IoLogoTwitter className="text-subPrimary hover:text-primary size-6" />
              </Link>
              <Link
                className="text-muted-fg hover:text-fg transition duration-300"
                href="/"
              >
                <IoLogoInstagram className="text-subPrimary hover:text-primary size-6" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="border-border mt-4 flex flex-col items-center justify-between gap-3 border-t pt-6 md:flex-row">
        <p className="text-subPrimary text-sm">
          Inspiration: <a href="https://www.olamidee.tech/">Olamide.tech</a>
        </p>
        <p className="text-subPrimary text-sm">
          &copy; {new Date().getFullYear()} Car Marketplace. All rights
          reserved.
        </p>
        <p className="text-subPrimary text-sm">
          Developed: <a href="https://lukasfolio.vercel.app">Lukas Flick</a>
        </p>
      </div>
    </footer>
  );
}
