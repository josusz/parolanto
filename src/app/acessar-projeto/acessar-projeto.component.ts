import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { projeto_detail } from '../projeto_detail';
import { ConlangsService } from '../conlangs.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-acessar-projeto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './acessar-projeto.component.html',
  styleUrl: './acessar-projeto.component.css'
})
export class AcessarProjetoComponent {
  projeto!: projeto_detail;
  id!: number;

  constructor(private route: ActivatedRoute, private service: ConlangsService) { }

  ngOnInit(): void {
    
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    
    this.service.detailConlang(this.id).subscribe((resposta: projeto_detail) => {
      this.projeto = resposta;
    });
  }
}
