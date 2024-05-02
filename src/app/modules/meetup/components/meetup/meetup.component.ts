import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { PolymorphComponent, PrizmDialogService, PrizmOverlayInsidePlacement } from '@prizm-ui/components';
import moment from 'moment';
import 'moment-timezone';
import { IMeetup } from '../../../../shared/models/meetup';
import { AuthService } from '../../../auth/services/auth.service';
import { MeetupFormComponent } from '../meetup-form/meetup-form.component';

moment.locale('ru');
moment.tz.setDefault();

@Component({
  selector: 'app-meetup',
  templateUrl: './meetup.component.html',
  styleUrl: './meetup.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MeetupComponent implements OnInit {

  public isOpen: boolean = false;
  public isOldMeetup: boolean = false;
  public isCanEdit: boolean = false;

  public positionVariants: PrizmOverlayInsidePlacement[] = Object.values(PrizmOverlayInsidePlacement);
  public position: PrizmOverlayInsidePlacement = this.positionVariants[8];
  public backdrop: boolean = true;
  public dismissible: boolean = true;
  public component: PolymorphComponent<MeetupFormComponent> = new PolymorphComponent(MeetupFormComponent);

  @Input() isUserPage: boolean = false;
  @Input() meetup!: IMeetup;
  @Output() subscribeEvent: EventEmitter<{ idMeetup: number, idUser: number }> = new EventEmitter();
  @Output() unsubscribeEvent: EventEmitter<{ idMeetup: number, idUser: number }> = new EventEmitter();
  @Output() deleteEvent: EventEmitter<number> = new EventEmitter();

  constructor(
    private authService: AuthService,
    @Inject(PrizmDialogService) private readonly dialogService: PrizmDialogService,
  ) { }

  ngOnInit(): void {
    this.checkDateMeetup();

    if (this.meetup.createdBy === this.authService.user?.id) {
      this.isCanEdit = true;
    } else {
      this.isCanEdit = false;
    }
  }

  get isSubscribe(): { id: number, email: string, password: string, fio: string } | undefined {
    return this.meetup.users.find(item => item.id === this.authService.user?.id);
  }

  subscribe(): void {
    this.subscribeEvent.emit({
      idMeetup: this.meetup.id,
      idUser: this.authService.user!.id
    });
  }
  unsubscribe(): void {
    this.unsubscribeEvent.emit({
      idMeetup: this.meetup.id,
      idUser: this.authService.user!.id
    })
  }
  delete(): void {
    if (!confirm('Вы действительно хотите удалить митап?')) { return }
    this.deleteEvent.emit(this.meetup.id);
  }
  getDate(time: string): string {
    return moment(time).format('DD.MM.YYYY, HH:mm');
  }
  checkDateMeetup(): void {
    const now = moment();
    const utcDate = moment.utc(this.meetup.time);
    if (utcDate.isAfter(now)) {
      this.isOldMeetup = false
    } else {
      this.isOldMeetup = true;
    }
  }

  public show(): void {
    this.dialogService
      .open(
        this.component,
        {
          closeable: true,
          header: 'Редактирование митапа',
          width: 500,
          closeWord: 'Отмена',
          position: this.position,
          dismissible: this.dismissible,
          backdrop: this.backdrop,
          size: 'm',
          context: {
            meetup: this.meetup
          }
        }
      )
      .subscribe();
  }
}
