const { Parser } = require('expr-eval');
const BaseModel = require('@models/BaseModel');

class FormulaMutation extends BaseModel {
  static get OPERATIONS_MAPPING() {
    return {
      sum: (a, b) => +a + +b,
      sub: (a, b) => +a - +b,
      mul: (a, b) => +a * +b,
      div: (a, b) => +a / +b,
      min: Math.min,
      max: Math.max,
    };
  }

  get operation() {
    return this.constructor.OPERATIONS_MAPPING[this.type];
  }

  acceptableFor(ad) {
    return this.condition ? Parser.evaluate(this.condition, ad) : true;
  }
}

module.exports = FormulaMutation;
