import { ChangeDetectionStrategy, Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { PrizmSelectStringify, PrizmSelectValueTransformver } from '@prizm-ui/components';
import 'moment/locale/ru';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';

@Component({
  selector: 'app-filter-form',
  templateUrl: './filter-form.component.html',
  styleUrl: './filter-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class FilterFormComponent implements OnInit {

  readonly items = [
    { key: 'name', title: 'По названию' },
    { key: 'description', title: 'По описанию' },
    { key: 'location', title: 'По местоположению' },
    { key: 'time', title: 'По дате' },
    { key: 'owner', title: 'По автору' },
  ];

  filterForm: FormGroup;

  @Output() filterEvent = new EventEmitter();
  @Output() resetEvent = new EventEmitter();
  private destroy: Subject<void> = new Subject();


  constructor() {
    this.filterForm = new FormGroup({
      search: new FormControl<string>(''),
      criterion: new FormControl<'name' | 'description' | 'location' | 'time' | 'owner'>('name', [Validators.required])
    });
  }
  readonly stringify: PrizmSelectStringify<{ key: string, title: string }> = (item: { key: string, title: string }) => {
      if (!item) {
        return '';
      }
      return item.title
    };
  readonly transformer: PrizmSelectValueTransformver<{ key: string, title: string }> = (item) => {
      if (!item) { return '' }
      return item.key
    };

  ngOnInit(): void {

    this.filterForm.controls['search'].valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this.destroy))
      .subscribe((data) => {
        if (this.filterForm.invalid) { return }
        this.filterEvent.emit({ search: data, criterion: this.filterForm.value.criterion })
      });
  }
  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
