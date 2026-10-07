import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-role-switcher',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './role-switcher.html',
  styleUrl: './role-switcher.scss',
})
export class RoleSwitcher {
  public authService = inject(AuthService);

  onRoleChange(role: 'Admin' | 'User'): void {
    console.log('Role change requested :', role);
    this.authService.switchRole(role).subscribe({
      next: (res) => {
        console.log('New role assigned by the API:', res);
      },
      error: (err) => {
        console.error('Error while switching roles :', err);
      }
    });
  }
}
