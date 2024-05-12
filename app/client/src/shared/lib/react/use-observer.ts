import { RefObject, useEffect } from "react";

export const useObserver = (ref: RefObject<Element>, whenTargetIsIntersectingFn: () => unknown, dependencies: unknown[] = []) => (
    useEffect(() => {
      const observer = new IntersectionObserver((entries) => {
        const target = entries[0]
        if (target.isIntersecting) {
          whenTargetIsIntersectingFn()
        }
      });
  
      if (ref.current) {
        observer.observe(ref.current)
      }
  
      return () => {
        if (ref.current) {
          observer.unobserve(ref.current)
        }
      }
    }, dependencies)
)