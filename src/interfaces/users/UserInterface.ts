export interface UserInterface {
    id: number;
    username: string;
    role: string;
    email: string;
    password: string;
}

export interface UserLogin {
    email: string;
    password: string;
}