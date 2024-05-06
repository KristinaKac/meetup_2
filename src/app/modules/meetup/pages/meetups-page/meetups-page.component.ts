import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { IMeetup } from '../../../../shared/models/meetup';
import { SpinnerService } from '../../../../shared/services/spinner.service';
import { getAllMeetups, setCurrentPageMeetup, subscribeMeetup, unsubscribeMeetup } from '../../store/meetup.actions';
import { getCurrentPage, getMeetups } from '../../store/meetup.selector';
import { MeetupState } from '../../store/meetup';

@Component({
  selector: 'app-meetups-page',
  templateUrl: './meetups-page.component.html',
  styleUrl: './meetups-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MeetupsPageComponent implements OnInit, OnDestroy {

  public currentPage$ = 1;

  public meetupList$!: Observable<IMeetup[] | null>;
  private destroy: Subject<void> = new Subject();

  public searchFilter!: string;
  public criterionFilter!: 'name' | 'description' | 'location' | 'time' | 'owner';

  constructor(
    public spinnerService: SpinnerService,
    private store: Store<{ meetup: MeetupState }>
  ) { }

  ngOnInit(): void {
    this.store.dispatch(getAllMeetups());
    this.meetupList$ = this.store.select(getMeetups);
    this.store.select(getCurrentPage).pipe(takeUntil(this.destroy)).subscribe((page: number): number => this.currentPage$ = page);
  }
  subscribe(value: { idMeetup: number, idUser: number }): void {
    this.store.dispatch(subscribeMeetup({idMeetup: value.idMeetup, idUser: value.idUser}))
  }
  unsubscribe(value: { idMeetup: number, idUser: number }): void {
    this.store.dispatch(unsubscribeMeetup({idMeetup: value.idMeetup, idUser: value.idUser}))
  }
  filter(value: { search: string, criterion: 'name' | 'description' | 'location' | 'time' | 'owner' }): void {
    this.searchFilter = value.search;
    this.criterionFilter = value.criterion;
    this.setCurrentPage(1);
  }
  setCurrentPage(page: number): void {
    this.store.dispatch(setCurrentPageMeetup({page}))
  }
  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
