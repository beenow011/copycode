import Image from "next/image";
import Question from "./component/question";
import Header from "./component/Header";
// import { useState } from "react";

export default function Home() {
  // const [question, setQuestion] = useState('')
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-black">
      {/* <input type="text"/> */}
      <Header />
      <Question />
    </main>
  );
}
