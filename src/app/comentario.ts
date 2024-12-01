export interface Comentario {
  idComentario: number;
  conteudo: string;
  nomeUsuario?: string;
  avatarUsuario?: string;
  idUsuario: number;
  idProjeto: number;
  nomeProjeto?: string;
}