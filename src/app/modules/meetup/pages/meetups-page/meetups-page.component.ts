import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { IMeetup } from '../../../../shared/models/meetup';
import { SpinnerService } from '../../../../shared/services/spinner.service';
import { getAll, setCurrentPage, subscribe, unsubscribe } from '../../store/meetup.actions';
import { getCurrentPage, getMeetups } from '../../store/meetup.selector';
import { State } from '../../store/meetup.state';

@Component({
  selector: 'app-meetups-page',
  templateUrl: './meetups-page.component.html',
  styleUrl: './meetups-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MeetupsPageComponent implements OnInit, OnDestroy {

  public currentPage$: number = 1;

  public meetupList$!: Observable<IMeetup[] | any>;
  private destroy: Subject<void> = new Subject();

  public searchFilter!: string;
  public criterionFilter!: 'name' | 'description' | 'location' | 'time' | 'owner';

  constructor(
    public spinnerService: SpinnerService,
    private store: Store<{ meetup: State }>
  ) { }

  ngOnInit(): void {
    this.store.dispatch(getAll());
    this.meetupList$ = this.store.select(getMeetups);
    this.store.select(getCurrentPage).pipe(takeUntil(this.destroy)).subscribe((page: number) => this.currentPage$ = page);
  }
  subscribe(value: { idMeetup: number, idUser: number }) {
    this.store.dispatch(subscribe({idMeetup: value.idMeetup, idUser: value.idUser}))
  }
  unsubscribe(value: { idMeetup: number, idUser: number }) {
    this.store.dispatch(unsubscribe({idMeetup: value.idMeetup, idUser: value.idUser}))
  }
  filter(value: { search: string, criterion: 'name' | 'description' | 'location' | 'time' | 'owner' }) {
    this.searchFilter = value.search;
    this.criterionFilter = value.criterion;
  }
  setCurrentPage(page: number) {
    this.store.dispatch(setCurrentPage({page}))
  }
  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
