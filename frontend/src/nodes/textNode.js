// textNode.jsx

import { useState, useEffect } from "react";
import { Position } from "reactflow";
import { useStore } from "../store";
import BaseNode from "./baseNode";
import TextareaAutosize from "react-textarea-autosize";

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || "");
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [pendingConnection, setPendingConnection] = useState(null);

  const { nodes, onConnect } = useStore((state) => ({
    nodes: state.nodes,
    onConnect: state.onConnect,
  }));

  useEffect(() => {
    if (data) data.text = currText;
  }, [currText, data]);

  useEffect(() => {
    if (pendingConnection) {
      onConnect(pendingConnection);

      setPendingConnection(null);
    }
  }, [currText, pendingConnection, onConnect]);

  const inputNodes = nodes.filter((n) => n.type === "customInput");
  const inputNames = inputNodes.map((n) => ({
    id: n.id,
    name: n.data.inputName,
  }));

  const variables = Array.from(currText.matchAll(/{{(.*?)}}/g)).map((match) =>
    match[1].trim()
  );

  const inputHandles = variables.map((variable) => ({
    type: "target",
    position: Position.Left,
    id: variable,
  }));

  const outputHandles = [
    {
      type: "source",
      position: Position.Right,
      id: `${id}-output`,
    },
  ];

  const totalHandles = variables.length;

  const handleStyles = {};
  variables.forEach((variable, index) => {
    const topPercentage = ((index + 1) * 100) / (totalHandles + 1);
    handleStyles[variable] = { top: `${topPercentage}%` };
  });

  const baseHeight = 70;
  const rowHeight = 25;
  const nodeHeight = baseHeight + Math.max(0, totalHandles - 1) * rowHeight;

  const handleChange = (e) => {
    const value = e.target.value;
    setCurrText(value);

    const match = value.match(/{{\s*([\w]*)$/);
    if (match) {
      const keyword = match[1];
      const filtered = inputNames.filter((i) => i.name.startsWith(keyword));
      setSuggestions(filtered);
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    const match = currText.match(/{{\s*([\w]*)$/);
    if (!match) return;

    const start = currText.slice(0, match.index);
    const updatedText = `${start}{{${suggestion.name}}}`;

    setCurrText(updatedText);
    setShowDropdown(false);

    setPendingConnection({
      source: suggestion.id,
      sourceHandle: `${suggestion.id}-value`,
      target: id,
      targetHandle: suggestion.name,
    });
  };

  return (
    <BaseNode
      title="Text Node"
      inputs={inputHandles}
      outputs={outputHandles}
      style={{ minHeight: `${nodeHeight}px`, border: "solid black 1px" }}
      handleStyles={handleStyles}
    >
      <div className="relative p-2">
        <TextareaAutosize
          value={currText}
          onChange={handleChange}
          className="nodrag w-full rounded border border-gray-300 p-2 text-sm resize-none"
          placeholder="Type here, use {{variable}}..."
          minRows={3}
        />
        {showDropdown && (
          <div className="absolute z-10 w-full rounded-md border border-gray-200 bg-white shadow-lg">
            {suggestions.length > 0 ? (
              suggestions.map((s) => (
                <div
                  key={s.id}
                  className="cursor-pointer p-2 text-sm hover:bg-gray-100"
                  onClick={() => handleSuggestionClick(s)}
                >
                  {s.name}
                </div>
              ))
            ) : (
              <div className="p-2 text-xs text-gray-500">No matches</div>
            )}
          </div>
        )}
      </div>
    </BaseNode>
  );
};
