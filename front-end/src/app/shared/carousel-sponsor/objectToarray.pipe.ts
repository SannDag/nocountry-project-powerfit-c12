import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objectToArray'
})
export class ObjectToArrayPipe implements PipeTransform {

  transform(object: any , searchValue?: string):unknown {
    return  Object.values(object);
  }

}
