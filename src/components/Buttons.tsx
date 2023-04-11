import { useLocation } from "wouter";
import { button, linkButton } from "./styles/basicComponents.css";

export const Button = ({
  name,
  onClick,
}: {
  name?: string;
  onClick?: () => void;
}) => {
  return (
    <button className={button} onClick={onClick}>
      {name}
    </button>
  );
};

export const LinkButton = ({
  name,
  onClick,
  href,
}: {
  name?: string;
  onClick?: () => void;
  href: string;
}) => {
  const [_location, setLocation] = useLocation();

  return (
    <button
      className={linkButton}
      onClick={() => {
        onClick && onClick();
        setLocation(href);
      }}
    >
      {name}
    </button>
  );
};
