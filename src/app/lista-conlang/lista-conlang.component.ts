import { Component, OnInit } from '@angular/core';
import { ConlangsService } from '../conlangs.service';
import { conlang } from '../lista-geral';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-lista-conlang',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './lista-conlang.component.html',
  styleUrl: './lista-conlang.component.css'
})
export class ListaConlangComponent implements OnInit {

  items: conlang[] = [];

  constructor(private service: ConlangsService) { }

  ngOnInit(): void {

    this.service.getConlangs().subscribe((resposta: conlang[]) => {
      this.items = resposta;
    });
  }

}
