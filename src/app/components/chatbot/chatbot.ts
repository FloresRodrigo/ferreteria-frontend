import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

interface ChatMessage {
  from: 'bot' | 'user';
  text: string;
  options?: string[];
};

@Component({
  selector: 'app-chatbot',
  imports: [ CommonModule ],
  templateUrl: './chatbot.html',
  styleUrl: './chatbot.css',
})
export class Chatbot {
  abierto = signal<boolean>(false);
  private readonly menuOpciones = [
    '¿Qué es este sitio?',
    'Medios de pago',
    '¿Cómo comprar?',
    'Cuenta y acceso',
    'Soporte'
  ];
  mensajes = signal<ChatMessage[]>([
    {
      from: 'bot',
      text: 'Hola 👋 ¿En qué puedo ayudarte?',
      options: this.menuOpciones
    }
  ]);

  abrirChat() {
    this.abierto.set(!this.abierto());
  };

  private mostrarMenu() {
    this.mensajes.update(m => [
      ...m,
      {
        from: 'bot',
        text: '¿Necesitás algo más?',
        options: this.menuOpciones
      }
    ]);
  };

  private responder(texto:string) {
    this.mensajes.update(m => [...m, { from: 'bot', text: texto }]);
    setTimeout(() => this.mostrarMenu(), 400);
  };

  seleccionarOpcion(opcion:string, msg:ChatMessage) {
    msg.options = undefined;
    this.mensajes.update(m => [...m, { from: 'user', text: opcion }]);
    switch (opcion) {
      case '¿Qué es este sitio?':
        this.responder(
          'Este sitio es un proyecto completo de Frontend y Backend con autenticación, pagos, estadísticas y panel administrador.'
        );
        break;
      case 'Medios de pago':
        this.responder(
          'Podés usar el usuario de prueba:\n\n🆔 Usuario: TESTUSER5539511494012944808\n\n🔑 Contraseña: MA6Yc1QCYd\n\n💳 Tarjetas de prueba:Elegí siempre la opcion de crédito\nClave: 123\n\n📩 Verificación de email:Si el sistema te solicita un codigo, usá el siguiente\nCódigo: 345776'
        );
        break;
      case '¿Cómo comprar?':
        this.responder(
          'Elegís un producto, lo agregás al carrito y completás el pago.'
        );
        break;
      case 'Cuenta y acceso':
        this.responder(
          'Podés registrarte con email o ingresar con Google. El sistema maneja seguridad y roles.'
        );
        break;
      case 'Soporte':
        this.mensajes.update(m => [
          ...m,
          {
            from: 'bot',
            text: '¿Querés contactar al soporte?',
            options: ['Contactar por mail', 'Volver']
          }
        ]);
        break;
      case 'Volver':
        this.mostrarMenu();
        break;
    };
  };
}
