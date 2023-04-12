import { display } from "./styles/basicComponents.css";

type ValueProps = {
  name?: string;
  value?: number;
  children?: never;
};

type ChildrenProps = {
  children?: React.ReactNode;
  value?: never;
  name?: never;
};

type Props = (ValueProps | ChildrenProps) & React.HTMLProps<HTMLDivElement>;

export const Display = ({
  name,
  value,
  children,
  className,
  ...props
}: Props) => {
  if (children) {
    return (
      <div className={`${display} ${className}`} {...props}>
        {children}
      </div>
    );
  }

  return (
    <div className={`${display} ${className}`} {...props}>
      {name}
      {value !== undefined && " : "}
      {value}
    </div>
  );
};
