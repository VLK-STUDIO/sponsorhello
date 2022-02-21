![Sponsorhello logo](https://sponsorello.org/logo.svg)

---

[![Sponsorhello](https://img.shields.io/badge/We%20Sponsorhello%20Open%20Source-Do%20it%20too-0066ff)](https://sponsorhello.org)
[![Netlify Status](https://api.netlify.com/api/v1/badges/92e1f9b9-9dbe-4357-b69a-92137c96aac3/deploy-status)](https://app.netlify.com/sites/inspiring-wright-610359/deploys)

---

## How it works

With **Sponsorhello** you can check how many open source projects in your `package.json` are searching for funding in a couple of seconds.

To use it, you just have to go to the home page ([here](https://sponsorello.org)) and drop a `package.json`, we will tell you all the projects you're using that are searching for your help and for each of them, all the links to directly fund those project.

If you're already funding some projects, we prepared a badge that you can use to say to the world how much you're kind:

[![Sponsorhello](https://img.shields.io/badge/We%20Sponsorhello%20Open%20Source-Do%20it%20too-0066ff)](https://sponsorhello.org)

You can place it wherever you want, like in your Github profile or on your website.

To have it, this is the markdown:

```
[![Sponsorhello](https://img.shields.io/badge/We%20Sponsorhello%20Open%20Source-Do%20it%20too-0066ff)](https://sponsorhello.org)
```

### How we find the projects

We are using mostly 2 apis, [`npms api`](https://api-docs.npms.io/) and [`github graphql api`](https://docs.github.com/en/graphql).

After reading your `package.json` we retrieve from `npms` details about all the `dependencies`, `peerDependencies` and `devDependencies` you're using; Then, for each of them, we contact `npms` again to retrieve also the dependencies of your direct packages.

Once we know the libraries you're using, we retrieve thought the `github graphql api` which of them are searching for funding.

![How Sponsorhello works!](https://sponsorello.org/how-it-works.png "How Sponsorhello works!")

> Shut out to [Excalidraw](https://excalidraw.com/) for the cool drawing

## Why Sponsorhello?

**Sponsorhello** was born because in [VLK Studio](https://vlkstudio.com) we wanted to fund open source projects applying a _super_ simple process:

- Define a `budget`
- Select 20 open source projects we're using in our daily jobs
- Subscribe for a `(budget / 20)` monthly subscription to these projects
- We're happy and the world is a better place 🌎

After we started to do it, we thought that every company can do something like this, the budget doesn't matter, can be 20$ per month (so you're giving just 1$ per project) or 100, or 1000, if everyone will give something, the eco-system of projects will grow dramatically.

So we created this website and here you are!

### Fun fact

The name **Sponsorhello** was chosen because:

- It sounds italian (yep, we are from Italy 🍝 🤌 🍕 🇮🇹 )
- The domain sponsorhello.org was available
