import { useRef } from "react";
import type { ReactNode } from "react";

import { useDragScroll } from "../hooks/useDragScroll";

type Props = {
  children: ReactNode;
};

export default function HorizontalScroll({
  children,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useDragScroll(ref);

  return (
    <div
      ref={ref}
      className="horizontal-scroll"
    >
      {children}
    </div>
  );
}