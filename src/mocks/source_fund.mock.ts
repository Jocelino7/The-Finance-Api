import { SourceFundType } from "../model/dtos/dto";
import { generateObjectID } from "../utils/helpers";
import { userMocks } from "./user.mock";

const sourceFundMocks: SourceFundType[] = [
  {
    _id: generateObjectID(),
    user: userMocks[0],
    name: "BAI",
    icon: "source_fund_icon_1"
  },
  {
    _id: generateObjectID(),
    user: userMocks[1],
    name: "Vanguard",
    icon: "source_fund_icon_2"
  },
  {
    _id: generateObjectID(),
    user: userMocks[2],
    name: "Fidelity",
    icon: "source_fund_icon_3"
  },
  {
    _id: generateObjectID(),
    user: userMocks[3],
    name: "BlackRock",
    icon: "source_fund_icon_4"
  },
  {
    _id: generateObjectID(),
    user: userMocks[4],
    name: "Schwab",
    icon: "source_fund_icon_5"
  },
  {
    _id: generateObjectID(),
    user: userMocks[5],
    name: "JP Morgan",
    icon: "source_fund_icon_6"
  },
  {
    _id: generateObjectID(),
    user: userMocks[6],
    name: "State Street",
    icon: "source_fund_icon_7"
  },
  {
    _id: generateObjectID(),
    user: userMocks[7],
    name: "T. Rowe Price",
    icon: "source_fund_icon_8"
  },
  {
    _id: generateObjectID(),
    user: userMocks[8],
    name: "Capital Group",
    icon: "source_fund_icon_9"
  },
  {
    _id: generateObjectID(),
    user: userMocks[9],
    name: "Northern Trust",
    icon: "source_fund_icon_10"
  },
  {
    _id: generateObjectID(),
    user: userMocks[10],
    name: "Invesco",
    icon: "source_fund_icon_11"
  },
  {
    _id: generateObjectID(),
    user: userMocks[11],
    name: "Dodge & Cox",
    icon: "source_fund_icon_12"
  },
  {
    _id: generateObjectID(),
    user: userMocks[12],
    name: "Wellington Management",
    icon: "source_fund_icon_13"
  },
  {
    _id: generateObjectID(),
    user: userMocks[13],
    name: "American Funds",
    icon: "source_fund_icon_14"
  },
  {
    _id: generateObjectID(),
    user: userMocks[14],
    name: "PIMCO",
    icon: "source_fund_icon_15"
  },
  {
    _id: generateObjectID(),
    user: userMocks[15],
    name: "Eaton Vance",
    icon: "source_fund_icon_16"
  },
  {
    _id: generateObjectID(),
    user: userMocks[16],
    name: "Janus Henderson",
    icon: "source_fund_icon_17"
  },
  {
    _id: generateObjectID(),
    user: userMocks[17],
    name: "Franklin Templeton",
    icon: "source_fund_icon_18"
  },
  {
    _id: generateObjectID(),
    user: userMocks[18],
    name: "Goldman Sachs",
    icon: "source_fund_icon_19"
  },
  {
    _id: generateObjectID(),
    user: userMocks[19],
    name: "UBS",
    icon: "source_fund_icon_20"
  },
];

// Export the mock array for source funds
export { sourceFundMocks };
