"use client";

export const Button = ({
  children,
  ...props
}: React.PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement>>) => {
  return (
    <button
      className="p-2 bg-primary appearance-none text-background font-semibold"
      {...props}
    >
      {children}
    </button>
  );
};
