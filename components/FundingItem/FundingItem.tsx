import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FundingLink } from "./FundingLink";
import { ProjectInfo } from "../../types/projects";
import styles from "./FundingItem.module.css";
import { Card } from "../Card";

export const FundingItem: React.VFC<ProjectInfo> = ({
  name,
  owner,
  image,
  fundingLinks,
}) => {
  return (
    <Card>
      <div className={styles.header}>
        <Link href={`https://github.com/${owner}/${name}`} passHref>
          <a target="_blank">
            {owner}/{name}
          </a>
        </Link>
        {image && (
          <Image
            src={image}
            width="100%"
            height={150}
            objectFit="contain"
            alt={`Cover image of https://github.com/${owner}/${name}`}
          />
        )}
      </div>
      <div>
        {fundingLinks.map((funding) => (
          <FundingLink
            key={funding.url}
            platform={funding.platform}
            url={funding.url}
          />
        ))}
      </div>
    </Card>
  );
};
