const _ = require('lodash');
const { Parser } = require('expr-eval');
const { FormulaSource, FormulaValue, FormulaMutation } = require('@models');

class FinalCostService {
  call(ads, destinationCountry) {
    return new Promise((res, rej) => {
      Promise.all([
        FormulaSource.forDestinationCountry(destinationCountry),
        FormulaValue.all(),
        FormulaMutation.all(),
      ])
        .then((values) => {
          const [formulaSources, formulaValues, formulaMutations] = values;

          this.formulaSources = _.groupBy(formulaSources, 'country');
          this.values = _.groupBy(formulaValues, 'id');
          this.mutations = _.groupBy(formulaMutations, 'first_value_id');

          ads.forEach((ad) => {
            const valueId = _.at(this.formulaSources, [`[${ad.country_name}][0].value_id`])[0];

            if (valueId) ad.final_cost = this.adValueCalculator(ad)(valueId);
          });

          res(ads);
        })
        .catch(rej);
    });
  }

  adValueCalculator(ad) {
    const calculateValue = (currentValueId) => {
      const currentValue = this.values[currentValueId][0];
      const mutations = this.mutations[currentValueId] || [];

      let value = Parser.evaluate(currentValue.value, ad);
      const proccessedMutations = [];

      mutations.forEach((mutation) => {
        if (!mutation.acceptableFor(ad)) return;

        const secondValCalcResult = calculateValue(mutation.second_value_id);

        value = mutation.operation(value, secondValCalcResult.final_value);
        proccessedMutations.push({ type: mutation.type, second_value: secondValCalcResult });
      });

      return { final_value: value, ...currentValue, mutations: proccessedMutations };
    };

    return calculateValue;
  }
}

module.exports = FinalCostService;
