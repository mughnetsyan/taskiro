import { type Contract } from "@farfetched/core"

import { type Session } from "shared/api/types"

// TODO: implement a real contract
export const sessionContract: Contract<unknown, Session> = {
    isData: (data): data is Session => true,
    getErrorMessages: () => ['error']
}

export const undefinedContract: Contract<unknown, undefined> = {
    isData: (data): data is undefined => true,
    getErrorMessages: () => ['error']
}