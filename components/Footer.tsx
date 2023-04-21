import { tw } from "twind";

export default function Footer() {
  return (
    <footer
      class={tw`flex justify-center items-center p-4`}
      style="position: fixed; bottom: 0; height 5rem; width: 100%; background: #0D1117;"
    >
      Made with ❤️{" "}
      <a
        target="_blank"
        href="https://github.com/jmillana"
        style="display: flex; align-items: center;"
        class={tw`hover:underline font-semibold`}
      >
        <img src="/images/svg/github.svg" class={tw`w-6 h-6 mr-2`} />
        Jmillana
      </a>
    </footer>
  );
}
