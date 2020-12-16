import { extent } from "d3-array";
import { scaleLinear } from "d3-scale";

import { filterModels } from "./helpers/filters";
import { sortModelsByDistance } from "./helpers/sorters";
import metricsList from "./contents/metrics_list.fr.yml";

export const getVisibleModels = ({
  models,
  filters,
  sortMode,
  metricsOrder,
}) => {
  let visibleModels = filterModels(
    models,
    Object.entries(filters).map(([_key, filter]) => filter)
  );
  const normalScales = metricsList.reduce((res, { id }) => {
    const range = extent(visibleModels, (d) => +d[id]);
    const scale = scaleLinear().domain(range).range([0, 1]);
    return {
      ...res,
      [id]: scale,
    };
  }, {});

  let sortItemsFunction;
  if (sortMode === "similarity") {
    sortItemsFunction = (a, b) =>
      sortModelsByDistance(
        a,
        b,
        metricsOrder.map(({ id }) => id),
        normalScales
      );
  } else {
    sortItemsFunction = (a, b) => {
      if (+a[sortMode] > +b[sortMode]) {
        return -1;
      } else if (+a[sortMode] < +b[sortMode]) {
        return 1;
      }
      return 0;
    };
  }
  visibleModels = visibleModels.sort(sortItemsFunction);
  return visibleModels;
};
