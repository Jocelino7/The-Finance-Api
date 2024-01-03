import { userMocks } from "../../mocks/user.mock";
import { userModel } from "../../model/mongo_models/mongoose_model";
import { UserRepositoryImpl } from "../../model/repositories/user/user_repo";
import { encript } from "../../utils/encript";
import { DeleteResult } from "../test_helpers/test_helpers";

jest.mock("../../model/mongo_models/mongoose_model")
test("categoryRepositoryImplTest", async () => {
  
    userModel.find = jest.fn().mockResolvedValue(userMocks)
    userModel.findOne = jest.fn().mockResolvedValue(userMocks[0])
    userModel.deleteOne = jest.fn().mockResolvedValue(DeleteResult)
    userModel.deleteMany = jest.fn().mockResolvedValue(DeleteResult)
    userModel.updateOne = jest.fn()
    userModel.create = jest.fn()
    const userCredential = {
        email: "test@gmail.com",
        password: "test123"
    }
    const repoImpl = new UserRepositoryImpl(userModel)
    await repoImpl.createUser(userMocks[0])
    await repoImpl.authUser(userCredential)
    await repoImpl.updateUser(userMocks[0])
    const deleteResult = await repoImpl.deleteUser(userMocks[0]._id!)

    expect(userModel.findOne).toHaveBeenCalledWith({ ...userCredential, password: encript(userCredential.password) })
    expect(
        userModel.create
    ).toHaveBeenCalledWith({ ...userMocks[0], password: encript(userMocks[0].password) })
    expect(
        userModel.deleteOne
    ).toHaveBeenCalledWith(
        {
            _id: userMocks[0]._id
        }
    )
    expect(deleteResult).toBe(true)
    expect(userModel.updateOne).toHaveBeenCalledWith({
        email: userMocks[0].email
    }, {
        ...userMocks[0],
        password: encript(userMocks[0].password)
    })

})