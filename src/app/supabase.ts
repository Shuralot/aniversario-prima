import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../environments/environment'; // use seu env

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,   // URL do Supabase
      environment.supabaseKey    // anon key do Supabase
    );
  }

  // Pega todos os registros da tabela 'imgs'
  async getImages() {
    const { data, error } = await this.supabase
      .from('imgs')
      .select('*');

    if (error) {
      console.error('Erro ao buscar imagens:', error);
      return [];
    }

    return data;
  }
}
