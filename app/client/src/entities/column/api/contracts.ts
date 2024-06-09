import { Contract } from "@farfetched/core";
import { Column } from "shared/api";

export const columnsContract: Contract<unknown, Column[]> = {
    isData: (data): data is Column[] => true,
    getErrorMessages: () => ['error']
}