import { useRef, useState } from "react";
import { useStorage } from "../storage";
import {
  configEditor,
  objectsModule,
  primitivesModule,
  configButtons,
  objectOpen,
  objectClosed,
  listWraper,
} from "./styles/configEditor.css";
import { Button, LinkButton } from "./Buttons";
import defaultConfig from "../defaultConfig";

type ConfigTypes = String | Number | Boolean;

type Obj = {
  [key: string]: ConfigTypes | Obj;
};

const ArrayModule = ({}: {}) => {};

const PrimitivesModule = ({
  keyToElement,
  parent,
}: {
  keyToElement: string;
  parent: Obj;
}) => {
  if (parent[keyToElement] === undefined) return <p>error</p>;

  const [input, setInput] = useState(parent[keyToElement] as ConfigTypes);

  switch (typeof parent[keyToElement]) {
    case "string": {
      const handlechange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
        parent[keyToElement] = e.target.value;
      };
      return (
        <p className={primitivesModule}>
          <span>{keyToElement}</span>
          <input type="text" value={input as string} onChange={handlechange} />
        </p>
      );
    }
    case "number": {
      const handlechange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(Number(e.target.value));
        parent[keyToElement] = Number(e.target.value);
      };

      return (
        <p className={primitivesModule}>
          <span>{keyToElement}</span>
          <input
            type="number"
            value={input as number}
            onChange={handlechange}
          />
        </p>
      );
    }
    case "boolean": {
      const handlechange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.checked);
        parent[keyToElement] = e.target.checked;
      };
      return (
        <p className={primitivesModule}>
          <span>{keyToElement}</span>
          <input
            type="checkbox"
            checked={input as boolean}
            onChange={handlechange}
          />
        </p>
      );
    }
  }

  return <div>error pre</div>;
};

const ObjectsModule = ({
  keyToElement,
  parent,
}: {
  keyToElement: string;
  parent: Obj;
}) => {
  if (parent && parent[keyToElement]) {
    const obj = parent[keyToElement] as Obj;
    const keys = Object.keys(parent[keyToElement]);
    const [closed, setClosed] = useState(true);

    return (
      <div className={`${objectsModule}`}>
        <Button onClick={() => setClosed(!closed)}>{keyToElement}</Button>
        <div className={closed ? objectClosed : objectOpen}>
          {keys.map((k) => {
            if (typeof obj[k] === "object") {
              return (
                <ObjectsModule
                  key={`Object-${keyToElement}.${k}`}
                  keyToElement={k}
                  parent={obj}
                />
              );
            } else {
              return (
                <PrimitivesModule
                  key={`Primitive-${keyToElement}.${k}`}
                  keyToElement={k}
                  parent={obj}
                />
              );
            }
          })}
        </div>
      </div>
    );
  } else {
    return <div>error obj</div>;
  }
};

export const ConfigEditor = ({
  className,
  back: close,
  ...props
}: { back?: () => void } & React.HTMLProps<HTMLDivElement>) => {
  const config = useStorage((state) => state.config);
  const setConfig = useStorage((state) => state.setConfig);
  const ref = useRef(JSON.parse(JSON.stringify(config)));

  return (
    <div className={`${configEditor} ${className}`} {...props}>
      <div className={listWraper}>
        <ObjectsModule keyToElement={"game"} parent={ref.current} />
      </div>
      <div className={configButtons}>
        <Button onClick={close}>close</Button>
        <Button onClick={() => setConfig(ref.current)}>submit</Button>
        <Button
          onClick={() => setConfig(JSON.parse(JSON.stringify(defaultConfig)))}
        >
          reset
        </Button>
      </div>
    </div>
  );
};
