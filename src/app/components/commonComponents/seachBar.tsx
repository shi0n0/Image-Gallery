import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const router = useRouter();
  const [searchKeyword, setSearchKeyword] = useState("");
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/search?keyword=${searchKeyword}`);
  };

  return (
    <form className="flex-grow max-w-2xl mx-auto" onSubmit={handleSearch}>
      <div className="relative w-full">
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          value={searchKeyword}
          placeholder="検索キーワード"
          onChange={(e) => setSearchKeyword(e.target.value)}
          className="pl-8 pr-4 py-2 border rounded-full w-full focus:outline-none focus:shadow-inner focus:border-blue-500"
        />
      </div>
    </form>
  );
}
