import {Component, Injectable} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UsuarioServiceService} from '../../../service/usuario-service.service';
import {NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {UserReport} from '../../../model/UserReport';
import {FormControl, Validators} from '@angular/forms';

@Injectable()
export class FormatDateAdapter extends NgbDateAdapter<string> {

  readonly DELIMITER = '/';

  fromModel(value: string | null): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10)
      };
    }
    return null;
  }

  toModel(date: NgbDateStruct | null): string | null {
    return date ? validarDate(date.day) + this.DELIMITER + validarDate(date.month) + this.DELIMITER + date.year : null;
  }

}

@Injectable()
export class FormataData extends NgbDateParserFormatter {

  readonly DELIMITER = '/'; // 18/10/1987

  format(date: NgbDateStruct): string | null {
    return date ? validarDate(date.day) + this.DELIMITER + validarDate(date.month) + this.DELIMITER + date.year : '';
  }

  parse(value: string): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10)
      };
    }
    return null;
  }

  toModel(date: NgbDateStruct | null): string | null {
    return date ? validarDate(date.day) + this.DELIMITER + validarDate(date.month) + this.DELIMITER + date.year : null;
  }
}

function validarDate(valor) { // adiciona zero em dias e meses menores que 10
  if (valor.toString !== '' && parseInt(valor) <= 9) {
    return '0' + valor;
  }
  return valor;
}

@Component({
  selector: 'app-root',
  templateUrl: './usuario-report.component.html',
  styleUrls: ['./usuario-report.component.css'],
  providers: [{provide: NgbDateParserFormatter, useClass: FormataData},
    {provide: NgbDateAdapter, useClass: FormatDateAdapter}]
})
export class UsuarioReportComponent {

  control: FormControl = new FormControl('dataInicio', Validators.required);
  control2: FormControl = new FormControl('dataFim', Validators.required);
  userReport = new UserReport();

  constructor(private routeActive: ActivatedRoute, private userService: UsuarioServiceService) {
  }

  imprimeRelatorio() {
    this.userService.downloadPdfRelatorioParam(this.userReport);
  }
}
