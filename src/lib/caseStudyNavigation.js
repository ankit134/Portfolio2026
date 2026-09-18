/** Passed via React Router `location.state` when opening a case study. */
export const CASE_STUDY_FROM = {
  SELECTED_WORK: 'selected-work',
  PROJECTS_LIST: 'projects-list',
}

export function selectedWorkCaseStudyState() {
  return { from: CASE_STUDY_FROM.SELECTED_WORK }
}
