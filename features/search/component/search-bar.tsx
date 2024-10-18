"use client";

import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export function SearchBar() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  //   const debounced = useDebounceCallback(handleChange, 500);

  //   function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
  //     console.log("From debounced: ", e.target.value);
  //     setSearch(e.target.value);
  //   }

  const handleDeleteSearch = () => {
    if (inputRef.current?.value) {
      inputRef.current.value = "";
    }
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && inputRef.current?.value) {
      console.log("Enter was pressed!", inputRef.current.value);
      router.push(
        `/search?search_query=${encodeURIComponent(inputRef.current.value)}`
      );
    }
  };
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-500" />
      <Input
        id="test"
        placeholder="Search"
        className="rounded-full border-0 bg-gray-200 px-10 text-black placeholder:text-gray-500 focus-visible:bg-white focus-visible:ring-gray-400"
        customSize="sm"
        ref={inputRef}
        // onChange={debounced}
        onKeyDown={handleKeyDown}
      />
      {search !== "" && (
        <button
          className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-500"
          onClick={handleDeleteSearch}
          type="button"
        >
          <X size={20} />
        </button>
      )}
    </div>
  );
}
