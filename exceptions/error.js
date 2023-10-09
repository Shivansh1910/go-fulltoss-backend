class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.status = 404;
    this.code = "NOTFOUND";
    this.error = "NotFoundError";
    this.msg = message;
  }
}

class ValidateError extends Error {
  constructor(message) {
    super(message);
    this.success = false;
    this.status = 400;
    this.errCode = "VA-1";

    this.msg = message;
  }
}

class LoginError extends Error {
  constructor(message) {
    super(message);
    this.success = false;
    this.status = 401;
    this.msg = message;
    this.errCode = "VA-2";
  }
}
class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.success = false;
    this.status = 401;
    this.errCode = "VA-3";
    this.msg = message;
  }
}

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.success = false;
    this.status = 403;
    this.errCode = "VA-3";

    this.msg = message;
  }
}

const res = (res, error) => {
  if (error.status) {
    console.log(error);
    // delete error['status'];
    res.status(error.status).json(error);
  } else {
    console.log(`[error]: ${error}`);
    res.status(400).json(error);
  }
};

module.exports = {
  res: res,
  NotFoundError: NotFoundError,
  UnauthorizedError: UnauthorizedError,
  ForbiddenError: ForbiddenError,
  ValidateError: ValidateError,
  LoginError: LoginError,
};
