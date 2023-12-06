import Image from "next/image";

export default function Home() {
  return (
    <main className="flex h-max flex-col items-center pt-5">
      <img
        src="/placeholder.png"
        className="fixed left-5 top-5 w-32 h-32"
      ></img>
      <div className="justify-self-start self-start pl-48 text-4xl font-extrabold">
        Compass Center Advocate Landing Page
      </div>
    </main>
  );
}
