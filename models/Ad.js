const Searchable = require('@models/Searchable');

class Ad extends Searchable {
  static create(args) {
    return new Promise((res, rej) => {
      const fields = Object.keys(args);

      this.exec(
        `INSERT INTO ads (${fields.join(', ')}) VALUES (${fields.map(() => '?').join(', ')});`,
        Object.values(args),
        (err, result) => {
          if (err) {
            rej(err);
          } else {
            res({ id: result.insertId });
          }
        },
      );
    });
  }

  static delete(id) {
    return new Promise((res, rej) => {
      this.exec('DELETE FROM ads WHERE ads.id = ?', [id], (error) => {
        if (error) {
          rej(error);
        } else {
          res();
        }
      });
    });
  }
}

module.exports = Ad;
