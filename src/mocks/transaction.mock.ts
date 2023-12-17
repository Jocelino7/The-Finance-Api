// Assuming GoalType, SourceFundType, Transaction, TransactionDate, and User are imported from "../model/dtos/dto"
import { GoalType, SourceFundType, Transaction, TransactionDate, User } from "../model/dtos/dto";
// Assuming sourceFundMocks, transactionDateMocks, and userMocks are imported from their respective mock files
import { sourceFundMocks } from "./source_fund.mock";
import { transactionDateMocks } from "./transaction_date.mock";
import { userMocks } from "./user.mock";

const transactions: Transaction[] = [
  {
    _id: "transaction_id-1",
    user: userMocks[0],
    amount: 500,
    category: {
      _id: "fake_category_id-1",
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
    week: 1
  },
  {
    _id: "transaction_id-2",
    user: userMocks[1],
    amount: 600,
    category: {
      _id: "fake_category_id-2",
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
    week: 2
  },
  {
    _id: "transaction_id-3",
    user: userMocks[2],
    amount: 300,
    category: {
      _id: "fake_category_id-3",
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
    week: 3
  },
  {
    _id: "transaction_id-4",
    user: userMocks[3],
    amount: 800,
    category: {
      _id: "fake_category_id-4",
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
    week: 4
  },
  {
    _id: "transaction_id-5",
    user: userMocks[4],
    amount: 400,
    category: {
      _id: "fake_category_id-5",
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
    week: 5
  },
  {
    _id: "transaction_id-6",
    user: userMocks[5],
    amount: 700,
    category: {
      _id: "fake_category_id-6",
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
    week: 6
  },
  {
    _id: "transaction_id-7",
    user: userMocks[6],
    amount: 200,
    category: {
      _id: "fake_category_id-7",
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
    week: 7
  },
  {
    _id: "transaction_id-8",
    user: userMocks[7],
    amount: 900,
    category: {
      _id: "fake_category_id-8",
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
    week: 8
  },
  {
    _id: "transaction_id-9",
    user: userMocks[8],
    amount: 1100,
    category: {
      _id: "fake_category_id-9",
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
    week: 9
  },
  {
    _id: "transaction_id-10",
    user: userMocks[9],
    amount: 700,
    category: {
      _id: "fake_category_id-10",
      type: "incomes",
      name: "bonus",
      user: userMocks[9],
      icon: "category_icon",
      color: "indigo"
    },
    description: "User description for transaction 10",
    transactionDate: transactionDateMocks[9],
    transactionType: "incomes",
    sourceFund: sourceFundMocks[9],
    week: 10
  },
  {
    _id: "transaction_id-11",
    user: userMocks[10],
    amount: 400,
    category: {
      _id: "fake_category_id-11",
      type: "spends",
      name: "gadgets",
      user: userMocks[10],
      icon: "category_icon",
      color: "teal"
    },
    description: "User description for transaction 11",
    transactionDate: transactionDateMocks[10],
    transactionType: "spends",
    sourceFund: sourceFundMocks[10],
    week: 11
  },
  {
    _id: "transaction_id-12",
    user: userMocks[11],
    amount: 1300,
    category: {
      _id: "fake_category_id-12",
      type: "incomes",
      name: "consulting",
      user: userMocks[11],
      icon: "category_icon",
      color: "lime"
    },
    description: "User description for transaction 12",
    transactionDate: transactionDateMocks[11],
    transactionType: "incomes",
    sourceFund: sourceFundMocks[11],
    week: 12
  },
  {
    _id: "transaction_id-13",
    user: userMocks[12],
    amount: 950,
    category: {
      _id: "fake_category_id-13",
      type: "spends",
      name: "home improvement",
      user: userMocks[12],
      icon: "category_icon",
      color: "amber"
    },
    description: "User description for transaction 13",
    transactionDate: transactionDateMocks[12],
    transactionType: "spends",
    sourceFund: sourceFundMocks[12],
    week: 13
  },
  {
    _id: "transaction_id-14",
    user: userMocks[13],
    amount: 1800,
    category: {
      _id: "fake_category_id-14",
      type: "incomes",
      name: "stock dividends",
      user: userMocks[13],
      icon: "category_icon",
      color: "deep-purple"
    },
    description: "User description for transaction 14",
    transactionDate: transactionDateMocks[13],
    transactionType: "incomes",
    sourceFund: sourceFundMocks[13],
    week: 14
  },
  {
    _id: "transaction_id-15",
    user: userMocks[14],
    amount: 1600,
    category: {
      _id: "fake_category_id-15",
      type: "spends",
      name: "education",
      user: userMocks[14],
      icon: "category_icon",
      color: "cyan"
    },
    description: "User description for transaction 15",
    transactionDate: transactionDateMocks[14],
    transactionType: "spends",
    sourceFund: sourceFundMocks[14],
    week: 15
  },
  {
    _id: "transaction_id-16",
    user: userMocks[15],
    amount: 2000,
    category: {
      _id: "fake_category_id-16",
      type: "incomes",
      name: "real estate",
      user: userMocks[15],
      icon: "category_icon",
      color: "amber"
    },
    description: "User description for transaction 16",
    transactionDate: transactionDateMocks[15],
    transactionType: "incomes",
    sourceFund: sourceFundMocks[15],
    week: 16
  },
  {
    _id: "transaction_id-17",
    user: userMocks[16],
    amount: 1400,
    category: {
      _id: "fake_category_id-17",
      type: "spends",
      name: "car maintenance",
      user: userMocks[16],
      icon: "category_icon",
      color: "pink"
    },
    description: "User description for transaction 17",
    transactionDate: transactionDateMocks[16],
    transactionType: "spends",
    sourceFund: sourceFundMocks[16],
    week: 17
  },
  {
    _id: "transaction_id-18",
    user: userMocks[17],
    amount: 1700,
    category: {
      _id: "fake_category_id-18",
      type: "incomes",
      name: "dividends",
      user: userMocks[17],
      icon: "category_icon",
      color: "brown"
    },
    description: "User description for transaction 18",
    transactionDate: transactionDateMocks[17],
    transactionType: "incomes",
    sourceFund: sourceFundMocks[17],
    week: 18
  },
  {
    _id: "transaction_id-19",
    user: userMocks[18],
    amount: 2200,
    category: {
      _id: "fake_category_id-19",
      type: "spends",
      name: "vacation",
      user: userMocks[18],
      icon: "category_icon",
      color: "blue"
    },
    description: "User description for transaction 19",
    transactionDate: transactionDateMocks[18],
    transactionType: "spends",
    sourceFund: sourceFundMocks[18],
    week: 19
  },
  {
    _id: "transaction_id-20",
    user: userMocks[19],
    amount: 1900,
    category: {
      _id: "fake_category_id-20",
      type: "incomes",
      name: "bonus",
      user: userMocks[19],
      icon: "category_icon",
      color: "purple"
    },
    description: "User description for transaction 20",
    transactionDate: transactionDateMocks[19],
    transactionType: "incomes",
    sourceFund: sourceFundMocks[19],
    week: 20
  },
];

export { transactions };
