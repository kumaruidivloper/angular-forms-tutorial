import { FormControl, FormGroup } from '@angular/forms';
import { states, State } from './states';
import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';



@Component({
  selector: 'app-dynamic-checkbox-from',
  standalone: false,
  templateUrl: './dynamic-checkbox-from.html',
  styleUrl: './dynamic-checkbox-from.scss'
})
export class DynamicCheckboxFrom {
   protected states: State[] = states;
    protected selectAll = new FormControl(false, {nonNullable: true})
   protected form = new FormGroup(
     Object.fromEntries(
      this.states.map(
        option => [option.value, new FormControl(false, {nonNullable: true})]
      )
     )
   );

  constructor() {
    this.selectAll.valueChanges.pipe(takeUntilDestroyed()).subscribe(checked => this.toggleAll(checked))
  }

   get selectedValues() {
       
    return Object.keys(this.form.value).filter(key => this.form.value[key]);
   }

   private toggleAll(checked: boolean) {
      this.states.forEach(state => {
        this.form.get(state.value)?.setValue(checked, {emitEvent: false})
      })
   }

}
