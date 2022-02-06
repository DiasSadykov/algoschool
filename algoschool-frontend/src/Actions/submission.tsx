import { SubmissionStatus } from "../Reducers/submission";

export const SET_SUBMISSION_STATUS = "SET_SUBMISSION_STATUS";
export const SET_FETCHING_SUBMISSIONS = "SET_FETCHING_SUBMISSIONS";

export const setSubmissionStatus = (id: string, submissionStatus: SubmissionStatus) => ({
    type: SET_SUBMISSION_STATUS,
    payload: {
        id,
        submissionStatus
    }
});

export const setFetchingSubmission = (fetching: boolean) => ({
    type: SET_FETCHING_SUBMISSIONS,
    payload: {
        fetching
    }
});
