import { useLocation } from "wouter";
import { button, linkButton } from "./styles/basicComponents.css";
import React from "react";

type Button = { children?: React.ReactNode } & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const Button = ({
  children,
  className,
  ...props
}: {
  name?: string;
} & Button) => {
  return (
    <button className={`${button} ${className}`} {...props}>
      {children}
    </button>
  );
};

export const LinkButton = ({
  children,
  href,
  onClick,
  className,
  ...props
}: {
  onClick?: () => void;
  href: string;
} & Button) => {
  const [_location, setLocation] = useLocation();

  return (
    <button
      className={`${linkButton} ${className}`}
      onClick={() => {
        onClick && onClick();
        setLocation(href);
      }}
      {...props}
    >
      {children}
    </button>
  );
};
