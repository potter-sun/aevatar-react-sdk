import { createContext, useContext, useState, ReactNode } from "react";

type NodeType = "input" | "default" | "output";

const DnDContext = createContext<
  [NodeType | null, React.Dispatch<React.SetStateAction<NodeType | null>>]
>([null, () => {}]);

interface DnDProviderProps {
  children: ReactNode;
}

export const DnDProvider: React.FC<DnDProviderProps> = ({ children }) => {
  const [type, setType] = useState<NodeType | null>(null);

  return (
    <DnDContext.Provider value={[type, setType]}>
      {children}
    </DnDContext.Provider>
  );
};

export default DnDContext;

// useDnD hook
export const useDnD = (): [
  NodeType | null,
  React.Dispatch<React.SetStateAction<NodeType | null>>
] => {
  return useContext(DnDContext);
};
