import { tw } from "twind";
import Title from "../islands/Title.tsx";

export default function Navbar() {
  return (
    <nav class={tw`flex justify-between items-center p-4`}>
      <a href="/" class={tw`text-2xl font-bold`}>
        <Title iteration={0} title={"BLOG"} />
      </a>
      <ul class={tw`flex`}>
        <li class={tw`mr-4`}>
          <button
            class={tw`p-2 rounded-full hover:bg-gray-200`}
            onClick={() => {
              const root = document.documentElement;
              const isDark = root.classList.contains("dark");
              root.classList.toggle("dark", !isDark);
            }}
          >
          </button>
        </li>
      </ul>
    </nav>
  );
}
