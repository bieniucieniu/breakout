import { useRef, useState } from "react";
import { useStorage } from "../storage";
import { configEditor } from "./styles/configEditor.css";

type ConfigTypes = String | Number | Boolean | Obj;

type Obj = {
  [key: string]: ConfigTypes;
};

const PrimitivesModule = ({
  keyToElement,
  parent,
}: {
  keyToElement: string;
  parent: Obj;
}) => {
  if (parent[keyToElement] === undefined) return <p>error</p>;
  if (typeof parent[keyToElement] === "string") {
    const [input, setInput] = useState(parent[keyToElement] as string);
    const handlechange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInput(e.target.value);
      parent[keyToElement] = e.target.value;
    };

    return (
      <div>
        <span>{keyToElement}</span>
        <input type="text" value={input} onChange={handlechange} />;
      </div>
    );
  }
  if (typeof parent[keyToElement] === "number") {
    const [input, setInput] = useState(parent[keyToElement] as number);
    const handlechange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInput(Number(e.target.value));
      parent[keyToElement] = Number(e.target.value);
    };

    return (
      <div>
        <span>{keyToElement}</span>
        <input type="number" value={input} onChange={handlechange} />;
      </div>
    );
  }
  if (typeof parent[keyToElement] === "boolean") {
    const [input, setInput] = useState(parent[keyToElement] as boolean);
    const handlechange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInput(e.target.checked);
      parent[keyToElement] = e.target.checked;
    };

    return (
      <div>
        <span>{keyToElement}</span>
        <input type="checkbox" checked={input} onChange={handlechange} />;
      </div>
    );
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

    return (
      <div>
        <span>{keyToElement}</span>
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
    );
  } else {
    return <div>error obj</div>;
  }
};

export const ConfigEditor = () => {
  const config = useStorage((state) => state.config);
  const setConfig = useStorage((state) => state.setConfig);
  const ref = useRef(JSON.parse(JSON.stringify(config)));

  return (
    <div className={configEditor}>
      <ObjectsModule keyToElement={"game"} parent={ref.current} />
      <button onClick={() => setConfig(ref.current)}>submit</button>
    </div>
  );
};
