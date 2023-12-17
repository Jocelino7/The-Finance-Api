import { Model } from "mongoose"
import { User, UserCredential, UserType } from "../../dtos/dto"
import { userModel } from "../../mongo_models/mongoose_model"
import { encript } from "../../../utils/encript"


export interface UserRepository {
    getUser(): Promise<User>
    deleteUser(id: string): Promise<boolean>
    updateUser(user:User): Promise<boolean>
    sendEmailVerification(): Promise<void>
    isEmailVerified(): Promise<true>
    reload(): Promise<void>
    createUser(user: User): Promise<boolean>
    authUser(credential: UserCredential): Promise<boolean>
}

export class UserRepositoryImpl implements UserRepository {
    model: Model<User>
    constructor(model: Model<User>) {
        this.model = model
    }
    getUser(): Promise<User> {
        throw new Error("Method not implemented.");
    }
    async deleteUser(id: string): Promise<boolean> {
        try {
            await userModel.deleteOne({_id:id})
            return true
        } catch (e) {
            console.log(e)
            return false
        }
    }
    async updateUser(user:User): Promise<boolean> {
        try{
            await userModel.updateOne({email:user.email},{...user,password:encript(user.password)})
            return true
        }
        catch(e){
            console.error(e)
            return false
        }
    }
    sendEmailVerification(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    isEmailVerified(): Promise<true> {
        throw new Error("Method not implemented.");
    }
    reload(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async createUser(user: User): Promise<boolean> {
        try {
            await this.model.create(user)
            return true

        } catch (e) {
            console.error(e)
            return false
        }

    }
    async authUser(credential: UserCredential): Promise<boolean> {
        try {
            const user = await this.model.findOne({ email: credential, password: encript(credential.password) })
            return user != null

        } catch (e) {
            console.error(e)
            return false
        }
    }

}