import { button, display } from "./styles/basicComponents.css";

type ValueProps = {
  children?: never;
  value?: number;
  name?: string;
};

type ChildrenProps = {
  children?: React.ReactNode;
  value?: never;
  name?: never;
};

type Props = (ValueProps | ChildrenProps) & React.HTMLProps<HTMLDivElement>;

export const Display = ({ name, value, children, ...props }: Props) => {
  if (children) {
    return <div className={display}>{children}</div>;
  }

  return (
    <div className={display} {...props}>
      {name}
      {name ?? value ?? " : "}
      {value}
    </div>
  );
};
