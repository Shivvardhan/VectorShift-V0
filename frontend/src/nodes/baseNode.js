// src/Node.js

import React from "react";
import { Handle, Position } from "reactflow";

const Node = ({
  title,
  inputs = [],
  outputs = [],
  handleStyles = {},
  children,
  style = {},
  className = "",
}) => {
  return (
    <div
      className={`rounded border shadow-md bg-white p-3 min-w-[200px] ${className}`}
      style={{ position: "relative", ...style }}
    >
      <div className="font-semibold mb-2">{title}</div>

      {inputs.map((handle) => (
        <Handle
          key={handle.id}
          type={handle.type || "target"}
          position={handle.position || Position.Left}
          id={handle.id}
          style={{ ...handleStyles[handle.id] }}
        />
      ))}

      <div className="mb-2">{children}</div>

      {outputs.map((handle) => (
        <Handle
          key={handle.id}
          type={handle.type || "source"}
          position={handle.position || Position.Right}
          id={handle.id}
          style={{ ...handleStyles[handle.id] }}
        />
      ))}
    </div>
  );
};

export default Node;
