import react from "react"; /* eslint no-unused-vars : 0 */

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import cx from "classnames";
import translate from "../helpers/translate";

import * as uiDuck from "../state/duckUi";
import * as dataDuck from "../state/duckData";

import { reorder, getItemStyle, getListStyle } from "../helpers/sorting";
import { STEP_MAIN_CHOICE, STEP_METRICS_SORTING } from "../constants";
import InfoTip from "../components/InfoTip";
import ContinueButton from "../components/ContinueButton";

// import metrics from "../contents/metrics_list.fr.yml";
function MetricsOrderingContainer({
  ui: { metricsOrderIsValidated },
  data: { metricsOrder },
  setCurrentStep,
  setMetricsOrder,
  setMetricsOrderIsValidated,
  currentStep,
}) {
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
              {metricsOrder.map((item, index) => (
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
                      <h3>
                        <span className="number-indicator">{index + 1}</span>
                        {item.name}{" "}
                        <InfoTip
                          data-effect="solid"
                          data-place="right"
                          tip={item.short_description}
                        />
                      </h3>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <ContinueButton
        currentStep={currentStep}
        onSetCurrentStep={setCurrentStep}
        disabled={metricsOrderIsValidated}
        onSubmit={handleValidateOrder}
        submitMessage={"validate"}
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
