import { Injectable } from '@angular/core';
import { Session, createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import { Observable, from, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  supabase!: SupabaseClient;
  initClient(): void {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseAnonKey
    );
  }

  getSession(): Observable<Session | null> {
    return from(this.supabase.auth.getSession()).pipe(
      map(({ data }) => data?.session || null),
      catchError(({ message }) => throwError(new Error(message)))
    );
  }
}
