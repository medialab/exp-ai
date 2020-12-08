import metrics from "../contents/metrics_list.fr.yml";
export const metricsColorMap = metrics.reduce(
  (res, { id, color }) => ({
    ...res,
    [id]: color,
  }),
  {}
);
