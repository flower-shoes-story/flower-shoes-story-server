const User = require("../models/User");
const Couple = require("../models/Couple");

const { TYPE } = require("../constants");

exports.findUser = async (userInfo) => {
  const { email } = userInfo;

  try {
    return await User.findOne({ email }).populate("couple").exec();
  } catch (error) {
    throw error;
  }
};

exports.findPartner = async (email) => {
  try {
    return await User.findOne({ partner_id: email }).populate("couple").exec();
  } catch (error) {
    throw error;
  }
};

exports.updateUserInfo = async (_id, type, partnerId, date) => {
  try {
    const user = await User.findById(_id).populate("couple").exec();

    if (!user.couple && !user.partner_id) {
      const events = {
        anniversary: [date],
      };

      const couple = await Couple.create({ events });

      user.couple = couple._id;
      user.partner_id = partnerId;
      user.type = type;
      user.type === TYPE.SOLDIER ? couple.soldier = user._id : couple.gomsin = user._id;

      await couple.save();
    }

    if (!user.couple && user.partner_id) {
      const partner = await User.findOne({ email: user.partner_id }).populate("couple").exec();
      const couple = await Couple.findById(partner.couple._id);

      user.couple = partner.couple._id;
      user.type === TYPE.SOLDIER ? couple.soldier = user._id : couple.gomsin = user._id;
      user.is_matched = true;
      partner.is_matched = true;

      await couple.save();
      await partner.save();
    }

    await user.save();

    return user;
  } catch (error) {
    throw error;
  }
};
