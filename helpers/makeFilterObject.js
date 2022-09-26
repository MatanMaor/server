module.exports.makeFilterObject = (queryObj) => {
  const queryStr = JSON.stringify(queryObj).replace(
    /\b(lt|lte|gt|gte|eq)/g,
    (expr) => "$" + expr
  );
  return JSON.parse(queryStr);
};
