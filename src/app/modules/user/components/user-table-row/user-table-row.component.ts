import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { prizmIconsCircleXmark, prizmIconsGear8Edge } from '@prizm-ui/icons/base/source';
import { PrizmIconsFullRegistry } from '@prizm-ui/icons/core';
import { IRole } from '../../../../shared/models/role';
import { IUser } from '../../../../shared/models/user';
import { Observable } from 'rxjs';

@Component({
  selector: '[app-user-table-row]',
  templateUrl: './user-table-row.component.html',
  styleUrl: './user-table-row.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserTableRowComponent {

  @Input() roleList!: Observable<IRole[]>;
  @Input() user!: IUser;
  @Input() isCreate!: boolean;
  private readonly iconsFullRegistry = inject(PrizmIconsFullRegistry);
  isEdit = false;

  @Output() updateEvent = new EventEmitter();
  @Output() deleteEvent = new EventEmitter();

  constructor(){
    this.iconsFullRegistry.registerIcons([prizmIconsGear8Edge, prizmIconsCircleXmark]);
  }

  update(value: IUser) {
    this.updateEvent.emit(value)
  }
  delete() {
    if (!confirm('Вы действительно хотите удалить данного пользователя?')) { return }
    this.deleteEvent.emit(this.user.id)
  }
  closeForm() {
    this.isEdit = false;
  }
}
