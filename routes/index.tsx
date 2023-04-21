import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import Counter from "../islands/Counter.tsx";
import { listPosts } from "../utils/posts.ts";
import Navbar from "../components/Navbar.tsx";
import Footer from "../components/Footer.tsx";
import Title from "../islands/Title.tsx";
import { CSS } from "$gfm/mod.ts";

export default function Home(props: PageProps) {
  return (
    <>
      <head>
        <link rel="stylesheet" href="/styles/main.css" />
      </head>
      <main
        class="p-4"
        style="display: flex; flex-direction: column; min-height: 100vh; padding-left: 5rem; padding-right: 5rem;"
      >
        <a href="about/">
          <Title iteration={0} title={"ABOUT ME"} />
        </a>
        <Title iteration={0} title={"PROJECTS"} />
        <Title iteration={0} title={"CONTACT"} />
        <a href="blog/">
          <Title iteration={0} title={"BLOG"} />
        </a>
      </main>
    </>
  );
}
