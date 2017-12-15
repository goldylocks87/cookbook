import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterString: string, propName: string): any {
    if (value.length === 0 || filterString === '') {
      return value;
    }
    const resultArray = [];
    for( const item of value ) {

      const thisItem = item[propName].toUpperCase();
      const searchString = filterString.toUpperCase();

      if( thisItem === searchString
          || thisItem.indexOf(searchString) !== -1 ) {
        resultArray.push(item);
      }
    }
    return resultArray;
  }

}
