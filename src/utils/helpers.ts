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
    console.log(parseNum)
    return !parseNum.includes(".") && !parseNum.includes(",")
}