import { Component, OnInit } from '@angular/core';
import { ValorarofertaService } from 'src/app/core/valoraroferta.service';

@Component({
  selector: 'app-enviosmsoferta',
  templateUrl: './enviosmsoferta.component.html',
  styleUrls: ['./enviosmsoferta.component.css']
})
export class EnviosmsofertaComponent implements OnInit {

  idSector: string | null = null;
  tamanoLote: string = '500';
  numeroLote: string = '';
  cadenaTexto: string = '';
  resultados: any[] = [];
  cargando: boolean = false;

  constructor(private serviciosvaloracion: ValorarofertaService) { }

  ngOnInit(): void { }

  consultar() {
    if (!this.idSector) {
      alert('Por favor ingrese un IdSector.');
      return;
    }
    if (!this.tamanoLote) {
      alert('Por favor ingrese el tañamo del lote.');
      return;
    } if (!this.numeroLote) {
      alert('Por favor ingrese el número del lote.');
      return;
    } if (!this.cadenaTexto) {
      alert('Por favor ingrese la cadena de texto.');
      return;
    }

    this.cargando = true;
    this.resultados = [];

    this.serviciosvaloracion.consAdminEnvioSMS('20', this.idSector, this.tamanoLote, this.numeroLote).subscribe({
      next: (res) => {
        this.resultados = res;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al consultar:', err);
        this.cargando = false;
      }
    });
  }

  enviarSMS() {
    if (!this.resultados.length) {
      alert('No hay registros para enviar.');
      return;
    }

    if (!this.cadenaTexto.trim()) {
      alert('Por favor ingrese la cadena de texto del mensaje.');
      return;
    }

    console.log('Preparando envío de SMS...', this.resultados);

    // Construir la lista de mensajes personalizados
    const mensajes = this.resultados.map(r => {
      const nombre = r.PRIMER_NOMBRE || r.NOMBRES_PERSONA || '';
      const mensajePersonalizado = this.cadenaTexto.replace('@nombre', nombre);

      return {
        cellphone: r.CELULAR_PERSONA,
        message: mensajePersonalizado
      };
    });

    // Armar el cuerpo para el API
    const bodyEnvio = {
      token: "x86ad3ce6oprr9b382xma",
      email: "cdiamazonws@gmail.com",
      type_send: "1via",
      data: mensajes
    };

    console.log('Body para envío:', bodyEnvio);
    this.cargando = true;

    // Llamar al servicio
    this.serviciosvaloracion.EnvioSmsDirectoApi(bodyEnvio).subscribe({
      next: (res) => {
        console.log('Respuesta del API de envío:', res);
        this.cargando = false;
        alert('Envío de SMS completado con éxito.');
      },
      error: (err) => {
        console.error('Error al enviar los SMS:', err);
        this.cargando = false;
        alert('Error al enviar los SMS. Revisa la consola para más detalles.');
      }
    });
  }


}
