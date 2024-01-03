import { CategoryType } from "../model/dtos/dto";
import { generateObjectID } from "../utils/helpers";
import { userMocks } from "./user.mock";

export const categorymocks: CategoryType[] = [
    {
        _id: generateObjectID(),
        type: "income",
        name: "fake-category",
        user: userMocks[0],
        icon: "category_icon",
        color: "red"
    },
    {
        _id: generateObjectID(),
        type: "income",
        name: "fake-category-2",
        user: userMocks[1],
        icon: "category_icon",
        color: "red"
    },
    {
        _id: generateObjectID(),
        type: "income",
        name: "fake-category-3",
        user: userMocks[2],
        icon: "category_icon",
        color: "red"
    },
    {
        _id: generateObjectID(),
        type: "income",
        name: "fake-category-4",
        user: userMocks[3],
        icon: "category_icon",
        color: "red"
    },
    {
        _id: generateObjectID(),
        type: "income",
        name: "fake-category-5",
        user: userMocks[4],
        icon: "category_icon",
        color: "red"
    },
    {
        _id: generateObjectID(),
        type: "income",
        name: "fake-category-6",
        user: userMocks[5],
        icon: "category_icon",
        color: "red"
    },
    {
        _id: generateObjectID(),
        type: "income",
        name: "fake-category-7",
        user: userMocks[6],
        icon: "category_icon",
        color: "red"
    },
    {
        _id: generateObjectID(),
        type: "income",
        name: "fake-category-8",
        user: userMocks[7],
        icon: "category_icon",
        color: "red"
    },
    {
        _id: generateObjectID(),
        type: "income",
        name: "fake-category-9",
        user: userMocks[8],
        icon: "category_icon",
        color: "red"
    },
    {
        _id: generateObjectID(),
        type: "income",
        name: "fake-category-10",
        user: userMocks[9],
        icon: "category_icon",
        color: "red"
    },
    {
        _id: generateObjectID(),
        type: "income",
        name: "fake-category-11",
        user: userMocks[10],
        icon: "category_icon",
        color: "red"
    }
]