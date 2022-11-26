const createError = require("http-errors");
const db = require("../services/db")

module.exports = {
    login: async (code) => {
        return new Promise((resolve, reject) => {
          db.query(
            `
            SELECT id, zone_name, province_name, agency_name, hospital_code, hospital_level,role, position_name, full_name, department, office_phone, phone, email, line_id, status 
            FROM tbl_account 
            WHERE login_code = $1 and status ISNULL
                    `,
                    [code],
            (err, rows) => {
              if (err) {
                reject(createError.InternalServerError());
              } else {
                resolve(rows);
              }
            }
          );
        });
      },
      updateLoginStatus: async (id) => {
        return new Promise((resolve, reject) => {
          let dateTime = new Date();
          db.query(
            "update tbl_account set status=1 where id=$1",
            [id],
            (err, rows) => {
              if (err) {
                reject(createError.InternalServerError());
              } else {
                resolve(rows);
              }
            }
          );
        });
      },
      updateLogoutStatus: async (id) => {
        return new Promise((resolve, reject) => {
          let dateTime = new Date();
          db.query(
            "update tbl_account set status=1 where id=$1",
            [id],
            (err, rows) => {
              if (err) {
                reject(createError.InternalServerError());
              } else {
                resolve(rows);
              }
            }
          );
        });
      },
}