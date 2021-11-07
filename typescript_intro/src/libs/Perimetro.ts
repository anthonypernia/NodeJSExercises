
export class Perimetro {    
    cuadrado(lado:number):number {
        return lado * 4;
    }

    rectangulo(base: number, altura:number):number {
        return base * altura * 2;
    }
    circulo(radio: number): number {
        return Math.PI * radio * 2;
    }
}