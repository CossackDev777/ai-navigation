import { cn } from "@/utilities/cn";
import React, { ReactNode } from 'react'
import './Title.scss'

type TitleProps = {
  children: ReactNode;
  subtitle?: string | null | undefined;
  caption?: string | null | undefined;
  className?: string;
  position?: "center" | "left" | "right";
}

export const Title: React.FC<TitleProps> = ({
  children,
  subtitle,
  caption,
  className,
  position
}) => {
  return (
    <div className={cn("block__section_title sec_titles", position, className)}>
      {caption && <p className="sec_caption">{caption}</p>}
      {children}
      {subtitle && <p className="sec_subtitle">{subtitle}</p>}
    </div>
  );
}
