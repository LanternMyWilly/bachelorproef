import type { MetaFunction, LinksFunction } from "@remix-run/node";
import { Links, LiveReload, Meta, Outlet, Scripts, useCatch } from "@remix-run/react";
import { Sidebar } from "./components/sidebar";

import globalStylesUrl from "./styles/global.css";
import styles from "./tailwind.css";
import rootStyles from "~/styles/root.css";

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: styles,
    },
    {
      rel: "stylesheet",
      href: globalStylesUrl,
    },
    {
      rel: "stylesheet",
      href: rootStyles,
    },
  ];
};

export const meta: MetaFunction = () => ({
  "google-site-verification": "X_VuiOBNTVm4SDk-Ftyfw8CbihwpCRy1Et7LQWqVioY",
  charset: "utf-8",
  description: "Application made in assignment of a Hogent essay.",
  title: "Putrid Grove Remix Application",
  viewport: "width=device-width,initial-scale=1",
  keywords: "Florian,Serneels,Putrid,Grove,PutridGrove",
});

function Document({ children, title = `Remix: So great, it's funny!` }: { children: React.ReactNode; title?: string }) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="X_VuiOBNTVm4SDk-Ftyfw8CbihwpCRy1Et7LQWqVioY" />
        <Meta />
        <title>{title}</title>
        <Links />
      </head>
      <body>
        <div className="h-full">{children}</div>
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Document>
      <div className="h-full main-container">
        <div id="left" className="column">
          <Sidebar />
        </div>
        <div id="right" className="column w-full h-full overflow-auto bg-gray-100 p-20">
          <Outlet />
        </div>
      </div>
    </Document>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
      <div className="error-container">
        <h1>
          {caught.status} {caught.statusText}
        </h1>
      </div>
    </Document>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);

  return (
    <Document title="Uh-oh!">
      <div className="error-container">
        <h1>App Error</h1>
        <pre>{error.message}</pre>
      </div>
    </Document>
  );
}
