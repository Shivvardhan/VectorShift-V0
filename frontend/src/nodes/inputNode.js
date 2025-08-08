// InputNode.jsx

import { useState, useEffect } from "react";
import BaseNode from "./baseNode";

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.inputName || id.replace("customInput-", "input_")
  );
  const [inputType, setInputType] = useState(data.inputType || "Text");

  // Sync local state with ReactFlow data
  useEffect(() => {
    if (data) {
      if (data.inputName !== currName) data.inputName = currName;
      if (data.inputType !== inputType) data.inputType = inputType;
    }
  }, [currName, inputType, data]);

  return (
    <BaseNode
      title="Input Node"
      inputs={[]}
      outputs={[`${id}-value`]}
      style={{ width: 200, height: 80, border: "1px solid black" }}
    >
      <div className="flex flex-col gap-2 text-xs">
        <label>
          Name:
          <input
            type="text"
            value={currName}
            onChange={(e) => setCurrName(e.target.value)}
            className="border rounded px-1 py-0.5 w-full"
          />
        </label>
        <label>
          Type:
          <select
            value={inputType}
            onChange={(e) => setInputType(e.target.value)}
            className="border rounded px-1 py-0.5 w-full"
          >
            <option value="Text">Text</option>
            <option value="File">File</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
};
