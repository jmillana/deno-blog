import { useState } from "preact/hooks";
import { Star } from "../components/Star.tsx";

interface StyleProps {
  start_left?: number;
  start_top?: number;
  animation?: string;
  is_start?: boolean;
  visibility?: string;
  styles?: Array<string>;
}

const NUM_STARS = 3;

export default function AnimatedStar(props: StyleProps) {
  const [, setStartLeft] = useState(props.start_left);
  const [, setStartTop] = useState(props.start_top);
  let [animation, setAnimation] = useState(props.animation);
  const [is_start, setIsStart] = useState(props.is_start);
  let [visibility, setVisibility] = useState(props.visibility);
  let [styles, setStyles] = useState(props.styles);
  if (visibility === undefined) {
    visibility = "visible";
  }
  if (animation === undefined) {
    animation = "";
  }

  const rand = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const build_style = (
    left_pos: number,
    top_pos: number,
    animation: string,
    display: string,
  ) => {
    return `left:${left_pos}%;top:${top_pos}%; animation: ${animation}; visibility: ${display}`;
  };
  //const styles: Array<string> = [];
  if (styles === undefined) {
    styles = [];
    for (let i = 0; i < NUM_STARS; i++) {
      styles.push(
        build_style(rand(-10, 100), rand(-40, 80), animation, visibility),
      );
    }
  }

  let index = 0;
  const interval = 500;

  const animate = (idx: number) => {
    const left_pos = rand(-10, 100);
    const top_pos = rand(-40, 80);
    let visibility;
    if (animation == "none") {
      animation = "scale 700ms ease forwards";
      visibility = "visible";
    } else {
      visibility = "hidden";
      animation = "none";
    }
    setVisibility(visibility);
    setStartLeft(left_pos);
    setStartTop(top_pos);
    setAnimation(animation);
    if (styles !== undefined) {
      styles[idx] = build_style(left_pos, top_pos, animation, visibility);
    }
    setStyles(styles);
  };

  for (let i = 0; i < NUM_STARS; i++) {
    if (is_start == undefined) {
      animate(i);
      setIsStart(false);
      setTimeout(() => {
        animate(i);
        setInterval(() => animate(i), interval);
      }, index++ * (interval / 3));
    }
  }

  return (
    <>
      {styles.map((style, idx) => (
        <span
          class="magic-star"
          style={style}
        >
          <Star />
        </span>
      ))}
    </>
  );
}
