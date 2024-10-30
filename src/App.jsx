import { useState } from "react";
import "./App.css";
import { useEffect } from "react";

const TIMES = "times";
function App() {
  const [rawCss, setRawCss] = useState("");
  const [fixedCss, setFixedCss] = useState("");
  const [times, setTimes] = useState(
    Number(localStorage.getItem(TIMES)) || 4.2
  );
  const [copyText, setCopyText] = useState("Copy");

  useEffect(() => {
    setFixedCss(replaceVwWithPx(rawCss, times));
  }, [rawCss, times]);
  return (
    <div className="w-[80vw] h-[90vh] overflow-hidden flex-col flex items-center gap-2">
      <h1 className="flex text-2xl items-center">
        <div>1vw =</div>

        <input
          className="w-14 p-1 border border-gray-300"
          type="number"
          placeholder="4.2"
          value={times}
          onChange={(e) => {
            setTimes(e.target.value);
            localStorage.setItem(TIMES, e.target.value);
          }}
        />
        <div>px</div>
      </h1>
      <div className="w-full h-full flex relative">
        <textarea
          className="w-[50%] p-2 border border-gray-300 resize-none"
          placeholder="Paste your vw CSS here"
          value={rawCss}
          onChange={(e) => {
            setRawCss(e.target.value);
            setCopyText("Copy");
          }}
        />
        {rawCss && (
          <button
            className="absolute top-2 right-[50.5%] z-20"
            onClick={() => {
              setRawCss("");
            }}
          >
            Clean
          </button>
        )}

        <textarea
          className="w-[50%] p-2 border border-gray-300 resize-none"
          placeholder="Fixed px CSS"
          value={fixedCss}
          readOnly
        />

        <button
          className="absolute top-2 right-2 z-20"
          onClick={() => {
            copyToClipboard(fixedCss);
            setCopyText("Copied");
          }}
        >
          {copyText}
        </button>
      </div>
    </div>
  );
}

function replaceVwWithPx(str, times) {
  if (!times) {
    times = 4.2;
  }
  return str.replace(/(\d+)vw/g, function (match, p1) {
    const pxValue = Number(p1) * Number(times);
    const roundedNum = pxValue.toFixed(2);
    return roundedNum + "px";
  });
}

const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    console.log("Text copied to clipboard");
  } catch (err) {
    console.error("Error in copying text: ", err);
  }
};
export default App;
