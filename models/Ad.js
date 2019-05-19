const Searchable = require('@models/Searchable');
const CurrencyService = require('@services/CurrencyService');

class Ad extends Searchable {
  get age() {
    const currentYear = new Date().getFullYear();

    return currentYear - this.year_of_production;
  }

  // HACK
  // TODO: refactor
  get eur() {
    return CurrencyService.eur;
  }
}

module.exports = Ad;
