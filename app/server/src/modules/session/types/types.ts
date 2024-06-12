import { User } from "modules/user/user.model";

export type Session = Pick<User,
    'login'
>
    