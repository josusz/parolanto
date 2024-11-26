import { Component, Input, OnInit } from '@angular/core';
import { ComentariosService } from '../comentarios.service';
import { Comentario } from '../comentario';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-comentarios-projeto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './comentarios-projeto.component.html',
  styleUrls: ['./comentarios-projeto.component.css']
})
export class ComentariosComponent implements OnInit {
  @Input() idProjeto!: number;  //id do projeto a ser passado para o componente
  comentarios: Comentario[] = [];
  comentarioForm: FormGroup;

  constructor(private comentariosService: ComentariosService, private fb: FormBuilder) {
    this.comentarioForm = this.fb.group({
      conteudo: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.idProjeto) {
      this.carregarComentarios();
    }
  }

  carregarComentarios(): void {
    this.comentariosService.listarComentarios(this.idProjeto).subscribe(response => {
      this.comentarios = response.comentarios;
    });
  }

  adicionarComentario(): void {
    if (this.comentarioForm.valid) {
      const conteudo = this.comentarioForm.value.conteudo;
      this.comentariosService.adicionarComentario(this.idProjeto, conteudo).subscribe(response => {
        this.carregarComentarios();  //recarregar os comentários após adicionar
        this.comentarioForm.reset();  //resetar o campo de comentário
      }, error => {
        console.error('Erro ao adicionar comentário:', error);
      });
    }
  }

  excluirComentario(idComentario: number): void {
    this.comentariosService.excluirComentario(idComentario).subscribe(response => {
      this.carregarComentarios();  //recarregar os comentários após excluir
    }, error => {
      console.error('Erro ao excluir comentário:', error);
    });
  }
}