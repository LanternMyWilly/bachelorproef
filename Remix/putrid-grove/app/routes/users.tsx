import { LinksFunction, MetaFunction } from "@remix-run/node";
import { UnderContruction } from "~/components/under-construction";
import styles from "~/styles/under-construction.css";

export const meta: MetaFunction = () => ({
  description:
    "A placeholder for the coming page to get an overview of all registered users. You'll be able to manage all users.",
  title: "Putrid Grove | User",
});

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};
export default function Users() {
  return <UnderContruction />;
}
