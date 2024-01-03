import { Transaction } from "../model/dtos/dto";
import { generateObjectID } from "../utils/helpers";
import { sourceFundMocks } from "./source_fund.mock";
import { transactionDateMocks } from "./transaction_date.mock";
import { userMocks } from "./user.mock";

export const transactionMocks: Transaction[] = [
  {
    _id: generateObjectID(),
    user: userMocks[0],
    amount: 100,
    category: {
      _id: generateObjectID(),
      type: "spends",
      name: "drinks",
      user: userMocks[0],
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
    user: userMocks[1],
    amount: 100,
    category: {
      _id: generateObjectID(),
      type: "incomes",
      name: "business",
      user: userMocks[1],
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
    user: userMocks[2],
    amount: 100,
    category: {
      _id: generateObjectID(),
      type: "spends",
      name: "food",
      user: userMocks[2],
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
    user: userMocks[3],
    amount: 100,
    category: {
      _id: generateObjectID(),
      type: "incomes",
      name: "salary",
      user: userMocks[3],
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
    user: userMocks[4],
    amount: 100,
    category: {
      _id: generateObjectID(),
      type: "spends",
      name: "shopping",
      user: userMocks[4],
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
    user: userMocks[5],
    amount: 100,
    category: {
      _id: generateObjectID(),
      type: "incomes",
      name: "freelance",
      user: userMocks[5],
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
    user: userMocks[6],
    amount: 100,
    category: {
      _id: generateObjectID(),
      type: "spends",
      name: "entertainment",
      user: userMocks[6],
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
    user: userMocks[7],
    amount: 100,
    category: {
      _id: generateObjectID(),
      type: "incomes",
      name: "investment",
      user: userMocks[7],
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
    user: userMocks[8],
    amount: 100,
    category: {
      _id: generateObjectID(),
      type: "spends",
      name: "travel",
      user: userMocks[8],
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
    user: userMocks[9],
    amount: 100,
    category: {
      _id: generateObjectID(),
      type: "incomes",
      name: "bonus",
      user: userMocks[9],
      icon: "category_icon",
      color: "indigo"
    },
    description: "User description for transaction 100",
    transactionDate: transactionDateMocks[9],
    transactionType: "incomes",
    sourceFund: sourceFundMocks[9]
  },
];

