import "@/styles/globals.css";
import Nav from "@/components/nav";
import Provider from "@/components/Provider";
export const metadata = {
  title: "Promptify",
  description: "Discover the Ai Prompts",
};
const LayoutRoot = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          {" "}
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default LayoutRoot;
