export interface loginUsuarioResponse {
    message: string;
    access_token: string;
    usuario: {
        id: number;
        nome: string;
        email: string;
    };
}