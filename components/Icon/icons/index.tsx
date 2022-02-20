import React from "react";
import { GenericIcon } from "./generic";
import { GithubIcon } from "./github";
import { IssueHuntIcon } from "./issuehunt";
import { KofiIcon } from "./ko-fi";
import { LfxIcon } from "./lfx";
import { LiberaPayIcon } from "./liberapay";
import { OpenCollectiveIcon } from "./opencollective";
import { OtechieIcon } from "./otechie";
import { PatreonIcon } from "./patreon";
import { TideLiftIcon } from "./tidelift";
import { Logo } from "./logo";

export const icons: Record<string, JSX.Element> = {
  lfx: <LfxIcon />,
  logo: <Logo />,
  kofi: <KofiIcon />,
  otechie: <OtechieIcon />,
  github: <GithubIcon />,
  generic: <GenericIcon />,
  patreon: <PatreonIcon />,
  tidelift: <TideLiftIcon />,
  issuehunt: <IssueHuntIcon />,
  liberapay: <LiberaPayIcon />,
  open_collective: <OpenCollectiveIcon />,
};
