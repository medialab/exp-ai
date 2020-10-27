export const setPropInState = (actionName, payload, state) => {
  const varName = actionName
    .replace("SET_", "")
    .toLowerCase()
    .replace(/(_[a-z])/gi, (a, b) => b.substr(1).toUpperCase());
  return {
    ...state,
    [varName]: payload,
  };
};
