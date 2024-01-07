import { transactionMocks } from "../../mocks/transaction.mock";
import { transactionModel } from "../../model/mongo_models/mongoose_model";
import { TransactionRepositoryImpl } from "../../model/repositories/transaction/transaction_repo";
import { regexp } from "../../utils/helpers";
import { DeleteResult } from "../test_helpers/test_helpers";


jest.mock("../../model/mongo_models/mongoose_model")
test("categoryRepositoryImplTest", async () => {
   
    transactionModel.find = jest.fn().mockResolvedValue(transactionMocks)
    transactionModel.findOne = jest.fn().mockResolvedValue(transactionMocks[0])
    transactionModel.deleteOne = jest.fn().mockResolvedValue(DeleteResult)
    transactionModel.deleteMany = jest.fn().mockResolvedValue(DeleteResult)
    transactionModel.updateOne = jest.fn()
    transactionModel.create = jest.fn()
    const repoImpl = new TransactionRepositoryImpl(transactionModel)
    await repoImpl.addTransaction(transactionMocks[0])
    await repoImpl.deleteTransactionInBatch(transactionMocks)
    await repoImpl.updateTransaction(transactionMocks[0])
    await repoImpl.getTransactions(transactionMocks[0].userId!)
    await repoImpl.getTransaction(transactionMocks[0]._id!)
    await repoImpl.search("test", transactionMocks[0].userId!)
    const deleteResult = await repoImpl.deleteTransaction(transactionMocks[0]._id!)

    expect(transactionModel.find).toHaveBeenCalledWith({
        "userId": transactionMocks[0].userId
    })
    expect(transactionModel.find).toHaveBeenCalledWith(
        {
            "userId": transactionMocks[0].userId, $or: [{ "sourceFund.name": { "$regex":regexp("test") } }, { "description": { "$regex":regexp("test") }  }, { "category.name": { "$regex":regexp("test") } }]
        })
    expect(transactionModel.findOne).toHaveBeenCalledWith({
        "_id": transactionMocks[0]._id
    })
    expect(
        transactionModel.create
    ).toHaveBeenCalledWith(transactionMocks[0])
    expect(
        transactionModel.deleteOne
    ).toHaveBeenCalledWith(
        {
            _id: transactionMocks[0]._id
        }
    )
    expect(transactionModel.deleteOne).toHaveBeenCalledWith({
        _id: transactionMocks[transactionMocks.length - 1]._id
    })
    expect(deleteResult).toBe(true)
    expect(transactionModel.updateOne).toHaveBeenCalledWith({
        _id: transactionMocks[0]._id,

    }, transactionMocks[0])





})