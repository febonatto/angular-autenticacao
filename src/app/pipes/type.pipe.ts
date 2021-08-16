import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'type'
})
export class TypePipe implements PipeTransform {

  transform(value: string, ...args: string[]): string {
    switch(value.toLowerCase()) {
      case 'inicio_trabalho':
        return 'Início Trabalho'
      case 'inicio_almoco':
        return 'Início Almoço'
      case 'termino_almoco':
        return 'Término Almoço'
      case 'termino_trabalho':
        return 'Término Trabalho'
      case 'inicio_pausa':
        return 'Início Pausa'
      case 'termino_pausa':
        return 'Término Pausa'
      default:
        return value;
    }
  }

}
