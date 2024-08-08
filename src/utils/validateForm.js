export const validate = (
  obj = {},
  fields = [],
  returnObject = false,
  returnField = 'name'
) => {
  const emptyFields = [];

  // Check each field in the obj object
  fields.forEach((item) => {
    const value = obj[item?.key];
    if (
      typeof value !== 'boolean' &&
      (!value ||
        (Array.isArray(value) &&
          (value.length === 0 || value.filter((item) => item).length < 1)))
    ) {
      emptyFields.push(item[returnField]);
    }
  });
  //   console.log(emptyFields);
  if (emptyFields.length > 0)
    return returnObject
      ? {
          success: false,
          message: `Please provide values for ${emptyFields.join(', ')}`,
          fields: emptyFields,
        }
      : {
          success: false,
          message: `Please provide values for ${emptyFields.join(', ')}`,
        };
  else return { success: true };
};
