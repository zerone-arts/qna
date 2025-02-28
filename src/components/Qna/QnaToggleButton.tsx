"use client";

export default function QnaToggleButton({ answerId }: { answerId: string }) {
  const toggleAnswer = () => {
    const answerElement = document.getElementById(`answer-${answerId}`);
    const buttonElement = document.getElementById(`toggle-${answerId}`);

    if (answerElement) {
      const isClosed =
        answerElement.style.maxHeight === "0px" ||
        !answerElement.style.maxHeight;
      answerElement.style.maxHeight = isClosed
        ? `${answerElement.scrollHeight}px`
        : "0px";
    }

    if (buttonElement) {
      buttonElement.style.transform =
        answerElement?.style.maxHeight !== "0px"
          ? "rotate(180deg)"
          : "rotate(0deg)";
    }
  };

  return (
    <button
      onClick={toggleAnswer}
      className="text-zinc-500 hover:text-gray-100 duration-200"
    >
      <svg
        id={`toggle-${answerId}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={3}
        stroke="currentColor"
        className="size-5 transition-transform duration-300"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m19.5 8.25-7.5 7.5-7.5-7.5"
        />
      </svg>
    </button>
  );
}
