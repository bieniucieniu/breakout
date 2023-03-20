import { button, valueDisplay } from "./styles/basicComponents.css";

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

export const ValueDisplay = ({
  name,
  value,
}: {
  name?: string;
  value?: number;
}) => {
  return (
    <div className={valueDisplay}>
      {name}
      {name && " : "}
      {value}
    </div>
  );
};
