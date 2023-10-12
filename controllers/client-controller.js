require("dotenv").config();
const { validationResult } = require("express-validator");
const Error = require("../exceptions/error");
const ValidateError = Error.ValidateError;
const { generateIdentifier } = require("../helpers/generateIdentifier");

const models = require("../models");

const registerClient = async (req, res) => {
  const methodName = "[registerClient] : ";
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new ValidateError(errors.array()[0].msg);
    }

    const { name, domain } = req.body;

    const identifier = await generateIdentifier();

    const [client, created] = await models["Client"].findOrCreate({
      where: {
        domain,
      },
      defaults: {
        name,
        domain,
        identifier,
      },
    });

    if (!created) {
      return res.status(200).json({
        status: false,
        msg: "Client already exists",
        data: {},
      });
    }

    return res.status(200).json({
      status: true,
      msg: "Client created",
      data: client,
    });
  } catch (e) {
    Error.res(res, e);
  }
};

const getClient = async (req, res) => {
  const methodName = "[getClient] : ";
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new ValidateError(errors.array()[0].msg);
    }

    const { domain } = req.params;

    const client = await models["Client"].findOne({
      where: {
        domain,
      },
      attributes: ["id", "name", "domain", "identifier"],
    });

    if (!client) {
      return res.status(200).json({
        status: false,
        msg: "Client not found",
        data: {},
      });
    }

    return res.status(200).json({
      status: true,
      msg: "Client found",
      data: client,
    });
  } catch (e) {
    Error.res(res, e);
  }
};

const clientCampaigns = async (req, res) => {
  const methodName = "[clientCampaigns] : ";
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new ValidateError(errors.array()[0].msg);
    }

    const { domain } = req.params;

    const client = await models["Client"].findOne({
      where: {
        domain,
      },
    });

    if (!client) {
      return res.status(200).json({
        status: false,
        msg: "Client not found",
        data: {},
      });
    }

    const campaign = await models["Campaign"].findOne({
      where: {
        id: client.active_campaign,
      },
      attributes: [
        "id",
        "campaignName",
        "campaignQuestions",
        "active",
        "activeDateTime",
      ],
    });

    const questions = await models["Question"].findAll({
      where: {
        id: campaign.campaignQuestions,
      },
      attributes: ["id", "question", "options"],
    });

    return res.status(200).json({
      status: true,
      msg: "Client campaigns",
      data: {
        campaign,
        questions,
      },
    });
  } catch (e) {
    Error.res(res, e);
  }
};

module.exports = {
  registerClient: registerClient,
  getClient: getClient,
  clientCampaigns: clientCampaigns,
};
