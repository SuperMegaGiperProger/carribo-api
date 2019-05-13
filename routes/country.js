const { Country } = require('@models');

module.exports.readAll = (_, res) => {
  Country.all()
    .then(countries => res.status(200).json(countries))
    .catch(() => res.sendStatus(500));
};
