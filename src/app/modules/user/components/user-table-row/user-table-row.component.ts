import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { IRole } from '../../../../shared/models/role';
import { IUser } from '../../../../shared/models/user';

@Component({
  selector: '[app-user-table-row]',
  templateUrl: './user-table-row.component.html',
  styleUrl: './user-table-row.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserTableRowComponent {

  @Input() roleList!: Observable<IRole[] | null>;
  @Input() user!: IUser;
  @Input() isCreate!: boolean;
  public isEdit: boolean = false;

  @Output() updateEvent: EventEmitter<{ id: number, fio: string, email: string, password?: string, role: string }> = new EventEmitter();
  @Output() deleteEvent: EventEmitter<number> = new EventEmitter();

  update(value: {id: number, fio: string, email: string, password?: string, role: string}): void {
    this.updateEvent.emit(value)
  }
  delete(): void {
    if (!confirm('Вы действительно хотите удалить данного пользователя?')) { return }
    this.deleteEvent.emit(this.user.id)
  }
  closeForm(): void {
    this.isEdit = false;
  }
}
