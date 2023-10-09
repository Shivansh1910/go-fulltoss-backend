require("dotenv").config();
const { validationResult } = require("express-validator");
const Error = require("../exceptions/error");
const ValidateError = Error.ValidateError;

const models = require("../models");

const activeCampaigns = async (req, res) => {
  const methodName = "[activeCampaigns] : ";
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new ValidateError(errors.array()[0].msg);
    }

    const campaign = await models["Campaign"].findAll({
      where: {
        active: true,
      },
    });

    return res.status(200).json({
      status: true,
      msg: "Active campaigns found",
      data: campaign,
    });
  } catch (e) {
    Error.res(res, e);
  }
};

const registerUser = async (req, res) => {
  const methodName = "[registerUser] : ";
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new ValidateError(errors.array()[0].msg);
    }

    const { email, name } = req.body;

    const [user, created] = await models["User"].findOrCreate({
      where: {
        email,
        name,
      },
      attributes: ["id", "email", "name"],
    });

    if (!created) {
      return res.status(200).json({
        status: false,
        msg: "User already exists",
        data: {},
      });
    }

    return res.status(200).json({
      status: true,
      msg: "User registered successfully",
      data: user,
    });
  } catch (e) {
    Error.res(res, e);
  }
};

const getUser = async (req, res) => {
  const methodName = "[getUser] : ";
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new ValidateError(errors.array()[0].msg);
    }

    const { email } = req.params;

    const user = await models["User"].findOne({
      where: {
        email,
      },
      attributes: ["id", "email", "name", "wallet"],
    });

    if (!user) {
      return res.status(200).json({
        status: false,
        msg: "User does not exists",
        data: {},
      });
    }

    return res.status(200).json({
      status: true,
      msg: "User found",
      data: user,
    });
  } catch (e) {
    Error.res(res, e);
  }
};

const getCampain = async (req, res) => {
  const methodName = "[getCampain] : ";
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new ValidateError(errors.array()[0].msg);
    }

    const { id } = req.params;

    const campaign = await models["Campaign"].findOne({
      where: {
        id,
      },
      attributes: [
        "id",
        "campaignName",
        "campaignQuestions",
        "active",
        "activeDateTime",
      ],
    });

    if (!campaign) {
      return res.status(200).json({
        status: false,
        msg: "Campaign does not exists",
        data: {},
      });
    }

    const questions = await models["Question"].findAll({
      where: {
        id: campaign.campaignQuestions,
      },
      attributes: ["id", "question", "options"],
    });

    return res.status(200).json({
      status: true,
      msg: "Campaign found",
      data: {
        campaign,
        questions,
      },
    });
  } catch (e) {
    Error.res(res, e);
  }
};

const submitResponse = async (req, res) => {
  const methodName = "[submitResponse] : ";
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new ValidateError(errors.array()[0].msg);
    }

    const { email, campaign_id, response } = req.body;

    const user = await models["User"].findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(200).json({
        status: false,
        msg: "User does not exists",
        data: {},
      });
    }

    const campaign = await models["Campaign"].findOne({
      where: {
        id: campaign_id,
      },
    });

    if (!campaign) {
      return res.status(200).json({
        status: false,
        msg: "Campaign does not exists",
        data: {},
      });
    }

    const [campaignResponse, created] = await models[
      "CampaignResponse"
    ].findOrCreate({
      where: { user_id: user.id, campaign_id: campaign.id },
      defaults: {
        response,
      },
    });

    if (!created) {
      return res.status(200).json({
        status: false,
        msg: "Response already exists",
        data: {},
      });
    }

    return res.status(200).json({
      status: true,
      msg: "Response submitted successfully",
      data: {},
    });
  } catch (e) {
    Error.res(res, e);
  }
};

const getParticipatedCampaigns = async (req, res) => {
  const methodName = "[getParticipatedCampaigns] : ";
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new ValidateError(errors.array()[0].msg);
    }

    const { email } = req.params;

    const user = await models["User"].findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(200).json({
        status: false,
        msg: "User does not exists",
        data: {},
      });
    }

    const campaigns = await models["CampaignResponse"].findAll({
      where: {
        user_id: user.id,
      },
      include: [{ model: models["Campaign"] }],
      attributes: ["id", "campaign_id", "createdAt"],
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({
      status: true,
      msg: "Campaigns found",
      data: campaigns,
    });
  } catch (e) {
    Error.res(res, e);
  }
};

const getResponses = async (req, res) => {
  const methodName = "[getResponses] : ";
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new ValidateError(errors.array()[0].msg);
    }

    const { email, campaign_id } = req.body;

    const user = await models["User"].findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(200).json({
        status: false,
        msg: "User does not exists",
      });
    }

    const campaign = await models["Campaign"].findOne({
      where: {
        id: campaign_id,
      },
    });

    if (!campaign) {
      return res.status(200).json({
        status: false,
        msg: "Campaign does not exists",
      });
    }

    const campaignResponse = await models["CampaignResponse"].findOne({
      where: {
        user_id: user.id,
        campaign_id: campaign.id,
      },
      attributes: ["id", "campaign_id", "response"],
    });

    if (!campaignResponse) {
      return res.status(200).json({
        status: false,
        msg: "Response does not exists",
      });
    }

    const questions = await models["Question"].findAll({
      where: {
        id: campaign.campaignQuestions,
      },
      attributes: ["id", "question", "options"],
    });

    return res.status(200).json({
      status: true,
      msg: "Response found",
      data: {
        campaignResponse,
        questions,
      },
    });
  } catch (e) {
    Error.res(res, e);
  }
};

const getCoupon = async (req, res) => {
  const methodName = "[getCoupon] : ";
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new ValidateError(errors.array()[0].msg);
    }

    const { email, domain } = req.params;

    const user = await models["User"].findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(200).json({
        status: false,
        msg: "User does not exists",
        data: {},
      });
    }

    const coupons = await models["Coupon"].findAll({
      where: {
        email,
        domain,
      },
    });

    return res.status(200).json({
      status: false,
      msg: "Coupon found",
      data: {
        coupons,
      },
    });
  } catch (e) {
    Error.res(res, e);
  }
};

module.exports = {
  activeCampaigns: activeCampaigns,
  registerUser: registerUser,
  getUser: getUser,
  getCampain: getCampain,
  submitResponse: submitResponse,
  getParticipatedCampaigns: getParticipatedCampaigns,
  getResponses: getResponses,
  getCoupon: getCoupon,
};
