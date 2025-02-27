"use client";

import QnaToggleButton from "./QnaToggleButton";
import QnaEditButton from "./QnaEditButton";

export default function QnaButton({ answerId }: { answerId: string }) {
  return (
    <div className=" w-[70px] flex gap-3">
      <QnaToggleButton answerId={answerId} />
      <QnaEditButton answerId={answerId} />
    </div>
  );
}
