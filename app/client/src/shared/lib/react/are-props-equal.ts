import { isValidElement } from "react";

type ArePropsEqualOptions = {
    except: string[]
}

export function arePropsEqual<T extends object>(options?: ArePropsEqualOptions) {
    return (prev: T, next: T) => {
        return Object.keys(prev).every((key) => {
            if(options) {
                if(options.except) {
                    if(options.except.includes(key)) return true
                }
            }
    
            const prevValue = prev[key as keyof T]
            const nextValue = next[key as keyof T]
    
            if (isValidElement(prevValue)) return true

            return prevValue === nextValue
        })
    }
}