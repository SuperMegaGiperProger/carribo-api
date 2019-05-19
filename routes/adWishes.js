const { AdWish } = require('@models');

function create(req, res) {
  const adId = req.params.ad_id;
  const userId = req.user.id;

  AdWish.create(adId, userId)
    .then(() => res.sendStatus(201))
    .catch(() => res.sendStatus(500));
}

function destroy(req, res) {
  const adId = req.params.ad_id;
  const userId = req.user.id;

  AdWish.delete(adId, userId)
    .then(() => res.sendStatus(204))
    .catch(() => res.sendStatus(500));
}

module.exports = {
  create,
  destroy,
};
