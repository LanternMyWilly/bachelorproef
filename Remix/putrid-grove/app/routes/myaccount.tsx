import { LinksFunction, MetaFunction } from "@remix-run/node";
import { UnderContruction } from "~/components/under-construction";
import styles from "~/styles/under-construction.css";

export const meta: MetaFunction = () => ({
  description: "A placeholder for the coming account management system. You'll be able to edit or add information",
  title: "Putrid Grove | MyAccount",
});

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};
export default function MyAccount() {
  return <UnderContruction />;
}
