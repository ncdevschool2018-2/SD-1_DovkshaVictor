import {Pipe, PipeTransform} from '@angular/core';
import {Priority} from "../model/enums/priority";

@Pipe({name: 'priority'})
export class PriorityPipe implements PipeTransform {
  transform(value: string){
    let priority : Priority = Priority[value];
    if(priority == Priority.CRITICAL || priority == Priority.BLOCKER){
      return '<span class=\"text-danger\">'+value+'</span>';
    }else if(priority == Priority.MAJOR || priority == Priority.NORMAL) {
      return '<span class=\"text-warning\">'+value+'</span>';
    }else {
      return '<span class=\"text-info\">'+value+'</span>';
    }
  }
}
