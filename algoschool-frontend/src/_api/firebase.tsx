import { db } from '../firebase'

export function setProblemAccepted(problemId: number, userId: number) {
    return db.collection("users").doc(userId.toString()).set({"CompletedProblems": {
        [problemId]: true
    }}, {merge: true});
}
