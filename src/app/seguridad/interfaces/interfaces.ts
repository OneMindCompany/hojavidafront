
export interface TokenResponse {
    token: string;
    expiration: Date;
}
export interface RegistroUsuario {
    Run: string,
    Password: string,
    ColegioId: number,
    PersonaId: number,
    RolId: string,
    Email:string
}
export interface Usuario {
    autenticado: boolean ;
    usuarioNombre: string ;
    colegioNombre: string ;
    colegioLogo:string;
    rol:string;
    colegioId:number
}
