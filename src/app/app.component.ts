import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { HomeComponent } from './pages/home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [CommonModule, RouterOutlet, HomeComponent],
})
export class AppComponent implements OnInit {
  readonly authService = inject(AuthService);
  title = 'perfil-Client';
  hasSession = false;

  ngOnInit(): void {
    this.authService.initClient();
    this.authService.getSession().subscribe(
      (session) => {
        this.hasSession = session !== null;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  async signInWithGoogle(): Promise<void> {
    this.authService.supabase.auth.signInWithOAuth({
      provider: 'google',
    });
  }

  signOut(): void {
    this.authService.supabase.auth.signOut();
  }
}
