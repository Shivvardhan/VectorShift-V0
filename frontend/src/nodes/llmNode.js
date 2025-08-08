// llmNode.js

import BaseNode from "./baseNode";

export const LLMNode = ({ id }) => {
  const handleStyles = {
    [`${id}-system`]: { top: "33%" },
    [`${id}-prompt`]: { top: "66%" },
    [`${id}-response`]: { top: "50%" },
  };

  return (
    <BaseNode
      title="LLM Node"
      inputs={[`${id}-system`, `${id}-prompt`]}
      outputs={[`${id}-response`]}
      handleStyles={handleStyles}
      style={{ width: 200, height: 80, border: "1px solid black" }}
    >
      <div className="text-xs text-gray-700">
        <p>This is an LLM node.</p>
      </div>
    </BaseNode>
  );
};
