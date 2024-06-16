import { isValidElement } from "react";

export function arePropsEqual<T extends object>(prev: T, next: T) {
    return Object.keys(prev).every((key) => {
        const prevValue = prev[key as keyof T]
        const nextValue = next[key as keyof T]

        if (isValidElement(prevValue)) return true

        return prevValue === nextValue
    })
}