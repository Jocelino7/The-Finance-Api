export type Transaction = {
    _id:string,
    user:User,
    transactionDate:TransactionDate,
    transactionType:string,
    sourceFund:SourceFundType,
    category:CategoryType,
    amount:number,
    week:number,
    description?:string | null,
    createdAt:Date,
    updatedAt?:Date
}
export type SourceFundType ={
    _id:string,
    user:User,
    name:string,
    icon:string,
    createdAt?:Date,
    updatedAt?:Date,
    goal?:GoalType
}
export type CategoryType = {
    _id:string,
    type:string,
    user:User,
    name:string,
    icon:string,
    color:string
}
export type GoalType = {
    _id:string,
    user:User,
    name:string,
    description:string,
    finalBalance:number,
    createdAt?:Date,
    updatedAt?:Date,
}
export type User = {
    _id?:string,
    email:string,
    firstName:string,
    lastName:string,
    photoUrl?:string|null,
    password:string
}
export type UserCredential={
    email:string,
    password:string,
}
export type UserType = {
    firstName:string,
    lastName:string,
    email:string,
    photoUrl:string
}
export type TransactionDate ={
    month:number,
    day:number,
    year:number
}
export type DateType = {
    day:number,
    month:number,
    year:number
}
export type DateProvider = {
    currentDay:number,
    currentMonth:number,
    currentYear:number
}