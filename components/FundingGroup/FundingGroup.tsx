import React, { useMemo } from "react";
import Link from "next/link";
import { ProjectInfo } from "../../types/projects";
import styles from "./FundingGroup.module.css";
import Callout from "nextra-theme-docs/callout";
import { RepoSkeleton, CalloutSkeleton } from "./Skeleton";
import { FundingItem } from "../FundingItem";
import { Card } from "../Card";
import { BriefGuide } from "../BriefGuide";

type Props = {
  fundingLinks?: ProjectInfo[];
  isLoading?: boolean;
};

export const FundingGroup: React.VFC<Props> = ({ fundingLinks, isLoading }) => {
  const skeleton = useMemo(
    () =>
      Array.from({ length: 3 })
        .fill(0)
        .map((_, index) => (
          <Card key={index}>
            <RepoSkeleton />
          </Card>
        )),
    []
  );

  const isEmpty = !fundingLinks || fundingLinks.length === 0;

  const renderedFundingLinks = useMemo(() => {
    if (isEmpty) {
      return <></>;
    }

    return fundingLinks.map(({ name, owner, fundingLinks, image }) => (
      <FundingItem
        key={`${owner}/${name}`}
        name={name}
        owner={owner}
        fundingLinks={fundingLinks}
        image={image}
      />
    ));
  }, [isEmpty, fundingLinks]);

  const callOut = useMemo(() => {
    if (isLoading) {
      return <CalloutSkeleton />;
    }

    if (!fundingLinks) {
      return <></>;
    }

    if (fundingLinks.length === 0) {
      return (
        <div className={styles.calloutContainer}>
          <Callout emoji="🔍" type="error">
            We did not find any open source package in search for funding, try
            with another package.json
          </Callout>
        </div>
      );
    }

    return (
      <div className={styles.calloutContainer}>
        <Callout emoji="❤️">
          A total of <code>{fundingLinks.length}</code> projects you&apos;re
          using are searching for funding,{" "}
          <Link href={`/how-it-works`} passHref>
            <a target="_blank">Check how we found them</a>
          </Link>
        </Callout>
      </div>
    );
  }, [fundingLinks, isLoading]);

  return (
    <div className={styles.container}>
      {callOut}
      {isEmpty && <BriefGuide />}
      <div className={styles.grid}>
        {isLoading && skeleton}
        {!isLoading && renderedFundingLinks}
      </div>
    </div>
  );
};
