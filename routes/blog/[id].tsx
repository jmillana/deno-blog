import { Handlers, PageProps } from "$fresh/server.ts";
import { loadPost } from "../../utils/posts.ts";
import { CSS } from "$gfm/mod.ts";
import Navbar from "../../components/Navbar.tsx";
import Footer from "../../components/Footer.tsx";

export const handler: Handlers = {
  async GET(request, context) {
    const { id } = context.params;
    const post = await loadPost(id);
    return context.render({ post });
  },
};

export default function PagePost(props: PageProps) {
  const { post } = props?.data || {};
  return (
    <div>
      <div
        data-color-mode="dark"
        data-dark-theme="dark"
        class="markdown-body"
        style="min-height: 100vh; padding-bottom: 5rem;"
      >
        <Navbar />
        <article class="p-4" style="padding-bottom: 5rem; overflow: auto;">
          <h1 class="text-2xl font-bold">{post.title}</h1>
          <time>{Intl.DateTimeFormat("es").format(post.date)}</time>
          <style dangerouslySetInnerHTML={{ __html: CSS }} />
          <div
            class="markdown-body"
            dangerouslySetInnerHTML={{ __html: post.body }}
          />
        </article>
        <Footer />
      </div>
    </div>
  );
}
