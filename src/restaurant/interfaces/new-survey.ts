import { TypeAnswer } from '.';

export interface NewSurvey {
  name: string;
  description: string;
  questions: NewQuestion[];
}

export interface NewQuestion {
  id: string;
  question: string;
  typeAnswer: TypeAnswer;
  typeQuestion: 'open' | 'close';
  options: NewOption[];
}

export interface NewOption {
  id: string;
  option: string;
}
