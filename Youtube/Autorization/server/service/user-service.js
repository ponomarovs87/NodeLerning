require("dotenv").config();
const ApiError = require("../exceptions/api-errors");

const userModel = require("../models/user-model");
const bcript = require("bcrypt");
const uuid = require("uuid");
const mailServise = require("./mail-servise");
const tokenService = require("./token-service");
const UserDto = require("../dtos/user-dto");

class UserService {
  async registration(email, password) {
    const candidate = await userModel.findOne({ email });
    if (candidate) {
      throw ApiError.BadRequest(
        `Пользователь с почтовым адресом ${email} уже существует`,
      );
    }

    const hashpasword = await bcript.hash(password, 3);
    const activationLink = uuid.v4();

    const user = await userModel.create({
      email,
      password: hashpasword,
      activationLink,
    });
    await mailServise.sendActivationMail(
      email,
      `${process.env.API_URL}/api/activate/${activationLink}`,
    );

    const userDto = new UserDto(user);
    const tokens = tokenService.generateToken({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }
  async activation(activationLink) {
    const user = await userModel.findOne({ activationLink });
    if (!user) {
      throw ApiError.BadRequest(`неверная ссылка активации`);
    }
    user.isActivated = true;
    await user.save();
  }
}

module.exports = new UserService();
