import *  as yup from "yup"
import { CategoryType, DefaultCurrency, GoalType, SourceFundType, Transaction, TransactionDate, User } from "../../dtos/dto"
const userYupSchema = new yup.ObjectSchema<User>({
    _id: yup.string().optional(),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required("Email is Required"),
    password: yup.string().required().min(6).max(32),
    isEmailVerified: yup.boolean().optional().default(undefined),
    photoUrl: yup.string().optional().default(undefined)
})
const goalYupSchema = new yup.ObjectSchema<GoalType>({
    _id: yup.string().optional().default(undefined),
    userId: yup.string().required("User id is required"),
    name: yup.string().required(),
    description: yup.string().required(),
    finalBalance: yup.number().required(),
    createdAt: yup.date().optional(),
    updatedAt: yup.date().optional()
})
const sourceFundYupSchema = new yup.ObjectSchema<SourceFundType>({
    _id: yup.string().optional().default(undefined),
    userId: yup.string().required("User id is required"),
    name: yup.string().required(),
    icon: yup.string().required(),
    createdAt: yup.date().optional(),
    updatedAt: yup.date().optional(),
    goal: goalYupSchema.optional().default(undefined),
    code: yup.string().required()
})
const transactionDateYupSchema = new yup.ObjectSchema<TransactionDate>({
    month: yup.number().required(),
    year: yup.number().required(),
    day: yup.number().required(),
    hour: yup.number().required(),
    minutes: yup.number().required()

})
const categoryYupSchema = new yup.ObjectSchema<CategoryType>({
    _id: yup.string().optional().default(undefined),
    type: yup.string().required(),
    userId: yup.string().required("User id is required"),
    name: yup.string().required(),
    icon: yup.string().required(),
    color: yup.string().optional().default(undefined),
})
const transactionYupSchema = new yup.ObjectSchema<Transaction>({
    _id: yup.string().optional().default(undefined),
    userId: yup.string().required("User id is required"),
    transactionDate: transactionDateYupSchema,
    transactionType: yup.string().required(),
    sourceFund: sourceFundYupSchema,
    category: categoryYupSchema,
    amount: yup.number().required(),
    description: yup.string().optional(),
    createdAt: yup.date().notRequired(),
    updatedAt: yup.date().notRequired(),
    goal: goalYupSchema.optional().default(undefined)
})
export const currencyYupSchema = new yup.ObjectSchema<DefaultCurrency>(
    {
        userId: yup.string().optional().default(undefined),
        name: yup.string().required(),
        symbol: yup.string().required(),
        code: yup.string().required()
    })
export { userYupSchema, transactionYupSchema, goalYupSchema, sourceFundYupSchema, categoryYupSchema }