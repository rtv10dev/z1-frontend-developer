export interface Evaluation {
  summary: Outcome;
}

interface Outcome {
  outcome: OutcomeValues;
}

export enum OutcomeValues {
  success = "Approved",
  error = "Too Much Glare",
}

export enum infoEnum {
  lowLight = "lowLight",
  taken = "taken",
}
