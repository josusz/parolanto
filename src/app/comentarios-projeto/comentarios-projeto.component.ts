import { Component, Input, OnInit } from '@angular/core';
import { ComentariosService } from '../comentarios.service';
import { Comentario } from '../comentario';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../usuario.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-comentarios-projeto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './comentarios-projeto.component.html',
  styleUrls: ['./comentarios-projeto.component.css']
})
export class ComentariosComponent implements OnInit {
  @Input() idProjeto!: number;  //id do projeto a ser passado para o componente
  comentarios: Comentario[] = [];
  comentarioForm: FormGroup;
  idUsuarioAutenticado: number | null = null;
  totalComentarios: number = 0;

  constructor(private comentariosService: ComentariosService, private usuarioService: UsuarioService, private fb: FormBuilder) {
    this.comentarioForm = this.fb.group({
      conteudo: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.usuarioService.getUsuarioAutenticado().subscribe({
      next: (usuario) => {
        this.idUsuarioAutenticado = usuario.id; //armazena o id do usuário autenticado
        if (this.idProjeto) {
          this.carregarComentarios();
          this.carregarContagemComentarios();
        }
      },
      error: (error) => {
        console.error('Erro ao obter usuário autenticado:', error);
      },
    });
  }

  carregarComentarios(): void {
    this.comentariosService.listarComentarios(this.idProjeto).subscribe({
      next: (response) => {
        this.comentarios = response.comentarios;
      },
      error: (err) => {
        console.error('Erro ao carregar comentários:', err);
      }
    });
  }

  adicionarComentario(): void {
    if (this.comentarioForm.valid) {
      const conteudo = this.comentarioForm.value.conteudo;
      this.comentariosService.adicionarComentario(this.idProjeto, conteudo).subscribe(response => {
        this.carregarComentarios();  //recarregar os comentários após adicionar
        this.carregarContagemComentarios();
        this.comentarioForm.reset();  //resetar o campo de comentário
      }, error => {
        console.error('Erro ao adicionar comentário:', error);
      });
    }
  }

  excluirComentario(idComentario: number): void {
    const comentario = this.comentarios.find(c => c.idComentario === idComentario);
    const confirmRemove = confirm(
      `Tem certeza de que deseja remover este comentário: "${comentario?.conteudo || 'Comentário não encontrado'}"?`
    );
    if (confirmRemove) {
      this.comentariosService.excluirComentario(idComentario).subscribe(response => {
        this.carregarComentarios();  //recarregar os comentários após excluir
        this.carregarContagemComentarios();
      }, error => {
        console.error('Erro ao excluir comentário:', error);
      });
    }
  }

  carregarContagemComentarios(): void {
    this.comentariosService.contarComentarios(this.idProjeto).subscribe({
      next: (total) => {
        this.totalComentarios = total;
      },
      error: (err) => {
        console.error('Erro ao contar comentários:', err);
      }
    });
  }
}