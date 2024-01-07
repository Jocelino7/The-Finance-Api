import { Transaction } from "../model/dtos/dto";
import { generateObjectID } from "../utils/helpers";
import { sourceFundMocks } from "./source_fund.mock";
import { transactionDateMocks } from "./transaction_date.mock";
import { userMocks } from "./user.mock";

export const transactionMocks: Transaction[] = [
  {
    _id: generateObjectID(),
    userId: generateObjectID(),
    amount: 100,
    category: {
      _id: generateObjectID(),
      type: "spends",
      name: "drinks",
      userId: generateObjectID(),
      icon: "category_icon",
      color: "red"
    },
    description: "User description for transaction 1",
    transactionDate: transactionDateMocks[0],
    transactionType: "spends",
    sourceFund: sourceFundMocks[0],
  },
  {
    _id: generateObjectID(),
    userId: generateObjectID(),
    amount: 100,
    category: {
      _id: generateObjectID(),
      type: "incomes",
      name: "business",
      userId: generateObjectID(),
      icon: "category_icon",
      color: "blue"
    },
    description: "User description for transaction 2",
    transactionDate: transactionDateMocks[1],
    transactionType: "incomes",
    sourceFund: sourceFundMocks[1],
  },
  {
    _id: generateObjectID(),
    userId: generateObjectID(),
    amount: 100,
    category: {
      _id: generateObjectID(),
      type: "spends",
      name: "food",
      userId: generateObjectID(),
      icon: "category_icon",
      color: "green"
    },
    description: "User description for transaction 3",
    transactionDate: transactionDateMocks[2],
    transactionType: "spends",
    sourceFund: sourceFundMocks[2],
  },
  {
    _id:generateObjectID(),
    userId: generateObjectID(),
    amount: 100,
    category: {
      _id: generateObjectID(),
      type: "incomes",
      name: "salary",
      userId: generateObjectID(),
      icon: "category_icon",
      color: "purple"
    },
    description: "User description for transaction 4",
    transactionDate: transactionDateMocks[3],
    transactionType: "incomes",
    sourceFund: sourceFundMocks[3],
  },
  {
    _id: generateObjectID(),
    userId: generateObjectID(),
    amount: 100,
    category: {
      _id: generateObjectID(),
      type: "spends",
      name: "shopping",
      userId: generateObjectID(),
      icon: "category_icon",
      color: "orange"
    },
    description: "User description for transaction 5",
    transactionDate: transactionDateMocks[4],
    transactionType: "spends",
    sourceFund: sourceFundMocks[4],
  },
  {
    _id: generateObjectID(),
    userId: generateObjectID(),
    amount: 100,
    category: {
      _id: generateObjectID(),
      type: "incomes",
      name: "freelance",
      userId: generateObjectID(),
      icon: "category_icon",
      color: "yellow"
    },
    description: "User description for transaction 6",
    transactionDate: transactionDateMocks[5],
    transactionType: "incomes",
    sourceFund: sourceFundMocks[5],
  },
  {
    _id: generateObjectID(),
    userId: generateObjectID(),
    amount: 100,
    category: {
      _id: generateObjectID(),
      type: "spends",
      name: "entertainment",
      userId: generateObjectID(),
      icon: "category_icon",
      color: "pink"
    },
    description: "User description for transaction 7",
    transactionDate: transactionDateMocks[6],
    transactionType: "spends",
    sourceFund: sourceFundMocks[6],
  },
  {
    _id: generateObjectID(),
    userId: generateObjectID(),
    amount: 100,
    category: {
      _id: generateObjectID(),
      type: "incomes",
      name: "investment",
      userId: generateObjectID(),
      icon: "category_icon",
      color: "brown"
    },
    description: "User description for transaction 8",
    transactionDate: transactionDateMocks[7],
    transactionType: "incomes",
    sourceFund: sourceFundMocks[7],
  },
  {
    _id: generateObjectID(),
    userId: generateObjectID(),
    amount: 100,
    category: {
      _id: generateObjectID(),
      type: "spends",
      name: "travel",
      userId: generateObjectID(),
      icon: "category_icon",
      color: "cyan"
    },
    description: "User description for transaction 9",
    transactionDate: transactionDateMocks[8],
    transactionType: "spends",
    sourceFund: sourceFundMocks[8],
  },
  {
    _id: generateObjectID(),
    userId: generateObjectID(),
    amount: 100,
    category: {
      _id: generateObjectID(),
      type: "incomes",
      name: "bonus",
      userId: generateObjectID(),
      icon: "category_icon",
      color: "indigo"
    },
    description: "User description for transaction 100",
    transactionDate: transactionDateMocks[9],
    transactionType: "incomes",
    sourceFund: sourceFundMocks[9]
  },
];

