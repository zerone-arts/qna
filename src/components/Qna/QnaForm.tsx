"use client";

import { saveData } from "@/app/action";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function QnaForm({ category }: { category: string }) {
  const [toggle, setToggle] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [editMode, setEditMode] = useState(false);

  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("질문:", question);
    console.log("답변:", answer);

    const result = await saveData(question, answer, category);

    if (result.success) {
      console.log("✅ 저장 성공:", result.data);
    } else {
      console.error("❌ 저장 실패:", result.error);
    }

    setQuestion("");
    setAnswer("");
    router.refresh();
    setEditMode(false);
    setToggle(false);
  };

  useEffect(() => {
    if (!toggle) return;

    const handleClickOutside = (e: MouseEvent) => {
      const formElement = document.getElementById("qna-form");
      if (formElement && !formElement.contains(e.target as Node)) {
        setToggle(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [toggle]);
  return (
    <div
      className={`w-screen h-full absolute l-0 t-0 border duration-100 pointer-events-none 
      ${toggle ? "bg-black/50 cursor-pointer" : "bg-black/0"}
    `}
    >
      <div
        className={`absolute bottom-[50px] hover:text-YellowColor cursor-pointer border  flex items-center justify-start flex-col   bg-bgColor rounded-3xl  left-1/2 transform -translate-x-1/2 pointer-events-auto  overflow-hidden ${
          toggle
            ? "w-2/3 border-YellowColor h-[300px] "
            : "w-[150px] border-white h-[50px]"
        }`}
        id="qna-form"
        onClick={() => setToggle(true)}
        style={{
          transitionDelay: "0.5s, 0s",
          transitionProperty: "height, width",
          transitionDuration: "0.5s",
        }}
      >
        <h1
          className={`absolute h-[50px] flex items-center justify-center duration-1000 w-full ${
            toggle ? "h-[70px] text-YellowColor" : "h-[50px]"
          }`}
        >
          {editMode ? "Edit QnA" : "New QnA"}
          <span className="absolute right-5 text-zinc-500 hover:text-YellowColor duration-100">
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
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </span>
        </h1>
        <form
          className={`w-full  p-5 flex flex-col gap-4 opacity-0 transition-all duration-1000 relative top-[50px] justify-center items-center ${
            toggle ? "opacity-100 delay-2000" : ""
          }`}
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full p-2 border rounded-md bg-transparent text-white placeholder-gray-400 focus:outline-none"
          />
          <textarea
            placeholder="Answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="w-full p-2 border rounded-md bg-transparent text-white placeholder-gray-400 focus:outline-none h-[100px]"
          />

          <button
            className="w-[50px]  text-gray-100 py-2 rounded-md bg-YellowColor/0 hover:text-YellowColor  duration-300"
            type="submit"
          >
            {editMode ? "Update" : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
}
