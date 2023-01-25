import { MetaFunction } from "@remix-run/node";
import Carousel from "~/components/carousel/carousel";

export const meta: MetaFunction = () => ({
  description: "This page gives a little explanation about the app and what it stands for.",
  title: "Putrid Grove | About",
});

export default function About() {
  return (
    <div className="w-full h-full flex flex-col items-center">
      <Carousel />
      <div className="w-full flex flex-col p-12 items-center text-gray-700">
        <h1 className="text-4xl uppercase font-semibold mb-2">Putrid Grove</h1>
        <h2 className="text-2xl mb-5">Houtstraat 64, 9070 Destelbergen</h2>
        <p className="text-lg w-8/12 text-center">
          PutridGrove is an application made with the Remix framework as essay assignment. This is the start of the
          PutridGrove application that will be developed in the near future. Alongside this application, there's also a
          Angular/ASP.NET application being made to compare both. The PutridGrove application is meant to make life at
          Putrid Grove a little more easy by bundling all smart applications in one handy app.
        </p>
      </div>
    </div>
  );
}
