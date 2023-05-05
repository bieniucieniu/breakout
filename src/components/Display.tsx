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

type DisplayProps = (ValueProps | ChildrenProps) &
  React.HTMLProps<HTMLDivElement>;

export const Display = ({
  name,
  value,
  children,
  className,
  ...props
}: DisplayProps) => {
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

import { key } from "./styles/gameMenu.css";

type Keys = {
  keys: string[];
} & React.HTMLProps<HTMLDivElement>;

export const Keys = ({ keys, className, ...props }: Keys) => {
  return (
    <div className={className} {...props}>
      {keys.map((k, i) => (
        <>
          {i !== 0 && " / "}
          <span className={key}>{k}</span>
        </>
      ))}
    </div>
  );
};
