import { courseBlock } from "../Reducers/course";
import axios from 'axios'
import { setFetchingSubmission, setSubmissionStatus } from './submission';
import { SubmissionStatus } from "../Reducers/submission";
import { setProblemAccepted } from "../_api/firebase";
import { getCourse } from "../_api/backend"
export const SET_PROBLEMS = "SET_PROBLEMS";
export const SET_CODE_FOR_PROBLEM = "SET_CODE_FOR_PROBLEM";

export const setProblems = (problems: courseBlock[]) => ({
    type: SET_PROBLEMS,
    payload: {
        problems
    }
});

export const setCodeForProblem = (id, code) => ({
  type: SET_CODE_FOR_PROBLEM,
  payload: {
      id,
      code
  }
});

export async function fetchCourse(dispatch, getState) {
    getCourse()
      .then(function (response) {
        dispatch(setProblems(response.data.courseBlocks))
      })
      .catch(function (error) {
        console.log(error);
      });
}


export const submitCode = id => async (dispatch, getState) => {
      dispatch(setFetchingSubmission(true))
      const state = getState()
      const currentProblem = state.problems.problemsByIds[id]
      const codeForCurrentProblem = currentProblem.codeSnippet
      await axios.post('https://3b613vdnu5.execute-api.eu-central-1.amazonaws.com/dev/online-judge', {
          code: codeForCurrentProblem,
          problem_id: currentProblem.id
        })
        .then(function (response) {
          const result: SubmissionStatus = response.data
          dispatch(setSubmissionStatus(currentProblem.id, {
            status: result.status,
            message: result.message,
            expected: result.expected,
            input: result.input,
            result: result.result
          }))
          if (result.status === "Accepted") {
            setProblemAccepted(currentProblem.id, state.user.user.uid)
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      dispatch(setFetchingSubmission(false))
  }

