import get from "axios";
import { csvParse } from "d3-dsv";
import { uniq } from "lodash";

const formatModels = (data) => {
  return data.map((datum, id) => {
    return {
      ...datum,
      variables: datum.nom_modele.split(" "),
      nom_modele: undefined,
      id,
    };
  });
};

export const fetchData = () =>
  new Promise((resolve, reject) => {
    get(`${process.env.PUBLIC_URL}/models-sample.csv`)
      .then(({ data }) => {
        resolve(formatModels(csvParse(data)));
      })
      .catch(reject);
  });
