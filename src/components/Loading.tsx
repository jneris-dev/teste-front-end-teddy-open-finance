import { CircleNotchIcon } from "@phosphor-icons/react";

function Loading() {
  return (
    <div className="w-full h-dvh flex items-center justify-center bg-white">
      <CircleNotchIcon size={52} className="animate-spin text-teddy-500" />
    </div>
  );
}

export default Loading;
