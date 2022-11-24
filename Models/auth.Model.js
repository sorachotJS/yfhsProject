const createError = require("http-errors");
const db = require("../services/db")

module.exports = {
    login: async (code) => {
        return new Promise((resolve, reject) => {
          db.query(
            `
            SELECT id, hospital_code, role_code, zone_code, province_code, login_code, contact_id, status FROM tbl_account WHERE login_code = ?
                    `,[code],
            (err, rows) => {
              if (err) {
                reject(createError.InternalServerError());
              } else {
                resolve(rows);
              }
            }
          );
        });
      }
}