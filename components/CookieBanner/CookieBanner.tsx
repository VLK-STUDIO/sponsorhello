import React, { useState } from "react";
import Cookies from "js-cookie";
import { Card } from "../Card";
import CloseIcon from "./CloseIcon";
import styles from "./CookieBanner.module.css";

const COOKIE_POLICY_KEY = "sponsorhello-privacy-cookie";

export const CookieBanner: React.VFC = () => {
  const [visible, setVisible] = useState(
    Cookies.get(COOKIE_POLICY_KEY) !== "true"
  );

  const toggle = () => {
    Cookies.set(COOKIE_POLICY_KEY, "true");
    setVisible(false);
  };

  if (!visible) {
    return <></>;
  }

  return (
    <Card className={styles.container}>
      <p>We use cookies to improve your experience on our site.</p>
      <CloseIcon className={styles.closeIcon} onClick={toggle} />
    </Card>
  );
};
