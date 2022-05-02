export class Drug {
  constructor(name, expiresIn, benefit) {
    this.name = name;
    this.expiresIn = expiresIn;
    this.benefit = benefit;
  }

  get degradationRate() {
    switch (this.name) {
      case "Herbal Tea":
        return -1;

      case "Magic Pill":
        return 0;

      case "Fervex":
        if (this.expiresIn <= 0) {
          return this.benefit / 2;
        } else if (this.expiresIn <= 5) {
          return -3;
        } else if (this.expiresIn <= 10) {
          return -2;
        } else {
          return -1;
        }

      case "Dafalgan":
        return 2;

      default:
        return 1;
    }
  }
  get expireRate() {
    if (["Magic Pill", "toto", "foo"].includes(this.name)) {
      return 0;
    }
    return 1;
  }

  updateBenefit() {
    this.benefit -=
      this.expiresIn <= 0 ? 2 * this.degradationRate : this.degradationRate;

    if (this.benefit < 0) {
      this.benefit = 0;
    } else if (this.benefit > 50) {
      this.benefit = 50;
    }
  }
  updateExpiresIn() {
    this.expiresIn -= this.expireRate;
  }
}

export class Pharmacy {
  constructor(drugs = []) {
    this.drugs = drugs;
  }
  updateBenefitValue() {
    for (var i = 0; i < this.drugs.length; i++) {
      this.drugs[i].updateBenefit();
      this.drugs[i].updateExpiresIn();
    }

    return this.drugs;
  }
}
