import { SET_FETCHING_SUBMISSIONS, SET_SUBMISSION_STATUS } from "../Actions/submission";

export type SubmissionStatuses = "Accepted" | "Runtime Error" | "Timeout" | "Wrong Answer"

export interface SubmissionStatus {
    status: SubmissionStatuses
    message?: string
    expected?: any
    input?: any
    result?: any
}

export interface Submissions {
    [key: string]: SubmissionStatus;
}

export interface SubmissionsState {
    submissions: Submissions;
    fetching: boolean;
}


const initialState: SubmissionsState = {
    submissions: {},
    fetching: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_SUBMISSION_STATUS: {
            return {
                ...state,
                submissions: {
                    ...state.submissions,
                    [action.payload.id]: { ...action.payload.submissionStatus }
                }
            };
        }
        case SET_FETCHING_SUBMISSIONS: {
            return {
                ...state,
                fetching: action.payload.fetching
            };
        }
        default:
            return state;
    }
}