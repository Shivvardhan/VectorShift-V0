// outputNode.js

import { useState, useEffect } from "react";
import BaseNode from "./baseNode";

export const OutputNode = ({ id, data }) => {
  const initialName =
    data?.outputName ?? id.replace("customOutput-", "output_");
  const initialType = data?.outputType ?? "Text";

  const [currName, setCurrName] = useState(initialName);
  const [outputType, setOutputType] = useState(initialType);

  // Sync local state with ReactFlow data
  useEffect(() => {
    if (data) {
      if (data.outputName !== currName) data.outputName = currName;
      if (data.outputType !== outputType) data.outputType = outputType;
    }
  }, [currName, outputType, data]);

  return (
    <BaseNode
      title="Output Node"
      inputs={[`${id}-value`]}
      outputs={[]}
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
            value={outputType}
            onChange={(e) => setOutputType(e.target.value)}
            className="border rounded px-1 py-0.5 w-full"
          >
            <option value="Text">Text</option>
            <option value="File">Image</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
};
