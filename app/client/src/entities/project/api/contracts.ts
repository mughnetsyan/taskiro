import { Contract } from "@farfetched/core";
import { Project } from "shared/api";

export const projectContract: Contract<unknown, Project> = {
    isData: (data): data is Project => true,
    getErrorMessages: () => ['error']
}

export const projectsContract: Contract<unknown, Project[]> = {
    isData: (data): data is Project[] => true,
    getErrorMessages: () => ['error']
}