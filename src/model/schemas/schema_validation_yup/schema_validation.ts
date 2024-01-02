import *  as yup from "yup"
import { CategoryType, GoalType, SourceFundType, Transaction, TransactionDate, User } from "../../dtos/dto"
 const userYupSchema = new yup.ObjectSchema<User>({
    _id: yup.string().optional(),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required().min(6).max(32),
    isEmailVerified:yup.boolean().optional().default(false),
    photoUrl: yup.string().optional().default(undefined)
})
 const goalYupSchema = new yup.ObjectSchema<GoalType>({
    _id: yup.string().optional().default(undefined),
    user: userYupSchema,
    name: yup.string().required(),
    description: yup.string().required(),
    finalBalance: yup.number().required(),
    createdAt: yup.date().optional(),
    updatedAt: yup.date().optional()
})
 const sourceFundYupSchema = new yup.ObjectSchema<SourceFundType>({
    _id: yup.string().optional().default(undefined),
    user: userYupSchema,
    name: yup.string().required(),
    icon: yup.string().required(),
    createdAt: yup.date().optional(),
    updatedAt: yup.date().optional(),
    goal:goalYupSchema.optional().default(undefined)
})
 const transactionDateYupSchema = new yup.ObjectSchema<TransactionDate>({
    month:yup.number().required(),
    year:yup.number().required(),
    day:yup.number().required()

})
 const categoryYupSchema = new yup.ObjectSchema<CategoryType>({
    _id: yup.string().optional().default(undefined),
    type: yup.string().required(),
    user: userYupSchema,
    name: yup.string().required(),
    icon: yup.string().required(),
    color: yup.string().required(),

})
const transactionYupSchema = new yup.ObjectSchema<Transaction>({
    _id: yup.string().optional().default(undefined),
    user: userYupSchema,
    transactionDate: transactionDateYupSchema,
    transactionType: yup.string().required(),
    sourceFund: sourceFundYupSchema,
    category: categoryYupSchema,
    amount: yup.number().required(),
    description: yup.string().optional(),
    createdAt: yup.date().notRequired(),
    updatedAt: yup.date().notRequired(),
    goal:goalYupSchema.optional().default(undefined)
})
export {userYupSchema,transactionYupSchema,goalYupSchema,sourceFundYupSchema,categoryYupSchema}