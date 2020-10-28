export const filterModels = (models, filters) => {
  return filters.reduce((res, filter) => {
    return res.filter((model) => {
      const { variable, type, range } = filter;
      let value = model[variable];
      /* @todo dirty - just to handle privacy */
      if (filter.variables) {
        value = -model.variables.filter((vName) =>
          filter.variables.includes(vName)
        ).length;
      }
      switch (type) {
        case "range":
        default:
          const [min, max] = range;
          return value >= min && value <= max;
      }
    });
  }, models);
};
