import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
	name: 'myMoment'
})
export class MomentPipe implements PipeTransform {
	transform(value: string, formatFrom: string, formatTo: string = 'DD.MM.YYYY'): string {
		return moment(value, formatFrom).format(formatTo);
	}
}