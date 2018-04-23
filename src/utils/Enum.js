class Enum {
  constructor(description, number) {
    this.description = description;
    this.number = number;
  }

  toString() {
    return this.description;
  }

  get() {
    return this.number;
  }
}

module.exports = Enum;
