import type { Post } from "../types.d.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import Title from "./Title.tsx";

interface PostsProps {
  posts: Post[];
  max_elements?: number;
}

const DEFAULT_MAX_CARDS = 6;

const get_date = (date: Date) => {
  return date.toString().replaceAll("-", "/").split("T")[0];
};

export default function PostsGrid(props: PostsProps) {
  const { posts } = props;
  let { max_elements } = props;
  if (max_elements === undefined) max_elements = DEFAULT_MAX_CARDS;
  const items = posts.slice(0, Math.min(posts.length, max_elements));

  const handleCardsMouseMove = (e: MouseEvent) => {
    for (
      const card of document.getElementsByClassName("card")
    ) {
      const card_html = card as HTMLElement;
      const rect = card.getBoundingClientRect(),
        x = e.clientX - rect.left,
        y = e.clientY - rect.top;

      card_html.style.setProperty("--mouse-x", `${x}px`);
      card_html.style.setProperty("--mouse-y", `${y}px`);
    }
  };

  return (
    <div id="cards" onMouseMove={handleCardsMouseMove}>
      {items.map((post: Post) => (
        <div class="card">
          <a href={`/blog/${post.id}`}></a>
          <div class="card-border"></div>
          <div class="card-content">
            <span class="card-header">
              <Title iteration={0} title={post.title} />
              <br />
              Date:{"  "}{get_date(post.date)}
            </span>
            <div class="card-description">
              <br />
              <br />
              <hr />
              {post.excerpt}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
