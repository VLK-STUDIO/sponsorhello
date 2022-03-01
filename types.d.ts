declare module "nextra-theme-docs/callout" {
  export type CalloutProps = {
    emoji?: string;
    type?: "warning" | "error";
  };

  const Callout: React.FC<CalloutProps>;

  export default Callout;
}

declare module "nextra-theme-docs/bleed" {
  export type BleedProps = {
    full?: boolean;
  };

  const Bleed: React.FC<BleedProps>;

  export default Bleed;
}
