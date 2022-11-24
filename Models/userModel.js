const createError = require("http-errors");
const db = require("../services/db")

module.exports = {
    login: async () => {
        return new Promise((resolve, reject) => {
          db.query(
            `
            SELECT  dept, hospital_code, userid, login_code, username_reg, position_name, dept_phone, mobile_phone, email, line_id
            FROM user_yfhs;
                    `,
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