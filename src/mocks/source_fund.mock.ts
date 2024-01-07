import { SourceFundType } from "../model/dtos/dto";
import { generateObjectID } from "../utils/helpers";
import { userMocks } from "./user.mock";

const sourceFundMocks: SourceFundType[] = [
  {
    _id: generateObjectID(),
    userId: generateObjectID(),
    name: "BAI",
    code: "AOA",
    icon: "source_fund_icon_1"
  },
  {
    _id: generateObjectID(),
    userId: generateObjectID(),
    name: "Vanguard",
    code: "AOA",
    icon: "source_fund_icon_2"
  },
  {
    _id: generateObjectID(),
    userId: generateObjectID(),
    name: "Fidelity",
    code: "AOA",
    icon: "source_fund_icon_3"
  },
  {
    _id: generateObjectID(),
    userId: generateObjectID(),
    name: "BlackRock",
    code: "AOA",
    icon: "source_fund_icon_4"
  },
  {
    _id: generateObjectID(),
    userId: generateObjectID(),
    name: "Schwab",
    code: "AOA",
    icon: "source_fund_icon_5"
  },
  {
    _id: generateObjectID(),
    userId: generateObjectID(),
    name: "JP Morgan",
    code: "AOA",
    icon: "source_fund_icon_6"
  },
  {
    _id: generateObjectID(),
    userId: generateObjectID(),
    name: "State Street",
    code: "AOA",
    icon: "source_fund_icon_7"
  },
  {
    _id: generateObjectID(),
    userId: generateObjectID(),
    name: "T. Rowe Price",
    code: "AOA",
    icon: "source_fund_icon_8"
  },
  {
    _id: generateObjectID(),
    userId: generateObjectID(),
    name: "Capital Group",
    code: "AOA",
    icon: "source_fund_icon_9"
  },
  {
    _id: generateObjectID(),
    userId: generateObjectID(),
    name: "Northern Trust",
    code: "AOA",
    icon: "source_fund_icon_10"
  },
  {
    _id: generateObjectID(),
    userId: generateObjectID(),
    name: "Invesco",
    code: "AOA",
    icon: "source_fund_icon_11"
  },
  {
    _id: generateObjectID(),
    userId: generateObjectID(),
    name: "Dodge & Cox",
    code: "AOA",
    icon: "source_fund_icon_12"
  },
  {
    _id: generateObjectID(),
    userId: generateObjectID(),
    name: "Wellington Management",
    code: "AOA",
    icon: "source_fund_icon_13"
  },
  {
    _id: generateObjectID(),
    userId: generateObjectID(),
    name: "American Funds",
    code: "AOA",
    icon: "source_fund_icon_14"
  },
  {
    _id: generateObjectID(),
    userId: generateObjectID(),
    name: "PIMCO",
    code: "AOA",
    icon: "source_fund_icon_15"
  },
  {
    _id: generateObjectID(),
    userId: generateObjectID(),
    name: "Eaton Vance",
    code: "AOA",
    icon: "source_fund_icon_16"
  },
  {
    _id: generateObjectID(),
    userId: generateObjectID(),
    name: "Janus Henderson",
    code: "AOA",
    icon: "source_fund_icon_17"
  },
  {
    _id: generateObjectID(),
    userId: generateObjectID(),
    name: "Franklin Templeton",
    code: "AOA",
    icon: "source_fund_icon_18"
  },
  {
    _id: generateObjectID(),
    userId: generateObjectID(),
    name: "Goldman Sachs",
    code: "AOA",
    icon: "source_fund_icon_19"
  },
  {
    _id: generateObjectID(),
    userId: generateObjectID(),
    name: "UBS",
    code: "AOA",
    icon: "source_fund_icon_20"
  },
];

// Export the mock array for source funds
export { sourceFundMocks };
