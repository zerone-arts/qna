"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function QnaUi({ searchTerm }: { searchTerm: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    const params = new URLSearchParams(searchParams.toString());

    if (query) {
      params.set("query", query);
    } else {
      params.delete("query");
    }

    router.push(`?${params.toString()}`, { scroll: false });
  };

  const toggleCloseAnswers = () => {
    const answerElements = document.querySelectorAll('[id^="answer-"]');
    const toggleElements = document.querySelectorAll('[id^="toggle-"]');
    answerElements.forEach((element) => {
      if (element instanceof HTMLElement) {
        element.style.maxHeight = "0px";
      }
    });
    toggleElements.forEach((element) => {
      if (element instanceof SVGElement) {
        element.style.transform = "rotate(0deg)";
      }
    });
  };

  const toggleOpenAnswers = () => {
    const answerElements = document.querySelectorAll('[id^="answer-"]');
    const toggleElements = document.querySelectorAll('[id^="toggle-"]');
    answerElements.forEach((element) => {
      if (element instanceof HTMLElement) {
        element.style.maxHeight = element.scrollHeight + "px";
      }
    });
    toggleElements.forEach((element) => {
      if (element instanceof SVGElement) {
        element.style.transform = "rotate(180deg)";
      }
    });
  };

  return (
    <div className="w-full h-[40px] flex items-center p-2 justify-around">
      <div className="w-1/3"></div>
      <div className="w-1/3  border rounded-3xl p-2 border-YellowColor">
        <span className="absolute">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </span>
        <input
          type="text"
          defaultValue={searchTerm}
          onChange={handleSearch}
          className="w-full pl-7 bg-transparent text-gray-100 focus:outline-none"
        />
      </div>

      <div className="w-1/3 p-2 flex gap-1">
        <button
          className="text-zinc-400 hover:text-gray-100 duration-100"
          onClick={toggleOpenAnswers}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5"
            />
          </svg>
        </button>
        <button
          className="text-zinc-400 hover:text-gray-100 duration-100"
          onClick={toggleCloseAnswers}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m4.5 18.75 7.5-7.5 7.5 7.5"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m4.5 12.75 7.5-7.5 7.5 7.5"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
