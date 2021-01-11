export class User {
    email: string;
    password: string;

    constructor({ email, password }: User) {
        this.email = email;
        this.password = password;
    }
}