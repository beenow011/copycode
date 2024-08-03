import Image from "next/image";
import Question from "./component/question";
import { NavigationMenuDemo } from "./component/Header";
// import { useState } from "react";

export default function Home() {
  // const [question, setQuestion] = useState('')
  return (
    <main className="flex  flex-col items-center px-12 bg-gray-800">
      {/* <input type="text"/> */}

      <Question />
    </main>
  );
}
