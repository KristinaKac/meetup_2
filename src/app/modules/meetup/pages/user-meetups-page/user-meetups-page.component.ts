import { ChangeDetectionStrategy, Component, Inject, Injector, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { PolymorphComponent, PrizmDialogService, PrizmOverlayInsidePlacement } from '@prizm-ui/components';
import { Observable, Subject } from 'rxjs';
import { IMeetup } from '../../../../shared/models/meetup';
import { SpinnerService } from '../../../../shared/services/spinner.service';
import { AuthService } from '../../../auth/services/auth.service';
import { MeetupFormComponent } from '../../components/meetup-form/meetup-form.component';
import { MeetupService } from '../../services/meetup.service';
import { deleteMeetup, getAllMeetups } from '../../store/meetup.actions';
import { getMeetups } from '../../store/meetup.selector';
import { MeetupState } from '../../store/meetup.state';

@Component({
  selector: 'app-user-meetups-page',
  templateUrl: './user-meetups-page.component.html',
  styleUrl: './user-meetups-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserMeetupsPageComponent implements OnInit, OnDestroy {

  public positionVariants: PrizmOverlayInsidePlacement[] = Object.values(PrizmOverlayInsidePlacement);
  public position: PrizmOverlayInsidePlacement = this.positionVariants[8];
  public backdrop = true;
  public dismissible = true;

  public meetupList$!: Observable<IMeetup[] | null>;
  private destroy: Subject<void> = new Subject();

  constructor(
    public meetupService: MeetupService,
    public authService: AuthService,
    public spinnerService: SpinnerService,
    public dialog: MatDialog,
    public store: Store<{ meetup: MeetupState }>,
    @Inject(PrizmDialogService) private readonly dialogService: PrizmDialogService,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(getAllMeetups());
    this.meetupList$ = this.store.select(getMeetups);
  }

  delete(id: number) {
    this.store.dispatch(deleteMeetup({id}));
  }
  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  public component = new PolymorphComponent(MeetupFormComponent);
  public context = { a: 1 };

  public show(): void {

    this.dialogService
      .open(
        this.component,
        {
          closeable: true,
          header: 'Создание митапа',
          width: 500,
          closeWord: 'Отмена',
          position: this.position,
          dismissible: this.dismissible,
          backdrop: this.backdrop,
          size: 'm',
        }
      )
      .subscribe();
  }
}
