import { FormControl } from '@angular/forms';
export interface IForm {
    formTitle: string;
    formControls: IFromControl[];
    saveBtnTitle: string;
    resetBtnTitle: string
}

export interface IFromControl {
  name: string;
  label: string;
  value?: string;
  options?: IOptions[];
  radioOptions?: string[];
  placeholder?: string;
  class: string;
  type: string;
  validators: IValidator[];
}

export interface IValidator {
  validatorName: string;
  required: boolean;
  message: string;
  pattern?: string;
  minLength?: number;
  maxLength?: number;
  email?: string;
}

interface IOptions {
    id?: number;
    value?: string;
}

