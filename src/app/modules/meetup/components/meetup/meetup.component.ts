import { IMeetup } from '../../../../shared/models/meetup';
import { AuthService } from '../../../auth/services/auth.service';
import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Injector, Input, OnInit, Output, inject } from '@angular/core';
import 'moment-timezone';
import moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { prizmIconsArrowUp } from '@prizm-ui/icons/base/source';
import { prizmIconsArrowDown } from '@prizm-ui/icons/base/source';
import { PrizmIconsFullRegistry } from '@prizm-ui/icons/core';
import { prizmIconsUserCircle } from '@prizm-ui/icons/base/source';
import { PolymorphComponent, PrizmDialogService, PrizmOverlayInsidePlacement } from '@prizm-ui/components';
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

  private readonly iconsFullRegistry = inject(PrizmIconsFullRegistry);

  public positionVariants: PrizmOverlayInsidePlacement[] = Object.values(PrizmOverlayInsidePlacement);
  public position: PrizmOverlayInsidePlacement = this.positionVariants[8];
  public backdrop = true;
  public dismissible = true;
  public component = new PolymorphComponent(MeetupFormComponent);

  constructor(
    private authService: AuthService,
    public dialog: MatDialog,
    @Inject(PrizmDialogService) private readonly dialogService: PrizmDialogService,
  ) {
    this.iconsFullRegistry.registerIcons([prizmIconsArrowUp, prizmIconsArrowDown, prizmIconsUserCircle]);

  }

  ngOnInit(): void {
    this.checkDateMeetup();

    if (this.meetup.createdBy === this.authService.user?.id) {
      this.isCanEdit = true;
    } else {
      this.isCanEdit = false;
    }
  }

  isOpen: boolean = false;
  isOldMeetup: boolean = false;
  isCanEdit: boolean = false;
  @Input() isUserPage: boolean = false;


  @Input() meetup!: IMeetup

  @Output() subscribeEvent = new EventEmitter();
  @Output() unsubscribeEvent = new EventEmitter();
  @Output() deleteEvent = new EventEmitter();

  get isSubscribe() {
    return this.meetup.users.find(item => item.id === this.authService.user?.id);
  }

  subscribe() {
    this.subscribeEvent.emit({
      idMeetup: this.meetup.id,
      idUser: this.authService.user?.id
    });
  }
  unsubscribe() {
    this.unsubscribeEvent.emit({
      idMeetup: this.meetup.id,
      idUser: this.authService.user?.id
    })
  }
  delete(): void {
    if (!confirm('Вы действительно хотите удалить митап?')) { return }
    this.deleteEvent.emit(this.meetup.id);
  }
  getDate(time: string) {
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
