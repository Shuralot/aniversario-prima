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
  imgs: { url: string; name: string; text: string }[] = [];
  selectedImage = '';
  

  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      'https://csdfjkmtarhkgeuxkdam.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzZGZqa210YXJoa2dldXhrZGFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY1NzkyODksImV4cCI6MjA3MjE1NTI4OX0.VuqAPAbPdpC9E7Q3QY6twQCI1OOWRbxSwZhC3N7VBLk',
      { auth: { autoRefreshToken: false } }
    );
  }

  async ngOnInit() {
  try {
    const { data, error } = await this.supabase
      .from('imgs')
      .select('id, link, text')   // seleciona também o id para ordenar
      .order('id', { ascending: true }); // ordena pelo id

    if (error) {
      console.error('Erro ao buscar imagens:', error);
      return;
    }

    this.imgs = data.map((item: any) => ({
      url: item.link.toString().trim(),
      name: item.link.toString().trim(),
      text: item.text
    }));

  } catch (err) {
    console.error('Erro inesperado ao buscar imagens:', err);
  }
}




}
