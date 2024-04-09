import { createEvent, fork, allSettled } from "effector";

export const appStarted = createEvent();
    
const scope = fork();

await allSettled(appStarted, { scope });