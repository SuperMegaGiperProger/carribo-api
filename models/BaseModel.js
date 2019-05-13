const mysql = require('mysql');
const dbConfig = require('@config/db');

class BaseModel {
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
}

module.exports = BaseModel;
