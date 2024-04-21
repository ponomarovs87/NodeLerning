const userModel = require("../models/user-model");

class UserService {
  async registration(email, password) {
    const candidate = await userModel.findOne({ email });
    if (candidate) {
      throw new Error(
        `Пользователь с почтовым адресом ${email} уже существует`,
      );
    }

    // const hash
    const user = await userModel.create({ email, password });
  }
}

module.exports = new UserService();
