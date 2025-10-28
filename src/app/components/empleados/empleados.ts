import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmpleadoService, Empleado } from '../../services/empleado';

@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './empleados.html',
  styleUrl: './empleados.css'
})
export class EmpleadosComponent implements OnInit {
  empleados: Empleado[] = [];
  nuevoEmpleado: Empleado = {
    nombre: '',
    apellido: '',
    correo: '',
    salario: 0
  };

  constructor(private empleadoService: EmpleadoService) {}

  ngOnInit(): void {
    this.cargarEmpleados();
  }

  cargarEmpleados(): void {
    this.empleadoService.getEmpleados().subscribe({
      next: (data) => {
        this.empleados = data;
        console.log('Empleados cargados:', data);
      },
      error: (error) => {
        console.error('Error cargando empleados:', error);
        alert('Error al cargar empleados. Verifica que el backend esté ejecutándose.');
      }
    });
  }

  crearEmpleado(): void {
    this.empleadoService.createEmpleado(this.nuevoEmpleado).subscribe({
      next: (empleado) => {
        this.empleados.push(empleado);
        this.nuevoEmpleado = { nombre: '', apellido: '', correo: '', salario: 0 };
        alert('Empleado creado exitosamente!');
      },
      error: (error) => {
        console.error('Error creando empleado:', error);
        alert('Error al crear empleado: ' + (error.error?.message || 'Verifique los datos'));
      }
    });
  }
}