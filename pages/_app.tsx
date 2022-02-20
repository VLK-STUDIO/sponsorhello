import "../styles/globals.css";
import "nextra-theme-docs/style.css";
import type { AppProps } from "next/app";
import { ProjectProvider } from "../contexts/ProjectsContext";

function Nextra({ Component, pageProps }: AppProps) {
  return (
    <ProjectProvider>
      <Component {...pageProps} />
    </ProjectProvider>
  );
}

export default Nextra;
