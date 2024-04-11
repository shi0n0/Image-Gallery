import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

interface MiniBannerProps {
  href: string;
  title: string;
}

const TopPageMiniBanner: React.FC<MiniBannerProps> = ({ href, title }) => {
  return (
    <Link href={href} passHref>
      <div className="block">
        <div className="flex items-center justify-center bg-gradient-to-r from-pink-400 to-yellow-400 text-white font-bold py-2 px-4 sm:py-3 sm:px-6 md:py-4 md:px-8 rounded shadow-lg mt-10 mx-2 cursor-pointer transition duration-300 ease-in-out transform hover:scale-105">
          <span className="text-center text-xs sm:text-sm md:text-lg mr-2">
            {title}
          </span>
          <FontAwesomeIcon
            icon={faArrowRight}
            className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5"
          />
        </div>
      </div>
    </Link>
  );
};

export default TopPageMiniBanner;
