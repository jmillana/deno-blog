import { useEffect, useState } from "preact/hooks";
import { Button } from "../components/Button.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";

interface TitleProps {
  iteration: number;
  title: string;
  display_text?: string;
}

const alphabet = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

export default function Title(props: TitleProps) {
  let [iteration, setIteration] = useState(props.iteration);
  const [title] = useState(props.title);
  let [display_text, setDisplayText] = useState(props.display_text);
  if (display_text == undefined) {
    display_text = title.toUpperCase();
  }

  const handleMouseOver = () => {
    const interval = setInterval(() => {
      setDisplayText(
        title.split("")
          .map((letter, index) => {
            if (index < iteration) {
              return title[index];
            }
            return alphabet[Math.floor(Math.random() * 28)];
          })
          .join(""),
      );
      if (iteration >= title.length) {
        iteration = 0;
        clearInterval(interval);
      } else {
        iteration += 1;
      }
      setIteration(iteration);
    }, 60);
  };

  return (
    <div>
      <h1 onMouseOver={handleMouseOver}>{display_text}</h1>
    </div>
  );
}
