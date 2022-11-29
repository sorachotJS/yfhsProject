const JWT = require("jsonwebtoken");
const createError = require("http-errors");

module.exports = {
  signAccessToken: (data) => {
    return new Promise((resolve, reject) => {
      const payload = data;
      const secret = process.env.ACCESS_TOKEN_SECRET;
      const options = {
        expiresIn: "6h",
      };
      JWT.sign(payload, secret, options, (err, token) => {
        if (err) {
          // console.log(err.message)
          reject(createError.InternalServerError());
          return;
        }
        resolve(token);
      });
    });
  },
  verifyAccessToken: (req, res, next) => {
    if (!req.headers["authorization"]) return next(createError.Unauthorized());
    const authHeader = req.headers["authorization"];
    const bearerToken = authHeader.split(" ");
    const token = bearerToken[1];
    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, payload) => {
      if (err) {
        const message =
          err.name === "JsonWebTokenError" ? "Unauthorized" : err.message;
        return next(createError.Unauthorized(message));
      }
      const token = await module.exports.signAccessToken({
        id: payload.id,
        zone_name: payload.zone_name,
        province_name: payload.province_name,
        agency_name: payload.agency_name,
        hospital_code: payload.hospital_code,
        hospital_level: payload.hospital_level,
        login_code: payload.login_code,
        position_name: payload.position_name,
        full_name: payload.full_name,
        department: payload.department,
        office_phone: payload.office_phone,
        phone: payload.phone,
        email: payload.email,
        line_id: payload.line_id,
        status: payload.status,
      });
      console.log(payload);
      req.payload = payload;
      req.token = token;
      next();
    });
  },
};
