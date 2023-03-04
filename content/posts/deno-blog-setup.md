---
title: Building a blog with Deno Fresh
date: 2023-02-25
excerpt: Setup a blog with Deno fresh, geographically distributed & free
---

## Why Deno Fresh?
Fresh is a web framework for Deno that allows you to create fast and reliable
web applications with minimal JavaScript. It uses Preact for components,
TypeScript for syntax, and Tailwind CSS for styling.

It also supports island-based architecture, which means you can selectively
hydrate parts of your page with JavaScript.

Fresh does not have a build step. It compiles everything on demand and sends it
to the browser just-in-time. It also installs and caches all dependencies when
it runs for the first time.


## Project Setup

Setting up a fresh project just requires to run the following command.

`deno run -A -r https://fresh.deno.dev deno-blog`

This script generates a minimal example for a Fresh project in the selected
directory.

```
deno-blog
├── components
│   └── Button.tsx
├── deno.json
├── dev.ts
├── fresh.gen.ts
├── import_map.json
├── islands
│   └── Counter.tsx
├── main.ts
├── README.md
├── routes
│   ├── api
│   │   └── joke.ts
│   ├── index.tsx
│   └── [name].tsx
├── static
│   ├── favicon.ico
│   └── logo.svg
└── twind.config.ts
```

Lets start editing the routes/index.tsx file, that will serve as our landing page.

```js
export default function Home() {
  return (
    <main class="p-4">
      <h1 class="text-4xl font-bold">Blog</h1>
      <article class="mt-4">
        <h2 class="text-2xl font-bold">
            <a class="hover:text-blue-600">My First Post</a>
        </h2>
        <time>2023-02-25</time>
      </article>
      <article class="mt-4">
        <h2 class="text-2xl font-bold">
            <a class="hover:text-blue-600">My Second Post</a>
        </h2>
        <time>2023-02-26</time>
      </article>
    </main>
  );
}
```

We can see in the image below how the server has been refreshed and the langind page
looks like this.
![Blog image 1](/images/deno-blog-setup/first-blog-setup.png)

### Lets Add some real entries to the blog

For this we will define a new file called types.d.ts to define an interface to
setup a post.

```js
export interface Post {
  slug: string;
  title: string;
  body: string;
  date: Date;
  excerpt: string;
}
```

Now let's create a directory called /content/posts where all our posts will
be located, and define a couple of posts in markdown format.

```md
---
title: My First Post
date: 2023-02-25
excerpt: This is my very first post
---
## Hello World
```

At this point we have the posts ready, however this stills need to be linked
in order to display the posts automatically on the landing page. Let's then
define a utility functions to recover the list of available posts at
/utils/posts.ts.

In order to achive we will need two functions, one to list the available posts
and the other to extract the markdown data into something usable.

As we will be using external libraries in order to extract the data from the
markdown, also to render it to HTML.

For this we will be using the extract method from the deno std library, and
gfm to render the data.

Let's add the required imports on the import_map.json, this will allow to
reference the libraries trough the code.

Add the following lines in the imports section
```json
"$std/": "https://deno.land/std@0.170.0/",
"$gfm/": "https://deno.land/x/gfm@0.2.1/",
```

Now we can use the map key, in order to reference the libraries in the file
utils/post.ts
```js
import type { Post } from "../types.d.ts";
import { extract } from "$std/encoding/front_matter/any.ts";
import { render } from "$gfm/mod.ts";

export async function loadPost(slug: string): Promise<Post | null> {
  const raw = await Deno
    .readTextFile(`./content/posts/${slug}.md`)
    .catch(() => null);

  if (!raw) return null;

  const { attrs, body } = extract(raw);
  const params = attrs as Record<string, string>;
  const post: Post = {
    slug,
    title: params.title,
    body: render(body),
    date: new Date(params.date),
    excerpt: params.excerpt,
  };
  return post;
}

export async function listPosts(): Promise<Post[]> {
  const promises = [];
  for await (const entry of Deno.readDir("./content/posts")) {
    const { name } = entry;
    const [slug] = name.split(".");
    promises.push(loadPost(slug));
  }
  const posts = await Promise.all(promises) as Post[];
  posts.sort((a, b) => {
    return b.date.getTime() - a.date.getTime(); // descending
  });
  return posts;
}
```
Then we are listing the directory where the posts are stored, then split the
file name by the `.` and recover the first element, which contains the file name
without the extension, and then we load the post information using the method
previously defined.

Finally wait for the promises to be resolved and sort the list of posts in
descending order.

Now it's time to display the posts in our landing page, let's edit the
index.tsx file.

First of all we need to import the utility method `listPPosts` and also the
Handlers objects from the Fresh framework std library.

After this we will define the GET Handler, that will be used to render
the posts list into the HTML.

On the body of the Home function we add the map of the posts, adding a new
entry for each post.

```js
import { Handlers, PageProps } from "$fresh/server.ts";
import { listPosts } from "../utils/posts.ts";

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
    <main class="p-4">
      <h1 class="text-4xl font-bold">Blog</h1>
      {posts.map((post) => (
        <article class="mt-4">
          <h2 class="text-2xl font-bold">
            <a class="hover:text-blue-600" href={`/blog/${post.slug}`}>
              {post.title}
            </a>
          </h2>
          <time>{Intl.DateTimeFormat("es").format(post.date)}</time>
        </article>
      ))}
    </main>
  );
}
```
Now if we check the browser we will see how that the posts swapped it's order
and now are sorted by descending date.

![List posts sorted](/images/deno-blog-setup/post-listing.png)

At this point if the user clicks on the post link will be redirected to an
unexisting page, which is no bueno. Let's fix it.

We will create a new route, at /routes/blogs/[slug].tsx
In this file we will again define a GET handler that will be in charge of
loading the given post.
By setting the key word slug between square brackets we are indicating that
slug will be a part of the context parameters, so we can access to that value
in order to load specific posts.

Then we will define the PagePost function that will be in charge of editing
the inner HTML code in order to display the post data. Take into consideration
that modifiying the inner html may lead into potential security flaws, however
in this scenario we are loading static files defined by ourselves.

```js
import { Handlers, PageProps } from "$fresh/server.ts";
import { loadPost } from "../../utils/posts.ts";
import { CSS } from "$gfm/mod.ts";

export const handler: Handlers = {
  async GET(req, context) {
    const { slug } = context.params;
    const post = await loadPost(slug);
    return context.render({ post });
  },
};

export default function PagePost(props: PageProps) {
  const { post } = props?.data || {};
  return (
    <article class="p-4">
      <h1 class="text-2xl font-bold">{post.title}</h1>
      <time>{Intl.DateTimeFormat("es").format(post.date)}</time>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div
        class="markdown-body"
        dangerouslySetInnerHTML={{ __html: post.body }}
      />
    </article>
  );
}
```

After this we are done with the first iteration of the project!

Now we will see how to implement some tests and we will be working on how to
allow comments to our posts with dynamic islands, also we will we giving some
css to the project.

## Testing
Deno has already some built-in testing functionallity so we will be taking
advantage of it. For further information pleas check [Deno Testing](https://deno.land/manual@v1.31.1/basics/testing)

Basically deno will detect any file named `test.{ts, tsx, mts, js, mjs, jsx}`

Or those ending with `.test.{ts, tsx, mts, js, mjs, jsx}` or `_test.{ts, tsx, mts, js, mjs, jsx}`

In order to define a test you need to call `Deno.test` API you will create a
set of tests for the utilit function load_posts, as the testing module is part
of the standard library of deno, and we already have it in our import map we
can reference it by using the `$std` key word. From this library we will be
importing the `assertEquals` function.

```js
import { loadPost } from "./posts.ts";
import { assertEquals } from "$std/testing/asserts.ts";

Deno.test("loadPost() returns null if the post does not exist", async () => {
  const post = await loadPost("non-existent-post");
  assertEquals(post, null);
});

Deno.test("loadPost() returns a post object if the post exists", async () => {
  const post = await loadPost("first-post");
  assertEquals(post?.slug, "first-post");
  assertEquals(post?.title, "My First Post");
});
```

To execute the tests run the command `deno test`

You will see that it's outputing a permission error as the test is trying to
read files

```sh
deno test

Uncaught error from ./utils/posts_test.ts FAILED

 ERRORS

./utils/posts_test.ts (uncaught error)
error: PermissionDenied: Requires read access to "./content/posts", run again with the --allow-read flag
  for await (const entry of Deno.readDir("./content/posts")) {
                   ^
    at async Object.[Symbol.asyncIterator] (internal:runtime/js/30_fs.js:131:14)
    at async listPosts (file:///home/jordi/.opt/opt/deno-blog/utils/posts.ts:26:20)
    at async file:///home/jordi/.opt/opt/deno-blog/utils/posts.ts:38:1
This error was not caught from a test and caused the test runner to fail on the referenced module.
It most likely originated from a dangling promise, event/timeout handler or top-level code.

 FAILURES

./utils/posts_test.ts (uncaught error)

FAILED | 0 passed | 1 failed (91ms)

error: Test failed
```
After adding the `--allow-read` flag to the command, the test will run with
no issues
```sh
deno test --allow-read
running 2 tests from ./utils/posts_test.ts
loadPost() returns null if the post does not exist ... ok (6ms)
loadPost() returns a post object if the post exists ... ok (7ms)

ok | 2 passed | 0 failed (117ms)
```

And this is how tests can be implemented and executed in deno!

Thanks a lot for reading! The source code used in this exercise can be found at
[GitHub](https://github.com/jmillana/deno-blog)
