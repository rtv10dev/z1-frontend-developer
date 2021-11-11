import { Evaluation } from "models";
import axios from "./index";

export const validateDocument = (image: string): Promise<Evaluation> =>
  axios.post("/evaluations", { image }).then((res) => res.data);
