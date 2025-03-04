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

  const handleSort = (order: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (order === "default") {
      params.delete("sort");
    } else {
      params.set("sort", order);
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="w-full h-[40px] flex items-center p-2 justify-around">
      <div className="w-1/3 p-2 flex gap-1 justify-end">
        <button
          className="text-zinc-400 hover:text-YellowColor duration-100 flex "
          onClick={() => handleSort("descending")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="currentColor"
            className="size-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </button>
        <button
          className="text-zinc-400 hover:text-YellowColor duration-100 flex "
          onClick={() => handleSort("ascending")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="currentColor"
            className="size-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m4.5 15.75 7.5-7.5 7.5 7.5"
            />
          </svg>
        </button>
        <button
          className="text-zinc-400 hover:text-YellowColor duration-100 flex "
          onClick={() => handleSort("default")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="currentColor"
            className="size-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
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
