import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { POLYMORPH_CONTEXT, PrizmDay, PrizmTime } from '@prizm-ui/components';
import moment from 'moment';
import 'moment/locale/ru';
import { Subject } from 'rxjs';
import { IMeetup } from '../../../../shared/models/meetup';
import { createMeetup, editMeetup } from '../../store/meetup.actions';
import { MeetupState } from '../../store/meetup';


@Component({
  selector: 'app-meetup-form',
  templateUrl: './meetup-form.component.html',
  styleUrl: './meetup-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MeetupFormComponent implements OnInit {

  private destroy: Subject<void> = new Subject();

  public requiredInputControl = new UntypedFormControl(2, Validators.required);
  public value = new UntypedFormControl([new PrizmDay(2022, 2, 15), new PrizmTime(12, 30)]);

  public ngOnInit(): void {
    this.initForm();
  }

  meetupForm!: FormGroup
  today = new Date();

  @Output() meetupEvent = new EventEmitter();
  @Input() meetup!: IMeetup | undefined;

  constructor(
    @Inject(POLYMORPH_CONTEXT) readonly context: any,
    private store: Store<{ meetup: MeetupState }>
  ) { }

  initForm() {
    let date = moment();
    let contextMeetup = {
      name: '',
      description: '',
      duration: 30,
      location: '',
      time: '',
      target_audience: '',
      need_to_know: '',
      will_happen: '',
      reason_to_come: ''
    };
    if (this.context.context?.meetup) {
      contextMeetup = this.context.context.meetup;
      date = moment(contextMeetup.time)
    }

    this.value = new UntypedFormControl
      ([new PrizmDay(date.year(), date.month(), date.date()), new PrizmTime(date.hour(), date.minutes())])

    this.meetupForm = new FormGroup({
      name: new FormControl<string>(contextMeetup.name, [Validators.required, Validators.minLength(3)]),
      description: new FormControl<string>(contextMeetup.description, [Validators.required]),
      time: new FormControl<string>(this.value || '', [Validators.required]),
      duration: new FormControl<number>(contextMeetup.duration, [Validators.required, Validators.pattern('^[ 0-9]+$')]),
      location: new FormControl<string>(contextMeetup.location, [Validators.required]),
      target_audience: new FormControl<string>(contextMeetup.target_audience, [Validators.required]),
      need_to_know: new FormControl<string>(contextMeetup.need_to_know, [Validators.required]),
      will_happen: new FormControl<string>(contextMeetup.will_happen, [Validators.required]),
      reason_to_come: new FormControl<string>(contextMeetup.reason_to_come, [Validators.required]),
    });
  }

  onSubmit() {
    if (this.meetupForm.invalid) { return }

    const newDate = this.meetupForm.value.time.value;
    this.meetupForm.value.time = new Date(
      newDate[0].year,
      newDate[0].month,
      newDate[0].day,
      newDate[1].hours,
      newDate[1].minutes
    );
    this.context.header === 'Создание митапа' ? this.createMeetup(this.meetupForm) : this.editMeetup(this.meetupForm);
    this.context.completeWith();
  }

  getTime(): string | null {
    if (!this.meetup) { return null }
    return moment(this.meetup?.time).format('HH:mm');
  }
  
  createMeetup(form: FormGroup) {
    this.store.dispatch(createMeetup({form: form.value}));
  }
  editMeetup(form: FormGroup) {
    this.store.dispatch(editMeetup({form: form.value, meetup: this.context.context.meetup}));
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
