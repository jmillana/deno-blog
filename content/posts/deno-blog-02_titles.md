---
title: Adding dynamic titles to the blog
date: 2023-04-21
excerpt: Adding titles that randomly change the letters on hover, revealing the real title after a few iterations.
---

# Title Component

The `Title` component is a customizable header that displays a changing text
when a user hovers over it. This component is built with `preact/hooks`,
`Button` component from `../components/Button.tsx`, and `Handlers` and
`PageProps` from `$fresh/server.ts`.

## Props

The `Title` component accepts the following props:

- `iteration` (`number`): an integer indicating the starting iteration for the
  changing text.
- `title` (`string`): the initial text to display in the header.
- `display_text` (`string`, optional): the text to display in the header when a
  user is not hovering over it. If this prop is not provided, the `title` prop
  will be converted to uppercase and used as the `display_text`.

## Functionality

The `Title` component creates a header containing the `display_text` state
variable. When a user hovers over the header, the `handleMouseOver` function is
called. This function sets up an interval that updates the `display_text` state
variable every 60 milliseconds to create a changing text effect. The changing
text starts at the beginning of the `title` prop and replaces each subsequent
letter with a randomly selected letter from the `alphabet` array until the
entire `title` prop is displayed. Then, the changing text starts again from the
beginning of the `title` prop.

## Usage

To use the `Title` component, import it into your project and include it in your
code like this:

```js
import Title from "path/to/Title.tsx";

function MyPage(props: PageProps & Handlers) {
  return (
    <div>
      <Title iteration={0} title="My Title" />
    </div>
  );
}

In this example, the Title component is rendered with iteration set to 0 and title set to "My Title". The display_text prop is not provided, so the header will display "MY TITLE" when a user is not hovering over it.
```
