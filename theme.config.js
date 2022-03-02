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
      <img src="logo.svg" alt="Sponsorello logo" className="navbar-logo" />
      <span className="hide-on-sm">fund the projects you love</span>
    </>
  ),
  head: (
    <>
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="theme-color" content="#ffffff" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Language" content="en" />
      <meta name="apple-mobile-web-app-title" content="Sponsorhello" />
      <link
        rel="icon"
        href="/favicon.ico"
        media="(prefers-color-scheme: light)"
      />
      <link rel="icon" href="/faviconWhite.ico" />

      <meta charset="utf-8" />
      <title>Sponsorhello - Fund the projects you love</title>

      <meta
        name="description"
        content="With Sponsorhello you can check how many open source projects in your package.json are searching for funding in a couple of seconds."
      />
      <meta name="image" content="https://sponsorhello.org/social.png" />

      <meta
        itemProp="name"
        content="Sponsorhello - Fund the projects you love"
      />
      <meta
        itemProp="description"
        content="With Sponsorhello you can check how many open source projects in your package.json are searching for funding in a couple of seconds."
      />
      <meta itemProp="image" content="https://sponsorhello.org/social.png" />

      <meta
        name="twitter:description"
        content="With Sponsorhello you can check how many open source projects in your package.json are searching for funding in a couple of seconds."
      />
      <meta name="twitter:card" content="summary_large" />
      <meta
        name="twitter:title"
        content="Sponsorhello - Fund the projects you love"
      />
      <meta name="twitter:site" content="@VlkStudio" />
      <meta name="twitter:creator" content="@VlkStudio" />
      <meta
        name="twitter:image:src"
        content="https://sponsorhello.org/social.png"
      />

      <meta
        name="og:title"
        property="og:title"
        content="Sponsorhello - Fund the projects you love"
      />
      <meta
        name="og:description"
        property="og:description"
        content="With Sponsorhello you can check how many open source projects in your package.json are searching for funding in a couple of seconds."
      />
      <meta
        name="og:image"
        property="og:image"
        content="https://sponsorhello.org/social.png"
      />
      <meta
        name="og:url"
        property="og:url"
        content="https://sponsorhello.org/"
      />
      <meta
        name="og:site_name"
        property="og:site_name"
        content="Sponsorhello - Fund the projects you love"
      />
      <meta name="og:type" property="og:type" content="website" />
    </>
  ),
};
