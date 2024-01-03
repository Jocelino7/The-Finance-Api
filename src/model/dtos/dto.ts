export type Transaction = {
    _id?: string | undefined | null,
    user: User,
    transactionDate: TransactionDate,
    transactionType: string,
    sourceFund: SourceFundType,
    category: CategoryType,
    amount: number,
    goal?:GoalType | undefined | null,
    description?: string | null,
    createdAt?: Date | null | undefined,
    updatedAt?: Date | null | undefined
}
export type SourceFundType = {
    _id?: string | undefined | null,
    user: User,
    name: string,
    icon: string,
    createdAt?: Date,
    updatedAt?: Date,
    goal?: GoalType | undefined | null
}
export type CategoryType = {
    _id?: string | undefined | null,
    type: string,
    user: User,
    name: string,
    icon: string,
    color: string
}
export type GoalType = {
    _id?: string | undefined | null,
    user: User,
    name: string,
    description: string,
    finalBalance: number,
    createdAt?: Date,
    updatedAt?: Date,
}
export type User = {
    _id?: string | undefined,
    email: string,
    firstName: string,
    lastName: string,
    photoUrl?: string | null | undefined,
    isEmailVerified?:boolean | null | undefined,
    password: string
}
export type UserCredential = {
    email: string,
    password: string,
}
export type UserType = {
    firstName: string,
    lastName: string,
    email: string,
    photoUrl: string
}
export type TransactionDate = {
    month: number,
    day: number,
    year: number
}
export type DateType = {
    day: number,
    month: number,
    year: number
}
export type DateProvider = {
    currentDay: number,
    currentMonth: number,
    currentYear: number
}
export type ReportType = {
    month: number,
    week1: {
        transaction: Transaction[],
        total: number
    },
    week2: {
        transaction: Transaction[],
        total: number
    },
    week3: {
        transactions: Transaction[],
        total: number
    },
    week4: {
        transactions: Transaction[],
        total: number
    }
    total: number
}
