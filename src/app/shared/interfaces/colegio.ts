export class Colegio {
    id: number = 0;
    rbd: string = "0";
    nombre: string = "";
    email: string = "";
    telefono: string = "";
    direccion: string = "";
    logo: string = "";
    planSeguridadEscolar: string = "";
    reglamentoInterno: string = "";
    proyectoEducativo: string = "";
    planConvivenciaEscolar: string = "";
    comunaId: number = 0;
    comunaNombre: string = "";
    regionId: number = 0;
    logoArchivo: string = "";
    planSeguridadEscolarArchivo: string = "";
    reglamentoInternoArchivo: string = "";
    proyectoEducativoArchivo: string = "";
    planConvivenciaEscolarArchivo: string = "";
}

export class ColegioBase {
    id: number = 0;
    rbd: string = "0";
    nombre: string = "";
    comuna: string = "";
}