---
title: Adding a gradient text to the blog
date: 2023-04-22
excerpt: Adding a gradient text that loops through a range of colors.
---

## Create a Dynamic Star Island with Preact

In this tutorial, we'll create a dynamic star island using Preact and CSS
animations. The island will consist of multiple stars that will move randomly
and change their appearance over time.

### Getting Started

```js
First, we'll create a new Preact component called AnimatedStar. Here's the code:
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
```

This component uses the useState hook to manage state for various properties,
including the star's position, animation, visibility, and style. It also uses a
rand function to generate random values for the star's position.

The build_style function generates a CSS style string based on

Here's an example of how you could use the AnimatedStar component in your React
project:

```js
import AnimatedStar from "../path/to/AnimatedStar";

export default function MyComponent() {
  return (
    <div>
      <h1>
        Some normal text:
        <span className="magic">
          <AnimatedStar />
          <AnimatedStar />
          <AnimatedStar />
          <span className="magic-text">Some colored text</span>
        </span>
        some more text.
      </h1>
    </div>
  );
}
```

You can see that we're rendering the AnimatedStar component inside a span
element with the magic class, along with some other text. We're also rendering
another span element with the magic-text class that has some colored text inside
it. This is just an example of how you might use the component, and you can
modify it to suit your needs.

In order to get the styles for the magic and magic-text classes to work, you'll
need to include the following CSS in your project:

```css
h1 > .magic {
  display: inline-block;
  position: relative;
}

h1 > .magic > .magic-star {
  --size: clamp(20px, 1.5vw, 30px);

  animation: scale 700ms ease forwards;
  display: block;
  height: var(--size);
  left: var(--star-left);
  position: absolute;
  top: var(--star-top);
  width: var(--size);
}

h1 > .magic > .magic-star > svg {
  animation: rotate 1000ms linear infinite;
  display: block;
  opacity: 0.7;
}

h1 > .magic > .magic-star > svg > path {
  fill: var(--violet);
}

h1 > .magic > .magic-text {
  animation: background-pan 3s linear infinite;
  background: linear-gradient(
    to right,
    var(--purple),
    var(--violet),
    var(--pink),
    var(--purple)
  );
  background-size: 200%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  white-space: nowrap;
}
```

You can include this CSS in your project using a CSS file or by using a
CSS-in-JS library like styled-components or Emotion.
