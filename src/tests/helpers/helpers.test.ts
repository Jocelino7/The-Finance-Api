import { transactionMocks } from "../../mocks/transaction.mock"
import { Transaction, User } from "../../model/dtos/dto"
import { calculateWeek, generateReport, isInt } from "../../utils/helpers"

describe("calculate week test", () => {
    it("should return 2 when given 14 as argument", () => {
        const result = calculateWeek(14)
        expect(result).toBe(2)
    })
    it("should return 1 when given 7 as argument", () => {
        const result = calculateWeek(7)
        expect(result).toBe(1)
    })
    it("should return 3 when given 21 as argument", () => {
        const result = calculateWeek(21)
        expect(result).toBe(3)
    })
    it("should return 4 when given 22 as argument", () => {
        const result = calculateWeek(22)
        expect(result).toBe(4)
    })
    it("should throw an exception  when given 32 as argument", () => {

        expect(() => { calculateWeek(32) }).toThrow("Invalid Argument day should not be greater than 31")
    })
    it("should throw an exception  when given 0 as argument", () => {

        expect(() => { calculateWeek(0) }).toThrow("Invalid Argument day should not less than 1")
    })
})
describe("isInt test", () => {
    it("given 2 as argument it should return true", () => {
        const result = isInt(2)
        expect(result).toBeTruthy()

    })

})
describe("generateReport tes", () => {
    it("given 10 transactions as argument which all amount property is equal to 100 each should return 300 for all the weeks except week 4 which should return 100", () => {
        const report = generateReport(transactionMocks)
        const week1 = report.week1.transaction
        const week2 = report.week2.transaction
        const week3 = report.week3.transactions
        const week4 = report.week4.transactions
        const total = report.total
        const week1Total = report.week1.total
        const week2Total = report.week2.total
        const week3Total = report.week3.total
        const week4Total = report.week4.total
        expect(week1Total).toBe(300)
        expect(week2Total).toBe(300)
        expect(week3Total).toBe(300)
        expect(week4Total).toBe(100)
        expect(total).toBe(1000)
        expect(week1.length).toBe(3)
        expect(week2.length).toBe(3)
        expect(week3.length).toBe(3)
        expect(week4.length).toBe(1)
    })
})
