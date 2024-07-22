/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, useEffect, useRef, useState } from "react";
import {
  align,
  border,
  center,
  column,
  gap,
  h,
  padding,
  row,
  text,
  w,
} from "../styles";
import PresetSelect from "./components/atom/Select";
import Table from "./components/atom/Table";
import { Calculator, Preset } from "./core/calculate";
// import "./index.css";

const debounce = <T extends (...args: any[]) => any>(fn: T, delay: number) => {
  let timeout: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>): ReturnType<T> => {
    let result: any;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      result = fn(...args);
    }, delay);
    return result;
  };
};

function Spend2Buy() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preset, setPreset] = useState<Preset | null>(null);
  const [value, setValue] = useState<number | null>(null);
  const [result, setResult] = useState<ReturnType<typeof Calculator.naiveDP>>();
  const debouncedOnChange = debounce((e: ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value);
    let value;
    if (isNaN(v) || v <= 0) {
      value = "";
    } else if (!Number.isInteger(v)) {
      value = Math.ceil(v).toString();
    } else {
      value = v.toString();
    }
    inputRef.current!.value = value.toString();
    setValue(value === "" ? null : parseFloat(value));
  }, 500);

  useEffect(() => {
    if (preset === null) return;
    if (value === null) {
      setResult(undefined);
    } else {
      setResult(Calculator.naiveDP(preset!.options, value!));
    }
  }, [preset, value]);
  return (
    <div
      css={[center]}
      style={{
        width: "100vw",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <div css={[center, column, gap(8)]}>
        <h1>Spend2Buy</h1>
        <div
          css={[row, center, gap(8), text.titleM, w("fill")]}
          style={{
            flexFlow: "wrap",
          }}
        >
          <p css={[w("hug")]}>I want to buy at least</p>
          <input
            css={[
              h(38),
              w(100),
              padding.horizontal(8),
              border.gray300,
              border.round(4),
              text.bodyL
            ]}
            ref={inputRef}
            placeholder="123"
            inputMode="numeric"
            type="number"
            onChange={debouncedOnChange}
          />
          <p css={[w("hug")]}>with minimal cost for</p>
          <PresetSelect onChange={setPreset} />
        </div>
        {result && (
          <p css={[w("hug"), text.labelL]}>
            {`Buy ${result.value} ${preset!.valueUnit} ${
              result.value - value! ? `(+${result.value - value!})` : null
            } with ${preset!.costUnit}${result.cost}`}
          </p>
        )}
        {preset !== null && (
          <Table preset={preset} choice={result?.choice ?? {}} />
        )}
      </div>
      <div
        css={[w("hug"), text.labelL, column, align.end]}
        style={{ position: "absolute", right: "10px", bottom: "10px" }}
      >
        <p>To update or add new preset for other game,</p>
        <p>contact me with jeukhwang.dev(at)gmail.com</p>
      </div>
    </div>
  );
}

export default Spend2Buy;
