const { Op } = require("sequelize");
const models = require("../models");
const TblAccountRepository = require("./TblAccountRepository");
const fs = require("fs");

class TblAssessmentRepository {
  static async insert({
    account_id,
    hospital_name,
    province_name,
    zone_name,
    answers,
    round,
    approve_status,
    hospital_submit,
    province_submit,
    zone_submit,
    admin_submit,
    status,
  }) {
    try {
      const model = await models;
      const { tbl_assessment } = model;
      return await tbl_assessment
        .create({
          account_id: account_id,
          hospital_name: hospital_name,
          province_name: province_name,
          zone_name: zone_name,
          answers: answers,
          round: round,
          approve_status: approve_status,
          hospital_submit: hospital_submit,
          province_submit: province_submit,
          zone_submit: zone_submit,
          admin_submit: admin_submit,
          status: status,
        })
        .then(function (tbl_assessment) {
          if (tbl_assessment) {
            return tbl_assessment;
          } else {
            response.status(400).send("Error in insert new record");
          }
        });
      //   if (result === null || result.length === 0) return null;
      //   return result.dataValues;
    } catch (error) {
      console.log("TblAssessmentRepository --> insert --> error", error);
      throw error;
    }
  }

  static async findByAccId({ account_id }) {
    try {
      const model = await models;
      const { tbl_assessment } = model;
      const result = await tbl_assessment.findOne({
        where: {
          [Op.and]: [{ account_id }, { status: "done" }],
        },
      });
      if (result === null || result.length === 0) {
        let hospital_name;
        let province_name;
        let zone_name;
        const resultBefore = await TblAccountRepository.findByAccIdBeforeInsert(
          { account_id }
        );
        if (resultBefore) {
          hospital_name = resultBefore.agency_name;
          province_name = resultBefore.province_name;
          zone_name = resultBefore.zone_name;
          //logger.authLogger.info("Info Success Search by " + account_id);
        } else {
          //logger.authLogger.warn("Warn UnSuccess Search by " + account_id);
        }
        console.log(this.findRound({ account_id }));
        let countRound = await this.findRound({ account_id });

        console.log(
          `Check Before : ${hospital_name},${province_name},${zone_name},${countRound}`
        );

        let rawdata = fs.readFileSync("./jsonMockup/dataMockUp.json");
        let answersJson = JSON.parse(rawdata);
        console.log(answersJson);

        return await tbl_assessment
          .create({
            account_id: account_id,
            hospital_name: hospital_name,
            province_name: province_name,
            zone_name: zone_name,
            answers: answersJson,
            round: countRound + 1,
            approve_status: 0,
            hospital_submit: null,
            province_submit: null,
            zone_submit: null,
            admin_submit: null,
            status: null,
          })
          .then(function (tbl_assessment) {
            if (tbl_assessment) {
              return tbl_assessment;
            } else {
              response.status(400).send("Error in insert new record");
            }
          });
      } else {
        console.log(result.dataValues);
        return result.dataValues;
      }
    } catch (error) {
      console.log("TblAccountRepository --> findByCode1111 --> error", error);
      throw error;
    }
  }

  //Search round from tbl_assessment
  static async findRound({ account_id }) {
    try {
      const model = await models;
      const { tbl_assessment } = model;
      const result = await tbl_assessment.findOne({
        where: {
          account_id: {
            [Op.eq]: account_id,
          },
        },
      });
      if (result === null || result.length === 0) return 0;
      console.log("Check Round : " + result.round);
      return result.round;
    } catch (error) {
      console.log("TblAccountRepository --> findByCode222 --> error", error);
      throw error;
    }
  }
}

module.exports = TblAssessmentRepository;
