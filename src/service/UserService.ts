import UserModel from "../Model/UserModel";
import { NewEntity } from "../interfaces";
import { ServiceResponse } from "../interfaces/ServiceResponse";
import { UserInterface, UserLogin } from "../interfaces/users/UserInterface";
import JWT from "../utils/jwt";

export default class UserService {
    constructor(private model = new UserModel()) {}

    async create(user:NewEntity<UserInterface>): Promise<ServiceResponse<{Token: string}>> {
        const userExists = await this.verifyUser(user.email);
        if (userExists) return {status: 'unauthorized', data: {message: 'Usuario já cadastrado'}};
        const newUser = await this.model.create(user);
        if (!newUser) return {status: 'internalServerError', data: {message: 'Erro ao criar usuário'}};
        const token = UserService.generateToken(newUser);
        return {status: 'created', data: {Token: token}};
    }

    async login(data: UserLogin): Promise<ServiceResponse<{Token: string}>> {
        const user = await this.model.findByEmail(data.email);
        if (!user) return {status: 'unauthorized', data: {message: 'Usuário não encontrado'}};
        const token = UserService.generateToken(user);
        return {status: 'ok', data: {Token: token}};
    }

    async verifyUser(email: string): Promise<string | boolean> {
        const user = await this.model.findByEmail(email);
        if (!user) return false;
        const token = UserService.generateToken(user);
        return token;
    }

    static generateToken(user: UserInterface): string {
        const token = JWT.sign({id: user.id, email: user.email, role: user.role});
        return token;
    }
}