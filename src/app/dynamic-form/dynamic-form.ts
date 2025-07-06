import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IForm, IFromControl, IValidator } from '../interface/form.interface';

@Component({
  selector: 'app-dynamic-form',
  standalone: false,
  templateUrl: './dynamic-form.html',
  styleUrl: './dynamic-form.scss'
})
export class DynamicForm implements OnInit {
  formValue: any = {}
  @Input() form!: IForm;
  fb = inject(FormBuilder);
  dynamicFormGroup: FormGroup = this.fb.group({}, {updateOn: 'submit'});

  ngOnInit(): void {
      if(this.form?.formControls) {
        let formGroup: any = {};
        this.form.formControls.forEach((control: IFromControl) => {
          let controlValidators: any = [];
          if(control.validators) {
            control.validators.forEach((val: IValidator) => {
              if(val.validatorName === 'required') controlValidators.push(Validators.required);
              if(val.validatorName === 'email') controlValidators.push(Validators.required);
              if(val.validatorName === 'minLength') controlValidators.push(Validators.minLength(val.minLength as number));    
              if(val.validatorName === 'pattern') controlValidators.push(Validators.pattern(val.pattern as string));
              if(val.validatorName === 'maxlength') controlValidators.push(Validators.minLength(val.maxLength as number));

            })
          }
          formGroup[control.name] = [control.value || '', controlValidators]
        })
        this.dynamicFormGroup = this.fb.group(formGroup);
      }
  }

  onSubmit() {
    this.formValue = this.dynamicFormGroup.value
  }
  resetForm() {
    this.dynamicFormGroup.reset();
  }

  getValidationErrors(control: IFromControl): string {
    const myFormControl = this.dynamicFormGroup.get(control.name);
    let errorMessage = '';
    control.validators.forEach((val) => {
      if(myFormControl?.hasError(val.validatorName as string)) {
        errorMessage = val.message as string;
      }
    });
    return  errorMessage;
  }
}
