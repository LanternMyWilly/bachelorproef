import { LinksFunction, MetaFunction } from "@remix-run/node";
import { UnderContruction } from "~/components/under-construction";
import styles from "~/styles/under-construction.css";

export const meta: MetaFunction = () => ({
  description:
    "A placeholder for the coming payoff system where you'll be able to see all your current payoffs and where you will be able to add a payment.",
  title: "Putrid Grove | Payoffs",
});

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};
export default function Payoffs() {
  return <UnderContruction />;
}
