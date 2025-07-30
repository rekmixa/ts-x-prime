// Класс комплексного числа
export class Complex {
  // Комплексное число представлено действительной (re) и мнимой (im) частью
  readonly re: number
  readonly im: number

  constructor(re: number, im: number = 0) {
    this.re = re
    this.im = im
  }

  // Сложение комплексных чисел: (a + bi) + (c + di) = (a+c) + (b+d)i
  add(o: Complex): Complex {
    return new Complex(this.re + o.re, this.im + o.im)
  }

  // Вычитание комплексных чисел: (a + bi) - (c + di) = (a-c) + (b-d)i
  sub(o: Complex): Complex {
    return new Complex(this.re - o.re, this.im - o.im)
  }

  // Умножение комплексных чисел:
  // (a + bi)(c + di) = (ac - bd) + (ad + bc)i
  mul(o: Complex): Complex {
    return new Complex(
      this.re * o.re - this.im * o.im,
      this.re * o.im + this.im * o.re,
    )
  }

  // Деление комплексных чисел:
  // (a+bi)/(c+di) = ((ac+bd) + (bc - ad)i) / (c^2 + d^2)
  div(o: Complex): Complex {
    const denom = o.re * o.re + o.im * o.im

    return new Complex(
      (this.re * o.re + this.im * o.im) / denom,
      (this.im * o.re - this.re * o.im) / denom,
    )
  }

  // Унарный минус (смена знака): -(a+bi) = -a - bi
  neg(): Complex {
    return new Complex(-this.re, -this.im)
  }

  // Модуль (абсолютное значение) комплексного числа: |a+bi| = sqrt(a^2 + b^2)
  abs(): number {
    return Math.hypot(this.re, this.im)
  }

  // Комплексное экспоненциальное возведение: e^(a+bi) = e^a (cos b + i sin b)
  exp(): Complex {
    const e = Math.exp(this.re)

    return new Complex(e * Math.cos(this.im), e * Math.sin(this.im))
  }

  // Комплексный логарифм:
  // ln(a+bi) = ln|a+bi| + i arg(a+bi)
  log(): Complex {
    return new Complex(Math.log(this.abs()), Math.atan2(this.im, this.re))
  }

  // Возведение в комплексную степень:
  // z^w = exp(w * ln(z))
  pow(o: Complex): Complex {
    return this.log().mul(o).exp()
  }

  // Комплексный синус по формуле:
  // sin(z) = (e^{iz} - e^{-iz}) / (2i)
  sin(): Complex {
    const i = new Complex(0, 1)
    const iz = i.mul(this) // i*z
    const e1 = iz.exp() // e^{iz}
    const e2 = iz.neg().exp() // e^{-iz}

    return e1.sub(e2).div(new Complex(0, 2)) // (e^{iz} - e^{-iz}) / 2i
  }

  // Вычитание действительного числа из действительной части комплексного
  subReal(x: number): Complex {
    return new Complex(this.re - x, this.im)
  }

  // Преобразование комплексного числа в строку
  // Округляем к нулю, если значение очень близко к нулю (меньше epsilon)
  // Форматируем с пробелами вокруг знака
  toString(epsilon: number = 1e-12): string {
    const re = Math.abs(this.re) < epsilon ? 0 : this.re
    const im = Math.abs(this.im) < epsilon ? 0 : this.im

    if (im === 0) return `${re}`
    if (re === 0) return `${im}i`

    return `${re} ${im < 0 ? '-' : '+'} ${Math.abs(im)}i`
  }
}
