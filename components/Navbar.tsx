import { tw } from "twind";

export default function Navbar() {
  return (
    <nav class={tw`flex justify-between items-center p-4`}>
      <a href="/" class={tw`text-2xl font-bold`}>
        Blog
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
            <svg
              class={tw`w-6 h-6`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 3v1m0 16v1m9-9h-1m-16 0h-1m4.293-4.293l-.894.447a8 8 0 000 11.314l.894.447M5.657 5.657l-.894-.447a8 8 0 010 11.314l.894.447M18.343 5.657l.894-.447a8 8 0 000 11.314l-.894.447M19.707 8.343l.894.447a8 8 0 01-11.314 0l-.894-.447"
              />
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  );
}
