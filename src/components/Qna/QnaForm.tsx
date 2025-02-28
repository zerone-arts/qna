"use client";

import { saveData } from "@/app/action";
import { DeleteData, updateData } from "@/lib/api";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function QnaForm({
  category,
  data,
}: {
  category: string;
  data: any;
}) {
  const [toggle, setToggle] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isDelete, setIsDelete] = useState(false);
  const [isInputEmpty, setIsInputEmpty] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const [editId, setEditId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("질문:", question);
    console.log("답변:", answer);

    if (question === "" || answer === "") {
      setIsInputEmpty(true);
      return;
    }

    if (isEditing && editId) {
      const result = await updateData(editId, question, answer);

      if (result.success) {
        console.log("✅ 수정 성공:", result.data);
      } else {
        console.error("❌ 수정 실패:", result.error);
      }
      console.log("편집 성공");
    } else {
      const result = await saveData(question, answer, category);

      if (result.success) {
        console.log("✅ 저장 성공:", result.data);
      } else {
        console.error("❌ 저장 실패:", result.error);
      }
    }

    closeHandle();
  };
  const deleteHandle = async () => {
    if (!editId) {
      console.error("❌ 삭제할 ID가 없습니다.");
      return;
    }

    const result = await DeleteData(editId);

    if (result.success) {
    } else {
      console.error("삭제 실패:", result.error);
    }

    closeHandle();
    setIsDelete(false);
  };

  const closeHandle = () => {
    setToggle(false);
    setEditId(null);
    if (isEditing && editId) {
      router.refresh();
      router.push(`?`, { scroll: false });
    } else {
      router.refresh();
    }

    setQuestion("");
    setAnswer("");
  };

  useEffect(() => {
    if (isEditing && editId) {
      setToggle(true);

      const editData = data.find((item: any) => item.id === +editId);

      if (editData) {
        setQuestion(editData.question);
        setAnswer(editData.answer);
      }
    } else {
      setQuestion("");
      setAnswer("");
    }
  }, [isEditing, editId, data]);

  useEffect(() => {
    const id = searchParams.get("id");
    const edit = searchParams.get("edit") === "1";

    setEditId(id);
    setIsEditing(edit);
  }, [searchParams]);

  useEffect(() => {
    if (!toggle) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (isDelete) return;
      const formElement = document.getElementById("qna-form");
      if (formElement && !formElement.contains(e.target as Node)) {
        closeHandle();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [toggle, isDelete]);
  return (
    <div
      className={`w-screen h-full absolute l-0 t-0 duration-100 pointer-events-none 
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
          {isEditing && editId ? "Edit QnA" : "New QnA"}
          {isEditing && editId && toggle ? (
            <button
              className="absolute right-5 text-zinc-500 hover:text-YellowColor duration-100"
              onClick={() => {
                setIsDelete(true);
              }}
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
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </button>
          ) : null}
        </h1>
        <form
          className={`w-full  p-5 flex flex-col gap-2 opacity-0 transition-all duration-1000 relative top-[50px] justify-center items-center ${
            toggle ? "opacity-100 delay-2000" : ""
          }`}
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Question"
            value={question}
            onChange={(e) => {
              setQuestion(e.target.value);
              if (e.target.value !== "") {
                setIsInputEmpty(false);
              }
            }}
            className="w-full p-2 border rounded-md bg-transparent text-white placeholder-gray-400 focus:outline-none"
          />
          <textarea
            placeholder="Answer"
            value={answer}
            onChange={(e) => {
              setAnswer(e.target.value);
              if (e.target.value !== "") {
                setIsInputEmpty(false);
              }
            }}
            className="w-full p-2 border rounded-md bg-transparent text-white placeholder-gray-400 focus:outline-none h-[100px]"
          />
          <div
            className={`h-[1px] text-sm text-red-600 relative bottom-1 duration ${
              isInputEmpty ? "opacity-1" : "opacity-0"
            }`}
          >
            Please enter a question and an answer.
          </div>
          <button
            className="w-[50px]  text-gray-100 py-2 rounded-md bg-YellowColor/0 hover:text-YellowColor  duration-300"
            type="submit"
          >
            {isEditing && editId ? "Update" : "Save"}
          </button>
        </form>
      </div>
      <div
        className={`absolute w-full h-full bg-black/90  flex items-center justify-center  duration-300 ${
          isDelete
            ? "pointer-events-auto opacity-1"
            : "pointer-events-none opacity-0"
        }`}
      >
        <div className="w-1/2 h-1/3 border border-YellowColor rounded-3xl flex flex-col items-center justify-center gap-10">
          <p className="relative mt-10">정말 삭제하겠습니까?</p>
          <div className="flex gap-10">
            <button
              className="hover:text-YellowColor p-2"
              onClick={deleteHandle}
            >
              Yes
            </button>
            <button
              className="hover:text-YellowColor p-2"
              onClick={() => {
                setIsDelete(false);
              }}
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
