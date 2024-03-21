import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

interface MiniBannerProps {
  href: string;
  title: string;
}

const TopPageMiniBanner: React.FC<MiniBannerProps> = ({ href, title }) => {
  return (
    <Link href={href}>
      <div className="flex items-center justify-center bg-gradient-to-r from-pink-400 to-yellow-400 text-white font-bold py-4 px-8 rounded shadow-lg mt-2 mx-2 cursor-pointer transition duration-300 ease-in-out transform hover:scale-105">
        <span className="block text-center text-lg mr-2">{title}</span>
        <FontAwesomeIcon icon={faArrowRight} className="h-5 w-5" />
      </div>
    </Link>
  );
};

export default TopPageMiniBanner;
