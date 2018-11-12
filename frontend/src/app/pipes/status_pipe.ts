import {Pipe, PipeTransform} from '@angular/core';
import {Status} from "../model/enums/status";

@Pipe({name: 'status'})
export class StatusPipe implements PipeTransform {
  transform(value: string){
    let status : Status = Status[value];
    if(status == Status.OPEN || status == Status.CLOSED ){
      return '<span class=\"text-success\">'+value+'</span>';
    }else {
      return '<span class=\"text-warning\">'+value+'</span>';
    }
  }
}
