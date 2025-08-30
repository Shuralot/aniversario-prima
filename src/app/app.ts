import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App implements OnInit {
  imgs: { url: string; name: string }[] = [];

  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      'https://csdfjkmtarhkgeuxkdam.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzZGZqa210YXJoa2dldXhrZGFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY1NzkyODksImV4cCI6MjA3MjE1NTI4OX0.VuqAPAbPdpC9E7Q3QY6twQCI1OOWRbxSwZhC3N7VBLk', // substitua pela sua chave pública
      { auth: { autoRefreshToken: false } } // evita o NavigatorLockAcquireTimeoutError
    );
  }

  async ngOnInit() {
  try {
    const { data, error } = await this.supabase
      .from('imgs')
      .select('link');

    if (error) {
      console.error('Erro ao buscar imagens:', error);
      return;
    }

    console.log('Data bruta do Supabase:', data);

    // Monta a URL completa garantindo que é string e sem espaços
    this.imgs = data.map((item: any) => ({
      url: item.link.toString().trim(),
      name: item.link.toString().trim()
    }));

    console.log('Imagens carregadas:', this.imgs);
  } catch (err) {
    console.error('Erro inesperado ao buscar imagens:', err);
  }
}

}
