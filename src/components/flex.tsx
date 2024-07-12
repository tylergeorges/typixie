import { cn } from "@/utils/cn";

interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Column = ({ children, className, ...props }: FlexProps) => {
  return (
    <div className={cn("flex vertical", className)} {...props}>
      {children}
    </div>
  );
};

export const Row = ({ children, className, ...props }: FlexProps) => {
  return (
    <div className={cn("flex horizontal", className)} {...props}>
      {children}
    </div>
  );
};
