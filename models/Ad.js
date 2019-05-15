const Searchable = require('@models/Searchable');

class Ad extends Searchable {
  get age() {
    const currentYear = new Date().getFullYear();

    return currentYear - this.year_of_production;
  }
}

module.exports = Ad;
