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
    this.authService.getSession().subscribe({
      next: (v) => {
        console.log(v);
        this.hasSession = v !== null;
      },
      error: (e) => {
        console.error(e);
      },
    });
  }

  async signInWithGoogle(): Promise<void> {
    const { data, error } =
      await this.authService.supabase.auth.signInWithOAuth({
        provider: 'google',
      });

    console.log(data);
    console.log(error);
  }

  async signOut(): Promise<void> {
    this.authService.supabase.auth.setSession({
      access_token: '',
      refresh_token: '',
    });
    const { error } = await this.authService.supabase.auth.signOut();
    console.log(error);
  }
}
