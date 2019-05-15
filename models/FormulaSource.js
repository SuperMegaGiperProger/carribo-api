const BaseModel = require('@models/BaseModel');

class FormulaSource extends BaseModel {
  static forDestinationCountry(countryName) {
    return this.exec(
      'SELECT formula_sources.country, formulas.value_id FROM formula_sources'
      + ' INNER JOIN formulas ON formulas.id = formula_sources.formula_id'
      + ' WHERE formulas.country = ?',
      [countryName],
    );
  }
}

module.exports = FormulaSource;
