import { Contract } from "@farfetched/core";

export const undefinedContract: Contract<unknown, undefined> = {
    isData: (data): data is undefined => true,
    getErrorMessages: () => ['error']
}