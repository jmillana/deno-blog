export default function Home() {
  return (
    <>
      <head>
        <link rel="stylesheet" href="/styles/main.css" />
      </head>
      <main
        class="p-4"
        style="display: flex; flex-direction: column; min-height: 100vh; padding-left: 5rem; padding-right: 5rem;"
      >
        <h1>
          Some normal text: <span class="magic">Some colored text</span>
          some more text.
        </h1>
      </main>
    </>
  );
}
