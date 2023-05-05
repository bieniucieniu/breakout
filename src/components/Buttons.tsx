import { useLocation } from "wouter";
import { button, linkButton } from "./styles/basicComponents.css";

type Button = { name: string } & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const Button = ({
  name,
  className,
  ...props
}: {
  name?: string;
} & Button) => {
  return (
    <button className={`${button} ${className}`} {...props}>
      {name}
    </button>
  );
};

export const LinkButton = ({
  name,
  href,
  onClick,
  className,
  ...props
}: {
  name?: string;
  onClick?: () => void;
  href: string;
} & Button) => {
  const [_location, setLocation] = useLocation();

  return (
    <button
      className={`${linkButton} ${className}`}
      onClick={() => {
        onClick && onClick();
        setLocation(href);
      }}
      {...props}
    >
      {name}
    </button>
  );
};
