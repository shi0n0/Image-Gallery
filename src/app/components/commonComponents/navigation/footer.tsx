"use client";

import { Facebook, Instagram, Twitter } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white text-gray-600 body-font border-t">
      <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
        <Link href={"/"} className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
          <span className="ml-3 text-xl">ImageGallery</span>
        </Link>
        <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
          © {currentYear} ImageGallery —
          <Link
            href="mailto:contact@yoursite.com"
            className="text-gray-600 ml-1"
            rel="noopener noreferrer"
            target="_blank"
          >
            contact@testsite.com
          </Link>
        </p>
        <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
          <a className="text-gray-500" href="https://twitter.com/yourtwitter">
            <Twitter className="w-5 h-5" />
          </a>
          <a
            className="ml-3 text-gray-500"
            href="https://instagram.com/yourinstagram"
          >
            <Instagram className="w-5 h-5" />
          </a>
          <a
            className="ml-3 text-gray-500"
            href="https://facebook.com/yourfacebook"
          >
            <Facebook className="w-5 h-5" />
          </a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
