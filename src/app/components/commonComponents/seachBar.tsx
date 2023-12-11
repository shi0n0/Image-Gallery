import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar({ initialValue }: { initialValue: string }) {
  const router = useRouter();
  const [searchKeyword, setSearchKeyword] = useState(initialValue);
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/search?keyword=${searchKeyword}`);
  };

  const handleReset = () => {
    setSearchKeyword("");
  };

  return (
    <form className="flex-grow max-w-2xl mx-auto" onSubmit={handleSearch}>
      <div className="relative w-full">
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400 text-sm"
        />
        <input
          type="text"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          className="pl-8 pr-4 py-2 border rounded-full w-full focus:outline-none focus:shadow-inner focus:border-blue-500"
        />
        {searchKeyword && (
          <button
            type="button"
            onClick={handleReset}
            className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 cursor-pointer hover:bg-gray-100 rounded-full p-2 transition-all duration-300"
          >
            <FontAwesomeIcon icon={faTimes} size="sm" className="flex items-center aspect-square"/>
          </button>
        )}
      </div>
    </form>
  );
}
