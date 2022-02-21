module.exports = {
  github: "https://github.com/VLK-STUDIO/sponsorhello",
  projectLink: "https://github.com/VLK-STUDIO/sponsorhello",
  docsRepositoryBase: "https://github.com/VLK-STUDIO/sponsorhello/blob/master",
  titleSuffix: " – fund the projects you love",
  nextLinks: false,
  prevLinks: false,
  search: false,
  darkMode: false,
  footer: true,
  footerText: `MIT ${new Date().getFullYear()} © VLK Studio.`,
  footerEditLink: `Edit this page on GitHub`,
  floatTOC: true,
  logo: (
    <>
      <img
        src="logo.svg"
        width={150}
        alt="Sponsorello logo"
        style={{ marginRight: 10 }}
      />
      <span>fund the projects you love</span>
    </>
  ),
  head: (
    <>
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="theme-color" content="#ffffff" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Language" content="en" />
      <meta
        name="description"
        content="Sponsorhello: sponsor the projects you love"
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@VlkStudio" />
      <meta
        property="og:title"
        content="Sponsorhello: fund the projects you love"
      />
      <meta
        property="og:description"
        content="Sponsorhello: fund the projects you love"
      />
      <meta name="apple-mobile-web-app-title" content="Sponsorhello" />
      <link
        rel="icon"
        href="/favicon.ico"
        media="(prefers-color-scheme: light)"
      />
      <link rel="icon" href="/faviconWhite.ico" />
    </>
  ),
};
