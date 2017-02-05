import { Pipe, PipeTransform } from '@angular/core';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 |  exponentialStrength:10}}
 *   formats to: 1024
*/
@Pipe({name: 'timespan'})
export class TimeSpanPipe implements PipeTransform {
  transform(miliseconds: string): string {
    let milisec = Number.parseInt(miliseconds)
    let minutes=Math.round((milisec/(1000*60))%60)
    let hours=Math.round((milisec/(1000*60*60))%24)

    return `${hours}` + ' hours ' + `${minutes}` + ' minutes '
  }
}