import { CircleNotchIcon } from "@phosphor-icons/react";
import classNames from "classnames";

interface LoadingProps {
  type: "internal" | "auth";
}

function Loading({ type }: LoadingProps) {
  const classes = classNames("w-full flex items-center justify-center", {
    "w-full h-full flex-1": type === "internal",
    "absolute inset-0 bg-white dark:bg-neutral-950 z-50 h-dvh": type === "auth",
  });

  return (
    <div className={classes}>
      <CircleNotchIcon size={52} className="animate-spin text-teddy-500" />
    </div>
  );
}

export default Loading;
