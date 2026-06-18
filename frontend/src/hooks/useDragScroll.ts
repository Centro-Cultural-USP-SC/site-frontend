import { useEffect } from "react";
import type { RefObject } from "react";

export function useDragScroll(
  ref: RefObject<HTMLElement | null>
) {
  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current!;

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    function onMouseDown(e: MouseEvent) {
      isDown = true;

      startX = e.pageX - element.offsetLeft;
      scrollLeft = element.scrollLeft;
    }

    function onMouseLeave() {
      isDown = false;
    }

    function onMouseUp() {
      isDown = false;
    }

    function onMouseMove(e: MouseEvent) {
      if (!isDown) return;

      e.preventDefault();

      const x = e.pageX - element.offsetLeft;
      const walk = (x - startX) * 1.5;

      element.scrollLeft = scrollLeft - walk;
    }

    element.addEventListener("mousedown", onMouseDown);
    element.addEventListener("mouseleave", onMouseLeave);
    element.addEventListener("mouseup", onMouseUp);
    element.addEventListener("mousemove", onMouseMove);

    return () => {
      element.removeEventListener("mousedown", onMouseDown);
      element.removeEventListener("mouseleave", onMouseLeave);
      element.removeEventListener("mouseup", onMouseUp);
      element.removeEventListener("mousemove", onMouseMove);
    };
  }, [ref]);
}