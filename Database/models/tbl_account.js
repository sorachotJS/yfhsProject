const model = (Sequelize, DataTypes) => {
  const tblAccount = Sequelize.define(
    "tbl_account",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      zone_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      province_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      agency_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      hospital_code: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      hospital_level: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      login_code: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      department: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      full_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      office_phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      line_id: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "tbl_account",
      createdAt: false,
      updatedAt: false,
    }
  );

  return tblAccount;
};

module.exports = model;
