import { useLocation } from "wouter";
import { button, linkButton } from "./styles/basicComponents.css";

export const Button = ({
  name,
  onClick,
  className,
}: {
  name?: string;
  onClick?: () => void;
  className?: string;
}) => {
  return (
    <button className={`${button} ${className}`} onClick={onClick}>
      {name}
    </button>
  );
};

export const LinkButton = ({
  name,
  onClick,
  href,
  className,
}: {
  name?: string;
  onClick?: () => void;
  href: string;
  className?: string;
}) => {
  const [_location, setLocation] = useLocation();

  return (
    <button
      className={`${linkButton} ${className}`}
      onClick={() => {
        onClick && onClick();
        setLocation(href);
      }}
    >
      {name}
    </button>
  );
};
