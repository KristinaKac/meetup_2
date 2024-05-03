import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PrizmSelectStringify, PrizmSelectValueTransformver } from '@prizm-ui/components';
import 'moment/locale/ru';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { IFilterMeetupItems } from '../../../../shared/models/meetup';

@Component({
  selector: 'app-filter-form',
  templateUrl: './filter-form.component.html',
  styleUrl: './filter-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class FilterFormComponent implements OnInit, OnDestroy {

  readonly items: IFilterMeetupItems[] = [
    { key: 'name', title: 'По названию' },
    { key: 'description', title: 'По описанию' },
    { key: 'location', title: 'По местоположению' },
    { key: 'time', title: 'По дате' },
    { key: 'owner', title: 'По автору' },
  ];

  filterForm: FormGroup;
  @Output() filterEvent: EventEmitter<
    { search: string, criterion: 'name' | 'description' | 'location' | 'time' | 'owner' }
  > = new EventEmitter();
  private destroy: Subject<void> = new Subject();

  constructor() {
    this.filterForm = new FormGroup({
      search: new FormControl<string>(''),
      criterion: new FormControl<'name' | 'description' | 'location' | 'time' | 'owner'>('name', [Validators.required])
    });
  }
  readonly stringify: PrizmSelectStringify<{ key: string, title: string }> = (item: { key: string, title: string }) => {
    return item ? item.title : '';
  };
  readonly transformer: PrizmSelectValueTransformver<{ key: string, title: string }> = (item: { key: string, title: string }) => {
    return item ? item.key : '';
  };

  ngOnInit(): void {
    this.filterForm.controls['search'].valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this.destroy))
      .subscribe((data: string) => {
        if (this.filterForm.invalid) { return }
        this.filterEvent.emit({ search: data, criterion: this.filterForm.value.criterion });
      });
    this.filterForm.controls['criterion'].valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this.destroy))
      .subscribe((data: "name" | "description" | "location" | "time" | "owner") => {
        if (this.filterForm.invalid) { return }
        this.filterEvent.emit({ search: data === 'time' ? '' : this.filterForm.value.search?.toString(), criterion: data })
      });
  }
  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
