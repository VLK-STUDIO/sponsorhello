import type { AppProps } from "next/app";
import Script from "next/script";
import { ProjectProvider } from "../contexts/ProjectsContext";
import { CookieBanner } from "../components/CookieBanner";
import "nextra-theme-docs/style.css";
import "../styles/globals.css";

function Nextra({ Component, pageProps }: AppProps) {
  return (
    <ProjectProvider>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-1427L4C0M9"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'G-1427L4C0M9');
        `}
      </Script>
      <Component {...pageProps} />
      <CookieBanner />
    </ProjectProvider>
  );
}

export default Nextra;
