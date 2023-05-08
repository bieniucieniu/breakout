import { useRef, useState } from "react";
import { useStorage } from "../storage";
import {
  configEditor,
  objectsModule,
  primitivesModule,
  configButtons,
} from "./styles/configEditor.css";
import { Button, LinkButton } from "./Buttons";
import defaultConfig from "../defaultConfig";

type ConfigTypes = String | Number | Boolean | Obj;

type Obj = {
  [key: string]: ConfigTypes;
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
  if (typeof parent[keyToElement] === "string") {
    const [input, setInput] = useState(parent[keyToElement] as string);
    const handlechange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInput(e.target.value);
      parent[keyToElement] = e.target.value;
    };

    return (
      <p className={primitivesModule}>
        <span>{keyToElement}</span>
        <input type="text" value={input} onChange={handlechange} />
      </p>
    );
  }
  if (typeof parent[keyToElement] === "number") {
    const [input, setInput] = useState(parent[keyToElement] as number);
    const handlechange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInput(Number(e.target.value));
      parent[keyToElement] = Number(e.target.value);
    };

    return (
      <p className={primitivesModule}>
        <span>{keyToElement}</span>
        <input type="number" value={input} onChange={handlechange} />
      </p>
    );
  }
  if (typeof parent[keyToElement] === "boolean") {
    const [input, setInput] = useState(parent[keyToElement] as boolean);
    const handlechange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInput(e.target.checked);
      parent[keyToElement] = e.target.checked;
    };

    return (
      <p className={primitivesModule}>
        <span>{keyToElement}</span>
        <input type="checkbox" checked={input} onChange={handlechange} />;
      </p>
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
    const [open, setOpen] = useState(false);

    return (
      <div className={objectsModule} style={{ border: open ? "" : "none" }}>
        <Button name={keyToElement} onClick={() => setOpen(!open)} />
        <div
          style={{
            height: open ? "" : 0,
            overflow: open ? "" : "hidden",
          }}
        >
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

export const ConfigEditor = () => {
  const config = useStorage((state) => state.config);
  const setConfig = useStorage((state) => state.setConfig);
  const ref = useRef(JSON.parse(JSON.stringify(config)));

  return (
    <div className={configEditor}>
      <ObjectsModule keyToElement={"game"} parent={ref.current} />
      <div className={configButtons}>
        <LinkButton name={"back"} href={"/"} />
        <Button name={"submit"} onClick={() => setConfig(ref.current)} />
        <Button
          name={"reset"}
          onClick={() => setConfig(JSON.parse(JSON.stringify(defaultConfig)))}
        />
      </div>
    </div>
  );
};
