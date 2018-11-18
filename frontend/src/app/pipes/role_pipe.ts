import {Pipe, PipeTransform} from '@angular/core';
import {Role} from "../model/enums/role";

@Pipe({name: 'role'})
export class RolePipe implements PipeTransform {
  transform(value: string){
    let role : Role = Role[value];
    if(role == Role.ADMIN || role == Role.PROJECT_MANAGER){
      return '<span class=\"text-danger\">'+value+'</span>';
    }else if(role == Role.TESTER || role == Role.DEVELOPER) {
      return '<span class=\"text-success\">'+value+'</span>';
    }else {
      return '<span class=\"text-info\">'+value+'</span>';
    }
  }
}
