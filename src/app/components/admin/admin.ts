import { Component, signal } from '@angular/core';
import { Usuario as UsuarioService } from '../../services/usuario';
import { Ticket as TicketService } from '../../services/ticket';
import { Usuario as UsuarioModel } from '../../models/usuario';
import { Ticket as TicketModel } from '../../models/ticket';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  imports: [ CommonModule, FormsModule ],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin {
  pestanaActiva = signal<'perfil' | 'tickets' | 'usuarios'>('perfil');
  loading = signal<boolean>(false);
  usuario = signal<UsuarioModel>(new UsuarioModel());
  editNombre = signal<boolean>(false);
  editEmail = signal<boolean>(false);
  editUsername = signal<boolean>(false);
  nombre_completo = signal<string>('');
  email = signal<string>('');
  username = signal<string>('');
  actualPassword = signal<string>('');
  newPassword = signal<string>('');
  repeatNewPassword = signal<string>('');
  tickets = signal<TicketModel[]>([]);
  ticket = signal<TicketModel | null>(null);
  mostrarModal = signal<boolean>(false);
  mostrarPassword = signal<boolean>(false);
  usuarios = signal<UsuarioModel[]>([]);
  usuarioSelect = signal<string>('');
  usuarioSeleccionado = signal<UsuarioModel | null>(null);
  usuarioTemporal = signal<UsuarioModel | null>(null);
  passwordTemporal = signal<string>('');
  mostrarModalUsuario = signal<boolean>(false);
  mostrarModalEditar = signal<boolean>(false);
  filters: any = {
    nombre_completo: '',
    username: '',
    email: '',
    estado: 'TODOS'
  }

  constructor(private usuarioService: UsuarioService,
    private ticketService: TicketService
  ) { };

  ngOnInit(): void {
    this.cargarPerfil();
    this.cargarUsuarios();
  }

  cargarPerfil() {
    this.loading.set(true);
    this.usuarioService.getMyProfile().subscribe(
      (result: any) => {
        this.usuario.set(result.data);
        this.nombre_completo.set(result.data.nombre_completo);
        this.email.set(result.data.email);
        this.username.set(result.data.username);
        this.loading.set(false);
      },
      (error: any) => {
        this.loading.set(false);
        alert(error.error.msg || "Error del servidor");
      }
    );
  };

  guardarNombre() {
    this.actualizarPerfil({ nombre_completo: this.nombre_completo() }, () => {
      this.editNombre.set(false);
    });
  };

  guardarEmail() {
    this.actualizarPerfil({ email: this.email() }, () => {
      this.editEmail.set(false);
    });
  };

  guardarUsername() {
    this.actualizarPerfil({ username: this.username() }, () => {
      this.editUsername.set(false);
    });
  };

  private actualizarPerfil(body: any, cb?: () => void): void {
    this.loading.set(true);
    this.usuarioService.updateMyProfile(body).subscribe(
      (result: any) => {
        alert(result.msg);
        this.cargarPerfil();
        cb?.();
      },
      (error: any) => {
        this.loading.set(false);
        alert(error.error.msg || "Error del servidor");
      }
    );
  };

  cancelarNombre() {
    this.nombre_completo.set(this.usuario().nombre_completo);
    this.editNombre.set(false);
  };

  cancelarEmail() {
    this.email.set(this.usuario().email);
    this.editEmail.set(false);
  };

  cancelarUsername() {
    this.username.set(this.usuario().username);
    this.editUsername.set(false);
  };

  cambiarPassword() {
    this.loading.set(true);
    this.usuarioService.changeMyPassword(this.actualPassword(), this.newPassword(), this.repeatNewPassword()).subscribe(
      (result: any) => {
        alert(result.msg);
        this.actualPassword.set('');
        this.newPassword.set('');
        this.repeatNewPassword.set('');
        this.loading.set(false);
      },
      (error: any) => {
        this.loading.set(false);
        alert(error.error.msg || "Error del servidor");
      }
    );
  };

  cargarTickets() {
    this.loading.set(true);
    const params: any = {};
    if (this.usuarioSelect()) {
      params.id = this.usuarioSelect();
    };
    this.ticketService.getTickets(params).subscribe(
      (result: any) => {
        this.tickets.set(result.data.map((element: any) => {
          return Object.assign(new TicketModel(), element);
        }));
        this.loading.set(false);
      },
      (error: any) => {
        this.loading.set(false);
        alert(error.error.msg || "Error del servidor");
      }
    );
  };

  verTicket(ticket: TicketModel) {
    this.ticket.set(ticket);
    this.mostrarModal.set(true);
  };

  cerrarTicket() {
    this.mostrarModal.set(false);
    this.ticket.set(null);
  };

  cambiarPestana(pestaña: 'perfil' | 'tickets' | 'usuarios'): void {
    this.pestanaActiva.set(pestaña);
    if (pestaña === 'tickets' && this.tickets().length === 0) {
      this.cargarTickets();
    };
    if (pestaña === 'usuarios' && this.usuarios().length === 0) {
      this.cargarUsuarios();
    };
  };

  cargarUsuarios() {
    const params: any = { ...this.filters };
    if (params.estado === 'TODOS') {
      delete params.estado;
    };
    this.usuarioService.getUsuarios(params).subscribe(
      (result: any) => {
        this.usuarios.set(result.data.map((element: any) => {
          return Object.assign(new UsuarioModel(), element);
        }));
      },
      (error: any) => {
        alert(error.error.msg || "Error del servidor");
      }
    );
  };

  onUsuarioFilterChange() {
    this.cargarUsuarios();
  };

  mostrarUsuario(usuario: UsuarioModel) {
    this.usuarioSeleccionado.set(usuario);
    this.mostrarModalUsuario.set(true);
    this.mostrarModalEditar.set(false);
  };

  cerrarUsuario() {
    this.usuarioSeleccionado.set(null);
    this.mostrarModalUsuario.set(false);
    this.mostrarModalEditar.set(false);
  };

  mostrarEditarUsuario(usuario: UsuarioModel) {
    if (!confirm('¿Editar usuario?')) {
      return;
    };
    this.usuarioTemporal.set(Object.assign(new UsuarioModel(), usuario));
    this.usuarioSeleccionado.set(usuario);
    this.mostrarModalUsuario.set(true);
    this.mostrarModalEditar.set(true);
  };

  editarUsuario(body: any) {
    const usuario = this.usuarioSeleccionado();
    if (!usuario) {
      return;
    };
    this.loading.set(true);
    this.usuarioService.updateUsuario(usuario._id, body).subscribe(
      (result: any) => {
        alert(result.msg);
        this.loading.set(false);
        this.cerrarUsuario();
        this.cargarUsuarios();
      },
      (error: any) => {
        this.loading.set(false);
        alert(error.error.msg || "Error del servidor");
      }
    );
  };

  eliminarUsuario(id: string) {
    if (!confirm('¿Eliminar usuario?')) {
      return;
    };
    this.loading.set(true);
    this.usuarioService.deleteUsuario(id).subscribe(
      (result: any) => {
        alert(result.msg);
        this.loading.set(false);
        this.cargarUsuarios();
      },
      (error: any) => {
        this.loading.set(false);
        alert(error.error.msg || "Error del servidor");
      }
    );
  };
}
