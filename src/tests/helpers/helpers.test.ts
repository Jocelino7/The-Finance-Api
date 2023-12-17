import { calculateWeek, isInt } from "../../utils/helpers"

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

        expect(()=>{calculateWeek(32)}).toThrow("Invalid Argument day should not be greater than 31")
    })
    it("should throw an exception  when given 0 as argument", () => {

        expect(()=>{calculateWeek(0)}).toThrow("Invalid Argument day should not less than 1")
    })
})
describe("isInt test", () => {
    it("given 2 as argument it should return true", () => {
        const result = isInt(2)
        expect(result).toBeTruthy()

    })

})