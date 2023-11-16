import type { FC } from "hono/jsx";

export const RootLayout: FC = (props) => {
  return (
    <html>
      <head>
        <title>Fuck You Transloc</title>
        <script
          src="https://unpkg.com/htmx.org@1.9.8"
          integrity="sha384-rgjA7mptc2ETQqXoYC3/zJvkU7K/aP44Y+z7xQuJiVnB/422P/Ak+F/AqFR7E4Wr"
          crossorigin="anonymous"
        ></script>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body>{props.children}</body>
    </html>
  );
};
