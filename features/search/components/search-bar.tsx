"use client";
import { Search, X } from "lucide-react";
import React, { useRef, useState } from "react";
import { useDebounceCallback } from "usehooks-ts";
import { IconInput, LeftIcon, RightIcon } from "@/components/icon-input";
import { Input } from "@/components/ui/input";

interface SearchBarProp {
  search: string;
  setSearch(search: string): void;
  handlePressEnter?: () => void;
}

export function SearchBar({
  search,
  setSearch,
  handlePressEnter = () => {},
}: SearchBarProp) {
  //   const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const debounced = useDebounceCallback(handleChange, 500);
  // const { data, isPending, error } = searchApi.query.useSearch(
  //     "1",
  //     "10",
  //     search,
  // );
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  const handleDeleteSearch = () => {
    if (inputRef.current?.value) {
      inputRef.current.value = "";
    }
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && inputRef.current?.value) {
      console.log("Enter was pressed!", inputRef.current.value);
      handlePressEnter();
    }
  };

  return (
    <IconInput
      placeholder="Search"
      className="rounded-full border border-black/30 px-10 text-black placeholder:text-black/50 hover:border-black focus-visible:ring-black"
      customSize="sm"
      ref={inputRef}
      onChange={debounced}
      onKeyDown={handleKeyDown}
    >
      <LeftIcon>
        <Search className=" h-5 w-5 text-black/50" />
      </LeftIcon>
      {search !== "" && (
        <RightIcon>
          <button onClick={handleDeleteSearch}>
            <X className="text-black/50 h-5 w-5" />
          </button>
        </RightIcon>
      )}
    </IconInput>
  );
}
