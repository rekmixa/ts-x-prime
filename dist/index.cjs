"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  Complex: () => Complex,
  addPolynomials: () => addPolynomials,
  checkPolynomialCongruence: () => checkPolynomialCongruence,
  eta: () => eta,
  findCandidateR: () => findCandidateR,
  gamma: () => gamma,
  gcd: () => gcd,
  generateSieve: () => generateSieve,
  isPerfectPower: () => isPerfectPower,
  isPrime: () => isPrime,
  isPrimeAKS: () => isPrimeAKS,
  isPrimeSieve: () => isPrimeSieve,
  modularPolynomialExponentiation: () => modularPolynomialExponentiation,
  multiplyPolynomials: () => multiplyPolynomials,
  sieveToPrimes: () => sieveToPrimes,
  zeta: () => zeta,
  zetaEuler: () => zetaEuler,
  zetaReal: () => zetaReal
});
module.exports = __toCommonJS(index_exports);

// src/basics.ts
function gcd(a, b) {
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}
function isPerfectPower(number) {
  for (let exponent = 2; exponent <= Math.log2(number); exponent++) {
    const approxBase = Math.pow(number, 1 / exponent);
    if (Math.round(Math.pow(Math.round(approxBase), exponent)) === number) {
      return true;
    }
  }
  return false;
}

// src/prime-numbers.ts
function sieveToPrimes(sieve) {
  return sieve.reduce((carry, isPrime2, number) => {
    if (isPrime2) {
      carry.push(number);
    }
    return carry;
  }, []);
}
function generateSieve(max) {
  const sieve = new Array(max + 1).fill(true);
  sieve[0] = false;
  sieve[1] = false;
  for (let i = 2; i * i <= max; i++) {
    if (sieve[i]) {
      for (let j = i * i; j <= max; j += i) {
        sieve[j] = false;
      }
    }
  }
  return sieve;
}
function isPrimeSieve(number, sieve) {
  return sieve[number] || false;
}
function isPrime(number) {
  if (!Number.isInteger(number)) {
    return false;
  }
  if (number <= 1) {
    return false;
  }
  if (number <= 3) {
    return true;
  }
  if (number % 2 === 0 || number % 3 === 0) {
    return false;
  }
  if (number < 25) {
    return number === 5 || number === 7 || number === 11 || number === 13 || number === 17 || number === 19 || number === 23;
  }
  if (number % 5 === 0 || number % 7 === 0) {
    return false;
  }
  for (let i = 11; i * i <= number; i += 6) {
    if (number % i === 0 || number % (i + 2) === 0) {
      return false;
    }
  }
  return true;
}

// src/prime-numbers-aks.ts
function addPolynomials(a, b, modulus) {
  const length = Math.max(a.length, b.length);
  const result = Array(length).fill(0);
  for (let i = 0; i < length; i++) {
    const ai = i < a.length ? a[i] : 0;
    const bi = i < b.length ? b[i] : 0;
    result[i] = (ai + bi) % modulus;
  }
  return result;
}
function multiplyPolynomials(a, b, modulus, polyModDegree) {
  const result = Array(polyModDegree).fill(0);
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < b.length; j++) {
      const deg = (i + j) % polyModDegree;
      result[deg] = (result[deg] + a[i] * b[j]) % modulus;
    }
  }
  return result;
}
function modularPolynomialExponentiation(basePoly, exponent, modulus, polyModDegree) {
  let result = [1];
  let base = basePoly;
  let exp = exponent;
  while (exp > 0) {
    if (exp % 2 === 1) {
      result = multiplyPolynomials(result, base, modulus, polyModDegree);
    }
    base = multiplyPolynomials(base, base, modulus, polyModDegree);
    exp = Math.floor(exp / 2);
  }
  return result;
}
function findCandidateR(number, maxExponent) {
  let candidateR = 2;
  while (candidateR < number) {
    let hasLargeOrder = true;
    for (let exponentK = 1; exponentK <= maxExponent; exponentK++) {
      if (Math.pow(number, exponentK) % candidateR === 1) {
        hasLargeOrder = false;
        break;
      }
    }
    if (hasLargeOrder) {
      if (gcd(number, candidateR) === 1) {
        break;
      }
    }
    candidateR++;
  }
  return candidateR;
}
function checkPolynomialCongruence(number, candidateR) {
  const log2Number = Math.log2(number);
  const maxTestBase = Math.floor(Math.sqrt(candidateR) * log2Number);
  for (let testBase = 1; testBase <= maxTestBase; testBase++) {
    const basePoly = [testBase, 1];
    const leftPoly = modularPolynomialExponentiation(
      basePoly,
      number,
      number,
      candidateR
    );
    const rightPoly = Array(candidateR).fill(0);
    rightPoly[0] = testBase;
    rightPoly[number % candidateR] = 1;
    for (let i = 0; i < candidateR; i++) {
      if (leftPoly[i] !== rightPoly[i]) {
        return false;
      }
    }
  }
  return true;
}
function isPrimeAKS(number) {
  if (!Number.isInteger(number)) {
    return false;
  }
  if (number <= 1) {
    return false;
  }
  if (number === 2) {
    return true;
  }
  if (isPerfectPower(number)) {
    return false;
  }
  const log2Number = Math.log2(number);
  const maxExponent = Math.pow(log2Number, 2);
  const candidateR = findCandidateR(number, maxExponent);
  for (let testDivisor = 2; testDivisor <= Math.min(candidateR, number - 1); testDivisor++) {
    if (gcd(number, testDivisor) > 1) {
      return false;
    }
  }
  if (number <= candidateR) {
    return true;
  }
  return checkPolynomialCongruence(number, candidateR);
}

// src/complex.ts
var Complex = class _Complex {
  constructor(re, im = 0) {
    this.re = re;
    this.im = im;
  }
  // Сложение комплексных чисел: (a + bi) + (c + di) = (a+c) + (b+d)i
  add(o) {
    return new _Complex(this.re + o.re, this.im + o.im);
  }
  // Вычитание комплексных чисел: (a + bi) - (c + di) = (a-c) + (b-d)i
  sub(o) {
    return new _Complex(this.re - o.re, this.im - o.im);
  }
  // Умножение комплексных чисел:
  // (a + bi)(c + di) = (ac - bd) + (ad + bc)i
  mul(o) {
    return new _Complex(
      this.re * o.re - this.im * o.im,
      this.re * o.im + this.im * o.re
    );
  }
  // Деление комплексных чисел:
  // (a+bi)/(c+di) = ((ac+bd) + (bc - ad)i) / (c^2 + d^2)
  div(o) {
    const denom = o.re * o.re + o.im * o.im;
    return new _Complex(
      (this.re * o.re + this.im * o.im) / denom,
      (this.im * o.re - this.re * o.im) / denom
    );
  }
  // Унарный минус (смена знака): -(a+bi) = -a - bi
  neg() {
    return new _Complex(-this.re, -this.im);
  }
  // Модуль (абсолютное значение) комплексного числа: |a+bi| = sqrt(a^2 + b^2)
  abs() {
    return Math.hypot(this.re, this.im);
  }
  // Комплексное экспоненциальное возведение: e^(a+bi) = e^a (cos b + i sin b)
  exp() {
    const e = Math.exp(this.re);
    return new _Complex(e * Math.cos(this.im), e * Math.sin(this.im));
  }
  // Комплексный логарифм:
  // ln(a+bi) = ln|a+bi| + i arg(a+bi)
  log() {
    return new _Complex(Math.log(this.abs()), Math.atan2(this.im, this.re));
  }
  // Возведение в комплексную степень:
  // z^w = exp(w * ln(z))
  pow(o) {
    return this.log().mul(o).exp();
  }
  // Комплексный синус по формуле:
  // sin(z) = (e^{iz} - e^{-iz}) / (2i)
  sin() {
    const i = new _Complex(0, 1);
    const iz = i.mul(this);
    const e1 = iz.exp();
    const e2 = iz.neg().exp();
    return e1.sub(e2).div(new _Complex(0, 2));
  }
  // Вычитание действительного числа из действительной части комплексного
  subReal(x) {
    return new _Complex(this.re - x, this.im);
  }
  // Преобразование комплексного числа в строку
  // Округляем к нулю, если значение очень близко к нулю (меньше epsilon)
  // Форматируем с пробелами вокруг знака
  toString(epsilon = 1e-12) {
    const re = Math.abs(this.re) < epsilon ? 0 : this.re;
    const im = Math.abs(this.im) < epsilon ? 0 : this.im;
    if (im === 0) return `${re}`;
    if (re === 0) return `${im}i`;
    return `${re} ${im < 0 ? "-" : "+"} ${Math.abs(im)}i`;
  }
};

// src/zeta.ts
function zetaReal(s, terms = 1e4, debug = false) {
  if (s <= 1) {
    throw new Error("This simple method only works for s > 1");
  }
  let sum = 0;
  for (let n = 1; n <= terms; n++) {
    const m = 1 / Math.pow(n, s);
    sum += m;
    if (debug) {
      console.log(`n = ${n}, m = ${m}, sum = ${sum}`);
    }
  }
  return sum;
}
function zetaEuler(s, sieveMax = 1e4, debug = false) {
  if (s <= 1) {
    throw new Error("zetaEuler is only valid for s > 1");
  }
  const sieve = generateSieve(sieveMax);
  const primes = sieveToPrimes(sieve);
  if (debug) {
    console.log(`primes count: ${primes.length}`);
  }
  let product = 1;
  for (const p of primes) {
    const m = 1 / (1 - Math.pow(p, -s));
    product *= m;
    if (debug) {
      console.log(`p = ${p}, m = ${m}, product = ${product}`);
    }
  }
  return product;
}
function gamma(z) {
  const p = [
    676.5203681218851,
    -1259.1392167224028,
    771.3234287776531,
    -176.6150291621406,
    12.507343278686905,
    -0.13857109526572012,
    9984369578019572e-21,
    15056327351493116e-23
  ];
  const g = 7;
  if (z.re < 0.5) {
    const piC = new Complex(Math.PI, 0);
    return piC.div(
      piC.mul(z).sin().mul(gamma(new Complex(1, 0).sub(z)))
    );
  }
  let x = new Complex(0.9999999999998099, 0);
  let z1 = z.sub(new Complex(1, 0));
  for (let i = 0; i < p.length; i++) {
    x = x.add(new Complex(p[i], 0).div(z1.add(new Complex(i + 1, 0))));
  }
  const t = z1.add(new Complex(g + 0.5, 0));
  const sqrtTwoPi = Math.sqrt(2 * Math.PI);
  return new Complex(sqrtTwoPi, 0).mul(t.pow(z1.add(new Complex(0.5, 0)))).mul(x).mul(t.neg().exp());
}
function eta(s, terms) {
  let sum = new Complex(0, 0);
  for (let n = 1; n <= terms; n++) {
    const sign = n % 2 === 0 ? -1 : 1;
    const term = new Complex(n, 0).pow(s.neg()).mul(new Complex(sign, 0));
    sum = sum.add(term);
  }
  return sum;
}
function zeta(s, terms = 1e4) {
  if (Math.abs(s.subReal(1).abs()) < 1e-12) {
    throw new Error("Pole of the zeta function at s = 1");
  }
  if (s.re > 0) {
    const etaVal = eta(s, terms);
    const two = new Complex(2, 0);
    const denom = new Complex(1, 0).sub(two.pow(new Complex(1, 0).sub(s)));
    return etaVal.div(denom);
  } else {
    const piC = new Complex(Math.PI, 0);
    const one = new Complex(1, 0);
    const oneMinusS = one.sub(s);
    const zetaMirror = zeta(oneMinusS, terms);
    const sinTerm = s.mul(piC).mul(new Complex(0.5, 0)).sin();
    const gammaTerm = gamma(oneMinusS);
    const two = new Complex(2, 0);
    const front = two.pow(s).mul(piC.pow(s.sub(one))).mul(sinTerm).mul(gammaTerm);
    return front.mul(zetaMirror);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Complex,
  addPolynomials,
  checkPolynomialCongruence,
  eta,
  findCandidateR,
  gamma,
  gcd,
  generateSieve,
  isPerfectPower,
  isPrime,
  isPrimeAKS,
  isPrimeSieve,
  modularPolynomialExponentiation,
  multiplyPolynomials,
  sieveToPrimes,
  zeta,
  zetaEuler,
  zetaReal
});
