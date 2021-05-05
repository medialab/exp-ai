import react, {
  useState,
  useEffect,
} from "react"; /* eslint no-unused-vars : 0 */

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import cx from "classnames";
import translate from "../helpers/translate";

import { metricsColorMap } from "../helpers/misc";

import * as uiDuck from "../state/duckUi";
import * as dataDuck from "../state/duckData";

import { reorder } from "../helpers/sorting";
import { STEP_MAIN_CHOICE, STEP_METRICS_SORTING } from "../constants";
import ContinueButton from "../components/ContinueButton";
import ReactTooltip from "react-tooltip";

// import metrics from "../contents/metrics_list.fr.yml";
function MetricsOrderingContainer({
  ui: { metricsOrderIsValidated, iterationNumber },
  data: { metricsOrder },
  setCurrentStep,
  setMetricsOrder,
  setMetricsOrderIsValidated,
  currentStep,
}) {
  const [displayDescriptions, setDisplayDescriptions] = useState(false);
  useEffect(() => {
    setTimeout(() => ReactTooltip.rebuild());
  }, [currentStep]);
  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    const items = reorder(
      metricsOrder,
      result.source.index,
      result.destination.index
    );

    setMetricsOrder(items);
  };

  const handleValidateOrder = () => {
    setMetricsOrderIsValidated(true);
    setCurrentStep(STEP_MAIN_CHOICE);
  };
  return (
    <section className="sort-screen">
      <h1 className="step-title">{translate("sort_screen_title")}</h1>
      <p className="instructions">{translate("sort_screen_prompt")}</p>
      <p className="instructions more-instructions">
        {translate("sort_screen_prompt_details")}
      </p>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={cx("draggable-list", {
                "is-dragging": snapshot.isDraggingOver,
              })}
            >
              {metricsOrder.map((item, index) => {
                const handleDown = () => {
                  const items = reorder(metricsOrder, index, index + 1);
                  setMetricsOrder(items);
                };
                const handleUp = () => {
                  const items = reorder(metricsOrder, index, index - 1);
                  setMetricsOrder(items);
                };
                return (
                  <Draggable
                    key={item.name}
                    draggableId={item.name}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={cx("draggable-item", {
                          "is-dragged": snapshot.isDragging,
                        })}
                        style={
                          provided.draggableProps
                            .style /*getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )*/
                        }
                      >
                        <h3 className="sortable-title">
                          <span>
                            <span
                              className="number-indicator"
                              style={{
                                background: metricsColorMap[item.id],
                              }}
                            >
                              <span>{index + 1}</span>
                            </span>
                          </span>
                          <span
                            className={cx("move-btn first", {
                              "is-disabled": index === metricsOrder.length - 1,
                            })}
                            data-for="sorting"
                            data-tip={translate("move_down")}
                            data-place="top"
                            data-effect="solid"
                            onClick={handleDown}
                          >
                            <span>
                              <span>▼</span>
                            </span>
                          </span>
                          <span
                            className={cx("move-btn last", {
                              "is-disabled": index === 0,
                            })}
                            data-for="sorting"
                            data-tip={translate("move_up")}
                            data-place="top"
                            data-effect="solid"
                            onClick={handleUp}
                          >
                            <span>
                              <span>▲</span>
                            </span>
                          </span>
                          <span className="main-title">{item.name} </span>
                          <p
                            className={cx("metrics-description", {
                              "is-visible": displayDescriptions,
                            })}
                          >
                            {item.short_description}
                          </p>
                        </h3>
                        <ReactTooltip id="sorting" />
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <div style={{ marginBottom: "2rem" }}>
        <button
          className={cx({ "is-active": displayDescriptions })}
          onClick={() => setDisplayDescriptions(!displayDescriptions)}
        >
          {translate("show-descriptions")}
        </button>
      </div>

      <ContinueButton
        currentStep={currentStep}
        onSetCurrentStep={setCurrentStep}
        disabled={metricsOrderIsValidated}
        onSubmit={handleValidateOrder}
        submitMessage={translate("validate")}
        relativePosition
        backwardEnabled
      />
    </section>
  );
}

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  ...state,
  ...uiDuck.selector(state.ui),
  ...dataDuck.selector(state.data),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...uiDuck,
      ...dataDuck,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MetricsOrderingContainer);
