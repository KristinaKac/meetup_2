import { ChangeDetectionStrategy, Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';
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
    'По названию',
    'По описанию',
    'По местоположению',
    'По дате',
    'По автору'
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
  ngOnInit(): void {
    this.filterForm.controls['search'].valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this.destroy))
      .subscribe((data) => {
        if (this.filterForm.invalid) { return }

        switch (this.filterForm.value.criterion) {
          case 'По названию':
            this.filterForm.value.criterion = 'name'
            break;
          case 'По описанию':
            this.filterForm.value.criterion = 'description'
            break;
          case 'По местоположению':
            this.filterForm.value.criterion = 'location'
            break;
          case 'По дате':
            this.filterForm.value.criterion = 'time'
            break;
          case 'По автору':
            this.filterForm.value.criterion = 'owner'
            break;
          default:
            break;
        }
        this.filterEvent.emit({ search: data, criterion: this.filterForm.value.criterion })
      });
  }
  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
