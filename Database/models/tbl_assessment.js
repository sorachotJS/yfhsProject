
const model = (Sequelize, DataTypes) => {
    const tblAssessment = Sequelize.define(
      "tbl_assessment",
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        account_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        hospital_name: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        province_name: {
            type: DataTypes.STRING,
            allowNull: true,
          },
        zone_name: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        answers: {
          type: DataTypes.JSON,
          allowNull: true,
        },
        round: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        approve_status: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        hospital_submit: {
          type: DataTypes.JSON,
          allowNull: true,
        },
        province_submit: {
          type: DataTypes.JSON,
          allowNull: true,
        },
        zone_submit: {
          type: DataTypes.JSON,
          allowNull: true,
        },
        admin_submit: {
          type: DataTypes.JSON,
          allowNull: true,
        },
  
        status: {
          type: DataTypes.STRING,
          allowNull: true,
        }
      },
      {
        tableName: "tbl_assessment",
        createdAt: false,
        updatedAt: false,
      }
    );
  
    return tblAssessment;
  };
  
  module.exports = model;













