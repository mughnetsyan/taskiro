import { User } from "modules/user";

export type Session = Pick<User,
    'login'
>
    