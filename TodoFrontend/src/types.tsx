import {ChangeEvent, FormEvent} from 'react';

export type TodoType = {
  id?: string;
  completed?: boolean;
  message: string;
};

export type HandleSubmit =
  | ChangeEvent<HTMLInputElement>
  | FormEvent<HTMLFormElement>;
