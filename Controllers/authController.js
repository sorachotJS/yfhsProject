//importing modules
const createError = require("http-errors");
const { login } = require("../Models/auth.Model");

module.exports = {
    login: async (req, res, next) => {
        try {
          const {code} = req.body;
          if (!code) throw createError.BadRequest();
    
          const result = await login(code);
    
          if (result.length === 0) throw createError.NotFound("DATA NOT FOUND!");
    
        //   const data = ({
        //     id, hospital_code, role_code, zone_code, province_code, login_code, contact_id, status
        //   } = result[0]);

          const {
            id, hospital_code, role_code, zone_code, province_code, login_code, contact_id, status
          } = result[0];
    
        //   const token = await signAccessToken({
        //     id
        //   });
    
          const data = {
            id,
            code: login_code,
            hospital_code, role_code, zone_code, province_code, login_code, contact_id, status,
          };
    
          res.send({
            status: 200,
            message: "login success",
            user: data,
            // token: req.token,
          });
        } catch (error) {
          next(error);
        }
      }
}