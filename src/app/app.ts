import { Component, signal, OnInit } from '@angular/core';
import { SupabaseService } from './supabase';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('niver');
   images: any[] = [];

  constructor(private supabaseService: SupabaseService) {}

  async ngOnInit() {
    this.images = await this.supabaseService.getImages();
  }
}
