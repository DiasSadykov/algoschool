import { RootState } from "../Reducers";

export const getCurrentSubmissionStatus = (id: string) => (state: RootState) => state.submission.submissions[id]

export const getIsSubmissionFetching = (state: RootState) => state.submission.fetching