const { Op } = require("sequelize");
const models = require("../models");

class TblAccountRepository {
  static async findByCode({ login_code }) {
    try {
      const model = await models;
      const { tbl_account } = model;
      const result = await tbl_account.findOne({
        where: {
          [Op.and]: [{ login_code }, { status: null }],
        },
      });
      if (result === null || result.length === 0) return null;
      return result.dataValues;
    } catch (error) {
      console.log("TblAccountRepository --> findByCode --> error", error);
      throw error;
    }
  }

  static async findByAccIdBeforeInsert({ account_id }) {
    try {
      const model = await models;
      const { tbl_account } = model;
      const result = await tbl_account.findOne({
        where: {
          [Op.and]: [{ id:account_id }, { status: null }],
        },
      });
      if (result === null || result.length === 0) return null;
      return result.dataValues;
    } catch (error) {
      console.log(
        "TblAccountRepository --> findByAccIdBeforeInsert --> error",
        error
      );
      throw error;
    }
  }

}

module.exports = TblAccountRepository;
