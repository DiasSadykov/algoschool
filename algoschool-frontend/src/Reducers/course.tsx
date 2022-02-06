import { SET_PROBLEMS } from "../Actions/course";
import { SET_CODE_FOR_PROBLEM } from "../Actions/course"

export type BlockItemBase = {
    itemType: string,
    itemTitle: string,
    itemId: string,
}

export type Article = BlockItemBase & {
    readingTime?: string,
    html?: string
}

export type Problem = BlockItemBase & {
    description?: string,
    codeSnippet?: string
}

export type BlockItem = Article & Problem

export type courseBlock = {
    blockTitle: string,
    blockItems: BlockItem[]
}

export type ProblemsByIds = {
    [key: string]: BlockItem;
}

export type ProblemsState = {
    courseBlocks: courseBlock[],
    problemsByIds: ProblemsByIds,
    fetching: boolean
}

const initialState: ProblemsState = {
    courseBlocks: [],
    problemsByIds: {},
    fetching: true,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_PROBLEMS: {
            let problemsByIds: ProblemsByIds = {}
            action.payload.problems.forEach(problemSet => {
                problemSet.blockItems.forEach(problem => {
                    problemsByIds[problem.itemId] = problem
                });
            });
            return {
                ...state,
                fetching: false,
                courseBlocks: action.payload.problems,
                problemsByIds: problemsByIds
            }
        }
        case SET_CODE_FOR_PROBLEM: {
            return {
                ...state,
                problemsByIds:{
                    ...state.problemsByIds,
                    [action.payload.id]: {
                        ...state.problemsByIds[action.payload.id],
                        codeSnippet: action.payload.code
                    }
                }
            };
        }
        default:
            return state;
    }
}