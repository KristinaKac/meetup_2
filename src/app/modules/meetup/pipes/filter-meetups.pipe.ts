import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';
import { IMeetup } from '../../../shared/models/meetup';

@Pipe({
  name: 'filterMeetups'
})
export class FilterMeetupsPipe implements PipeTransform {

  transform(meetups: IMeetup[], search: string, criterion: 'name' | 'description' | 'location' | 'time' | 'owner'): IMeetup[] {
    let meetupList: IMeetup[] = meetups;

    if (!meetupList) { return [] }
    if (!criterion || !search) { return meetupList }

    switch (criterion) {
      case 'owner':
        meetupList = meetupList.filter(item => item[criterion]?.fio.toLowerCase().includes(search.toLowerCase()));
        break;
      case 'name':
      case 'description':
      case 'location':
        meetupList = meetupList.filter(item => {
          if (!item[criterion]) { return }
          return item[criterion].toLowerCase().includes(search.toLowerCase())
        });
        break;
      case 'time':
        meetupList = meetupList.filter(item => {
          const date = new Date(item.time);
          return moment(date).isSame(moment(search), 'D');
        })
        break;
      default:
        break;
    }

    return meetupList;
  }
}
