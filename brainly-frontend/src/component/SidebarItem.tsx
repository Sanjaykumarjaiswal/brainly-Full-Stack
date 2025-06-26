import type { ReactElement } from "react";

function SidebarItem({ text, icon, onClick }: { text: string; icon: ReactElement; onClick?: () => void }) {
  return (
    <div className="flex items-center text-gray-500 cursor-pointer max-w-48 pl-4 hover:bg-gray-200 transition-all duration-300" onClick={onClick}>
      <div className="p-2">{icon}</div>
      <div>{text}</div>
    </div>
  );
}

export default SidebarItem;
