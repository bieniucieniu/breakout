import { display } from "@/styles/basicComponents.css";
import { key } from "@/styles/gameMenu.css";

type ValueProps = {
  text?: string;
  value?: number;
  children?: never;
};

type ChildrenProps = {
  children?: React.ReactNode;
  value?: never;
  text?: never;
};

type DisplayProps = (ValueProps | ChildrenProps) &
  React.HTMLProps<HTMLDivElement>;

export const Display = ({
  text,
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
      {text}
      {value !== undefined && " : "}
      {value}
    </div>
  );
};

type Keys = {
  keys: string[];
} & React.HTMLProps<HTMLDivElement>;

export const Keys = ({ keys, className, ...props }: Keys) => {
  return (
    <div className={className} {...props}>
      {keys.map((k, i) => (
        <span key={i}>
          {i !== 0 && " / "}
          <span className={key}>{k}</span>
        </span>
      ))}
    </div>
  );
};
