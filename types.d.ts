declare module "nextra-theme-docs/callout" {
  export type CalloutProps = {
    emoji?: string;
    type?: "warning" | "error";
  };

  const Callout: React.FC<CalloutProps>;

  export default Callout;
}
