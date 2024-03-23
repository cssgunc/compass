import { ReactNode } from "react";

interface CalloutProps {
  children: ReactNode;
}

const Callout = ({ children }: CalloutProps) => {
  return (
    <div className="p-4 mb-4 flex items-center border-gray-300 bg-gray-100 rounded-lg">
      <span className="text-sm text-gray-700">{children}</span>
    </div>
  );
};

export default Callout;