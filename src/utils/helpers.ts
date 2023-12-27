import mongoose from "mongoose"
import { ReportType, Transaction, User, UserCredential } from "../model/dtos/dto"
import jsonwebtoken from "jsonwebtoken"

export function calculateWeek(day: number) {
    if (!isInt(day))
        throw new Error("day argument should be integer")
    if (day > 31)
        throw new Error("Invalid Argument day should not be greater than 31")
    if (day <= 0)
        throw new Error("Invalid Argument day should not less than 1")


    if (day >= 1 && day <= 7)
        return 1
    if (day >= 8 && day <= 14)
        return 2
    if (day >= 15 && day <= 21)
        return 3
    else return 4
}
export function isInt(num: number) {
    const parseNum = num.toString()
    return !parseNum.includes(".") && !parseNum.includes(",")
}
export function generateReport(transaction: Transaction[]): ReportType {
    const week1: Transaction[] = []
    const week2: Transaction[] = []
    const week3: Transaction[] = []
    const week4: Transaction[] = []
    let totalWeek1: number = 0
    let totalWeek2: number = 0
    let totalWeek3: number = 0
    let totalWeek4: number = 0
    let total: number = 0
    transaction.forEach((transaction) => {
        switch (calculateWeek(transaction.transactionDate.day)) {
            case 1: {
                week1.push(transaction)
                totalWeek1 += transaction.amount
                break
            }
            case 2: {
                week2.push(transaction)
                totalWeek2 += transaction.amount
                break
            }
            case 3: {
                week3.push(transaction)
                totalWeek3 += transaction.amount
                break
            }
            case 4: {
                week4.push(transaction)
                totalWeek4 += transaction.amount
                break
            }
        }
    })
    total = totalWeek1 + totalWeek2 + totalWeek3 + totalWeek4
    return {
        month: transaction[0].transactionDate.month,
        week1: {
            transaction: week1,
            total: totalWeek1
        },
        week2: {
            transaction: week2,
            total: totalWeek2
        },
        week3: {
            transactions: week3,
            total: totalWeek3
        },
        week4: {
            transactions: week4,
            total: totalWeek4
        },
        total
    }
}


export function generateToken(payload: UserCredential,) {
    const  secretAcessToken = process.env.ACESS_TOKEN_SECRET! 
    const jwt = jsonwebtoken
    return jwt.sign(payload, secretAcessToken, { expiresIn: "15m" })
}
export function  generateteRefreshToken(payload: UserCredential) {
    const  secretRefreshToken = process.env.REFRESH_TOKKEN_SECRET!
    const jwt = jsonwebtoken
    const monthInSeconds = 30 * 24 * 60 * 60
    const month = Math.floor(Date.now() / 1000) + monthInSeconds
    return jwt.sign(payload,secretRefreshToken, { expiresIn: month })
}
export function generateFakeToken():string{
    return generateToken({
        email:"test@gmail.com",
        password:"test123"
    })
}
export function generateObjectID():string{
    return new mongoose.Types.ObjectId().toString()
}