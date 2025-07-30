/**
 * Вычисляет наибольший общий делитель (НОД) чисел a и b
 * с помощью алгоритма Евклида
 * @param a - первое число
 * @param b - второе число
 * @returns наибольший общий делитель a и b
 */
declare function gcd(a: number, b: number): number;
declare function isPerfectPower(number: number): boolean;

declare function sieveToPrimes(sieve: boolean[]): number[];
declare function generateSieve(max: number): boolean[];
declare function isPrimeSieve(number: number, sieve: boolean[]): boolean;
declare function isPrime(number: number): boolean;

declare function addPolynomials(a: number[], b: number[], modulus: number): number[];
declare function multiplyPolynomials(a: number[], b: number[], modulus: number, polyModDegree: number): number[];
declare function modularPolynomialExponentiation(basePoly: number[], exponent: number, modulus: number, polyModDegree: number): number[];
declare function findCandidateR(number: number, maxExponent: number): number;
declare function checkPolynomialCongruence(number: number, candidateR: number): boolean;
declare function isPrimeAKS(number: number): boolean;

declare class Complex {
    readonly re: number;
    readonly im: number;
    constructor(re: number, im?: number);
    add(o: Complex): Complex;
    sub(o: Complex): Complex;
    mul(o: Complex): Complex;
    div(o: Complex): Complex;
    neg(): Complex;
    abs(): number;
    exp(): Complex;
    log(): Complex;
    pow(o: Complex): Complex;
    sin(): Complex;
    subReal(x: number): Complex;
    toString(epsilon?: number): string;
}

declare function zetaReal(s: number, terms?: number, debug?: boolean): number;
declare function zetaEuler(s: number, sieveMax?: number, debug?: boolean): number;
declare function gamma(z: Complex): Complex;
declare function eta(s: Complex, terms: number): Complex;
declare function zeta(s: Complex, terms?: number): Complex;

export { Complex, addPolynomials, checkPolynomialCongruence, eta, findCandidateR, gamma, gcd, generateSieve, isPerfectPower, isPrime, isPrimeAKS, isPrimeSieve, modularPolynomialExponentiation, multiplyPolynomials, sieveToPrimes, zeta, zetaEuler, zetaReal };
