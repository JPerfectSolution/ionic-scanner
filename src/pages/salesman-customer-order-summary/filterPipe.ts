import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'itemfilter',
    pure: false
})
export class ItemFilter implements PipeTransform {
    transform(items: any[], filter: string): any {
        if (!items || !filter) {
            return items;
        }
        // filter items array, items which match and return true will be
        // kept, false will be filtered out
        return items.filter(item => item.itemName.toLowerCase().indexOf(filter.toLowerCase()) !== -1);
    }
}