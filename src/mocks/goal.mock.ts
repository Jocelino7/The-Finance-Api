import { GoalType } from "../model/dtos/dto";
import { generateObjectID } from "../utils/helpers";
const goalMocks: GoalType[] = [
  {
    _id: generateObjectID(),
    userId: generateObjectID(),
    name: "Fake Goal 1",
    description: "Description for Fake Goal 1",
    finalBalance: 300
  },
  {
    _id: generateObjectID(),
    userId: generateObjectID(),
    name: "Fake Goal 2",
    description: "Description for Fake Goal 2",
    finalBalance: 500
  },
  {
    _id: generateObjectID(),
    userId: generateObjectID(),
    name: "Fake Goal 3",
    description: "Description for Fake Goal 3",
    finalBalance: 1000
  },
  {
    _id: generateObjectID(),
    userId: generateObjectID(),
    name: "Fake Goal 4",
    description: "Description for Fake Goal 4",
    finalBalance: 800
  },
  {
    _id: generateObjectID(),
    userId: generateObjectID(),
    name: "Fake Goal 5",
    description: "Description for Fake Goal 5",
    finalBalance: 1200
  },
  {
    _id: generateObjectID(),
    userId: generateObjectID(),
    name: "Fake Goal 6",
    description: "Description for Fake Goal 6",
    finalBalance: 1500
  },
  {
    _id: generateObjectID(),
    userId: generateObjectID(),
    name: "Fake Goal 7",
    description: "Description for Fake Goal 7",
    finalBalance: 600
  },
  {
    _id: generateObjectID(),
    userId: generateObjectID(),
    name: "Fake Goal 8",
    description: "Description for Fake Goal 8",
    finalBalance: 900
  },
  {
    _id: generateObjectID(),
    userId: generateObjectID(),
    name: "Fake Goal 9",
    description: "Description for Fake Goal 9",
    finalBalance: 1100
  },
  {
    _id: generateObjectID(),
    userId: generateObjectID(),
    name: "Fake Goal 10",
    description: "Description for Fake Goal 10",
    finalBalance: 700
  },
  {
    _id: generateObjectID(),
    userId: generateObjectID(),
    name: "Fake Goal 11",
    description: "Description for Fake Goal 11",
    finalBalance: 400
  },
  {
    _id: generateObjectID(),
    userId: generateObjectID(),
    name: "Fake Goal 12",
    description: "Description for Fake Goal 12",
    finalBalance: 1300
  },
  {
    _id: generateObjectID(),
    userId: generateObjectID(),
    name: "Fake Goal 13",
    description: "Description for Fake Goal 13",
    finalBalance: 950
  },
 
];

export { goalMocks };
