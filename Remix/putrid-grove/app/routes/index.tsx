import { Header } from "~/components/dashboard/header";
import { fetch, MetaFunction } from "@remix-run/node";
import { json } from "react-router";
import { db } from "~/utils/db.server";
import { useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => ({
  title: "PutridGrove landing page",
  description: "PutridGrove, an application made to make live easier at Putrid Grove",
});

export const loader = async () => {
  const itemAmount = await db.item.count();

  const priceTotals = await db.item.groupBy({
    by: ["userId"],
    _sum: {
      price: true,
    },
  });

  const highestTotalUserId = priceTotals.reduce((max, priceTotal) =>
    max._sum.price! > priceTotal._sum.price! ? max : priceTotal
  );
  const highestTotalUser = await db.user.findFirst({
    where: {
      id: highestTotalUserId.userId,
    },
  });

  const userCount = await db.user.count();

  let randomQuote = await fetch("https://api.quotable.io/random?minLength=140")
    .then((response) => response.json())
    .then((data) => {
      return data.content;
    });

  return json({
    itemAmount,
    userCount,
    highestTotalUser,
    randomQuote,
  });
};

export default function IndexRoute() {
  const data = useLoaderData<typeof loader>();

  return (
    <>
      <Header quote={data.randomQuote} />
      <div className="h-full w-full flex flex-row flex-wrap justify-center mt-24">
        <div className="p-6 w-3/12 h-2/5 flex flex-col items-center justify-center text-gray-700 bg-gray-200 hover:bg-gray-300 hover:animate-pulse rounded-md">
          <p className="text-2xl mb-5">There are currently</p>
          <p className="text-4xl mb-5">
            <span className="font-bold">{data.itemAmount}</span> items
          </p>
          <p className="text-2xl">being paid off</p>
        </div>
        <div className="p-6 w-3/12 h-2/5 mx-14 flex flex-col items-center justify-center text-gray-700 bg-gray-200 hover:bg-gray-300 hover:animate-pulse rounded-md">
          <p className="text-4xl font-bold uppercase mb-6">{data.highestTotalUser.firstName}</p>
          <p className="text-2xl text-center">currently has most contributions</p>
        </div>
        <div className="p-6 w-3/12 h-2/5 flex flex-col items-center justify-center text-gray-700 bg-gray-200 hover:bg-gray-300 hover:animate-pulse rounded-md">
          <p className="text-2xl mb-5">There are</p>
          <p className="text-4xl font-bold mb-5">{data.userCount}</p>
          <p className="text-2xl">Registered users</p>
        </div>
      </div>
    </>
  );
}
