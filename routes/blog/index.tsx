import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import Counter from "../../islands/Counter.tsx";
import { listPosts } from "../../utils/posts.ts";
import Navbar from "../../components/Navbar.tsx";
import Footer from "../../components/Footer.tsx";
import { CSS } from "$gfm/mod.ts";

export const handler: Handlers = {
  async GET(req, context) {
    const posts = await listPosts();
    return context.render({ posts });
  },
};

export default function Home(props: PageProps) {
  const { data } = props;
  const { posts } = data;
  const { dark_mode } = data;
  var theme = "";

  if (dark_mode) {
    theme = "dark";
  } else {
    theme = "light";
  }

  return (
    <main
      class="p-4"
      data-color-mode={theme}
      data-dark-theme={theme}
      class="markdown-body"
      style="display: flex; flex-direction: column; min-height: 100vh; padding-left: 5rem; padding-right: 5rem;"
    >
      <Navbar />
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <h1 class="text-4xl font-bold">Latest Posts</h1>
      {posts.map((post) => (
        <article class="mt-4">
          <h2 class="text-2xl font-bold">
            <a class="hover:text-blue-600" href={`/blog/${post.id}`}>
              {post.title}
            </a>
          </h2>
          <time>{Intl.DateTimeFormat("es").format(post.date)}</time>
        </article>
      ))}
      <Footer />
    </main>
  );
}
