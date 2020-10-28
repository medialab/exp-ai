export const filterModels = (models, filters) => {
  return filters.reduce((res, filter) => {
    return res.filter((model) => {
      const { variable, type, range } = filter;
      const value = model[variable];
      switch (type) {
        case "range":
        default:
          const [min, max] = range;
          return value >= min && value <= max;
      }
    });
  }, models);
};
