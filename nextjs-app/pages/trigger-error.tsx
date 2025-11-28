import React from "react";

export default function TriggerError() {
  throw new Error("trigger error ui");
  return <div>trigger error </div>;
}
