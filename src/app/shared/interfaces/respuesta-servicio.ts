export interface Respuesta<T> {
    estado: string;
    mensaje: string;
    valor: T;
}