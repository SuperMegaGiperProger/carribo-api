const mysql = require('mysql');
const dbConfig = require('@config/db');
const pluralize = require('pluralize');
const _ = require('lodash');

class BaseModel {
  constructor(args) {
    Object.assign(this, args);
  }

  static get connection() {
    this._connection = this._connection || mysql.createConnection(dbConfig);

    this._connection.on('enqueue', this.logQuery);

    return this._connection;
  }

  static exec(query, ...args) {
    return this.connection.query(query, ...args);
  }

  static escape(variable) {
    return this.connection.escape(variable);
  }

  static logQuery(sequence) {
    if (sequence.constructor.name === 'Query') {
      console.log('\x1b[36m%s\x1b[0m', sequence.sql);
    }
  }

  static get tableName() {
    this._tableName = this._tableName || pluralize(_.snakeCase(this.name));

    return this._tableName;
  }

  static all() {
    return new Promise((res, rej) => {
      this.exec(`SELECT * FROM ${this.tableName}`, (err, result) => {
        if (err) rej(err);
        else res(result.map(args => new this(args)));
      });
    });
  }

  static create(args) {
    return new Promise((res, rej) => {
      const fields = Object.keys(args);

      this.exec(
        `INSERT INTO ${this.tableName} (${fields.join(', ')}) VALUES (${fields.map(() => '?').join(', ')});`,
        Object.values(args),
        (err, result) => {
          if (err) rej(err);
          else res({ id: result.insertId });
        },
      );
    });
  }

  static delete(id) {
    return new Promise((res, rej) => {
      this.exec(`DELETE FROM ${this.tableName} WHERE id = ?`, [id], (err) => {
        if (err) rej(err);
        else res();
      });
    });
  }
}

module.exports = BaseModel;
