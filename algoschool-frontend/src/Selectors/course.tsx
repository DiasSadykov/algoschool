import { RootState } from "../Reducers";

export const getCourse = (state: RootState) => state.course.courseBlocks

export const isFetchingCourse = (state: RootState) => state.course.fetching

export const getCurrentItem = (id: string) => (state: RootState) => state.course.problemsByIds[id]