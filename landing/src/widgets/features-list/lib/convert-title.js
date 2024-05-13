import { beginningToken } from "../config"
import { endingToken } from "../config"


export const convertTitle = (title) => {
    return title
        .replaceAll(beginningToken, "<span>")
        .replaceAll(endingToken, "</span>")
}