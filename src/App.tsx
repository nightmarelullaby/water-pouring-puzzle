import { useState, useTransition } from "react";
import "./App.css";
import {
  PouringFinderType,
  checkIfValid,
  findOptimalPath,
} from "./utils/pouringPathFinder";
import WaterJug from "./components/bucket";
const rules = [
  "You can only use integers",
  "Both capacities must be greater than 0",
  "Both capacities must be greater than desired amount",
  "Allowed actions: Empty, Fill, Transfer",
];
function App() {
  const [result, setResult] = useState<PouringFinderType>([""]);
  const [errors, setErrors] = useState<string | null>(null);

  const [isPending, startTransition] = useTransition();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const { bucketA, bucketB, amountWanted } = Object.fromEntries(formData);
    if (bucketA === "" || bucketB === "" || amountWanted === "")
      return setErrors("Required values");
    const isValid = checkIfValid(
      Number(bucketA),
      Number(bucketB),
      Number(amountWanted)
    );
    if (Array.isArray(isValid)) {
      return setErrors(isValid[0]);
    }
    setResult([""]);
    setErrors(null);
    startTransition(() => {
      setResult(
        findOptimalPath(
          Number(bucketA),
          Number(bucketB),
          Number(amountWanted)
        ) as PouringFinderType
      );
    });
  };
  return (
    <>
      <h1>Water Jug Challenge</h1>
      <p>
        Providing two different bucket capacities, we want to get the amount
        desired by pouring, filling and emptying the jugs
      </p>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h4 style={{ textAlign: "start", margin: 0 }}>Limitationss</h4>
        <ul style={{ display: "inline-block" }}>
          {rules.map((rule) => (
            <li>
              <p style={{ textAlign: "start" }}>{rule}</p>
            </li>
          ))}
        </ul>
      </div>
      <form onSubmit={handleSubmit}>
        <div
          style={{
            margin: "24px 0",
            display: "flex",
            alignItems: "end",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "start",
              flexDirection: "column",
            }}
          >
            <label>Bucket A</label>
            <input style={{ padding: 16 }} name="bucketA" type="number" />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "start",
              flexDirection: "column",
            }}
          >
            <label>Bucket B</label>
            <input style={{ padding: 16 }} name="bucketB" type="number" />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "start",
              flexDirection: "column",
            }}
          >
            <label>Amount wanted</label>
            <input style={{ padding: 16 }} name="amountWanted" type="number" />
          </div>
          <button disabled={isPending} type="submit">
            Submit
          </button>
        </div>
        {errors && <p style={{ color: "red" }}>{errors}</p>}
      </form>
      {isPending && <h2>Loading...</h2>}
      {typeof result[0] === "string" && <p>{result[0]}</p>}
      {!isPending && (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            <h3>Results:</h3>
            {Array.isArray(result[0]) && (
              <p>
                sequence:{" "}
                {JSON.stringify(
                  result[0].map(
                    (step) =>
                      "(" + step[0].current + "," + step[1].current + ")"
                  )
                ).split('"')}
              </p>
            )}
            {Array.isArray(result[0]) && <p>Steps: {result[0].length}</p>}
          </div>{" "}
          <p>Visual: </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
            {Array.isArray(result[0]) &&
              result[0].map((el, index) => (
                <div
                  key={el[0].key}
                  style={{
                    display: "flex",
                    gap: 32,
                    padding: 24,
                    border:
                      index === result[0].length - 1
                        ? "3px solid #4ade80"
                        : "2px solid #374151",
                  }}
                >
                  <div style={{ display: "flex" }}>
                    <p>A: </p>
                    <div style={{ width: 80, height: "100%" }}>
                      <WaterJug
                        state={el[0].state}
                        value={el[0].current}
                        maxCapacity={el[0].maxCapacity}
                      />
                    </div>
                  </div>
                  <div style={{ display: "flex" }}>
                    <p>B: </p>
                    <div style={{ width: 80, height: "100%" }}>
                      <WaterJug
                        state={el[1].state}
                        value={el[1].current}
                        maxCapacity={el[1].maxCapacity}
                      />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </>
      )}
    </>
  );
}

export default App;
