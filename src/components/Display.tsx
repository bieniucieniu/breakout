import { button, display } from "./styles/basicComponents.css";

export const ValueDisplay = ({
  name,
  value,
}: {
  name?: string;
  value?: number;
}) => {
  return (
    <div className={display}>
      {name}
      {name && " : "}
      {value}
    </div>
  );
};
