const userService = require("../services/user.service");

exports.updateUserInfo = async (req, res, next) => {
  try {
    const { _id } = req.userInfo;
    const { type, date, partnerId } = req.body;

    const user = await userService.updateUserInfo(_id, type, partnerId, date);

    return res.status(200).json({
      result: "success",
      data: {
        user,
      }
    });
  } catch (error) {
    next(error);
  }
};
