import { button, valueDisplay } from "./styles/basicComponents.css";

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
