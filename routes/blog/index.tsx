import { Head } from "$fresh/runtime.ts";
import { useEffect, useState } from "preact/hooks";
import { Handlers, PageProps } from "$fresh/server.ts";
import { listPosts } from "../../utils/posts.ts";
import Navbar from "../../components/Navbar.tsx";
import Footer from "../../components/Footer.tsx";
import PostsGrid from "../../islands/PostsGrid.tsx";

import type { Post } from "../../types.d.ts";

export const handler: Handlers = {
  async GET(req, context) {
    const posts = await listPosts();
    return context.render({ posts });
  },
};

export default function Home(props: PageProps) {
  const { data } = props;
  const { posts } = data;

  return (
    <>
      <Head>
        <link rel="stylesheet" href="/styles/main.css" />
      </Head>
      <main
        class="p-4 grid grid-cols-1 gap-4"
        style="display: flex; flex-direction: column; min-height: 100vh; padding-left: 5rem; padding-right: 5rem;"
      >
        <Navbar />
        <PostsGrid posts={posts} />
        <Footer />
      </main>
    </>
  );
}

/*
<main
        class="p-4, markdown-body"
        data-color-mode="dark"
        data-dark-theme="dark"
        style="display: flex; flex-direction: column; min-height: 100vh; padding-left: 5rem; padding-right: 5rem;"
      >
<style dangerouslySetInnerHTML={{ __html: CSS }} />
        <h1 class="text-4xl font-bold">Latest Posts</h1>
        {posts.map((post: Post) => (
          <article class="mt-4">
            <h2 class="text-2xl font-bold">
              <a class="hover:text-blue-600" href={`/blog/${post.id}`}>
                {post.title}
              </a>
            </h2>
            <time>{Intl.DateTimeFormat("es").format(post.date)}</time>
          </article>
        ))}
        </main>
*/
