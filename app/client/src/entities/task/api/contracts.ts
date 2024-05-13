import { Contract } from "@farfetched/core";
import { Task } from "shared/api";

export const tasksContract : Contract<unknown, Task[]> = {
    isData: (data): data is Task[] => true,
    getErrorMessages: () => ['error']
}
