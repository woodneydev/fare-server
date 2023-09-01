function hasValidProperties(validProperties) {
  return (req, res, next) => {
    const { data = {} } = req.body;
    
    const invalidFields = Object.keys(data).filter((field) => {
      return !validProperties.includes(field);
    });

    if (invalidFields.length) {
      return next({
        status: 400,
        message: `Invalid field(s): ${invalidFields.join(", ")}`,
      });
    }
    
    next();

  };
}

module.exports = hasValidProperties;
