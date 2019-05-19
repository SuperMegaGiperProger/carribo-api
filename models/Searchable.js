const BaseModel = require('@models/BaseModel');

const OPERATIONS_MAPPING = {
  gt: '>',
  lt: '<',
  gteq: '>=',
  lteq: '<=',
  eq: '=',
  in: 'IN',
  like: 'LIKE',
};

class Searchable extends BaseModel {
  static toSearchQuery(searchParamsObject) {
    const params = Object.keys(searchParamsObject);
    let query = '';

    const getConditionQuery = (param, condition) => {
      const operation = OPERATIONS_MAPPING[condition[0]];
      let value;
      switch (operation) {
        case 'IN': {
          value = '(';
          const { length } = condition[1];
          condition[1].forEach((element, i) => {
            value = i + 1 === length ? value.concat(`'${element}')`) : value.concat(`'${element}', `);
          });
          break;
        }

        case 'LIKE':
          value = `'%${condition[1]}%'`;
          break;

        default:
          value = typeof condition[1] === 'number' ? +condition[1] : `'${condition[1]}'`;
          break;
      }

      return `${param} ${operation} ${value}`; // TODO: escape value
    };

    const paramsNumber = params.length;

    params.forEach((param, index) => {
      const operations = searchParamsObject[param];
      const conditions = Object.entries(operations);
      const conditionsNumber = conditions.length;

      conditions.forEach((condition, i) => {
        const queryOperation = index + 1 === paramsNumber && i + 1 === conditionsNumber ? '' : 'AND ';
        const conditionQuery = getConditionQuery(param, condition);
        query = query.concat(`${conditionQuery} ${queryOperation}`);
      });
    });

    return query;
  }
}

module.exports = Searchable;
