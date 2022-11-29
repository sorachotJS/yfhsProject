//importing modules
const createError = require("http-errors");
const { getUser } = require("../Models/userModel");

module.exports = {
    getAllUser: async (req, res, next) => {
        try {
        //   const {id} = req.params;
        //   if (!id) throw createError.BadRequest();
    
          const result = await getUser();
    
          if (result.length === 0) throw createError.NotFound("DATA NOT FOUND!");
    
          const data = ({
            dept, hospital_code, userid, login_code, username_reg, position_name, dept_phone, mobile_phone, email, line_id,
          } = result);
    
          res.send({
            status: 200,
            message: "LOAD DATA SUCCESS",
            dataList: data,
            // token: req.token,
          });
        } catch (error) {
          next(error);
        }
      }
}