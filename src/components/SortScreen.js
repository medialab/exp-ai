import react from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import translate from "../helpers/translate";

import * as uiDuck from "../state/duckUi";
import * as dataDuck from "../state/duckData";
import ContinueButton from "./ContinueButton";

import { reorder, getItemStyle, getListStyle } from "../helpers/sorting";
import { STEP_MAIN_CHOICE, STEP_METRICS_SORTING } from "../constants";

// import metrics from "../contents/metrics_list.fr.yml";

function SortScreen({
  ui: { currentStep, numberOfSteps, metricsOrderIsValidated },
  data: { metricsOrder },
  setCurrentStep,
  setMetricsOrder,
  setNumberOfSteps,
  setMetricsOrderIsValidated,
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
    setNumberOfSteps(STEP_METRICS_SORTING + 1);
  };

  const handleValidateOrder = () => {
    setMetricsOrderIsValidated(true);
    setNumberOfSteps(STEP_MAIN_CHOICE + 1);
  };
  return (
    <section className="sort-screen">
      <h1>{translate("sort_screen_title")}</h1>
      <p>{translate("sort_screen_prompt")}</p>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
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
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      <h3>{item.name} </h3>
                      {/* <p>{item.short_description}</p> */}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <button disabled={metricsOrderIsValidated} onClick={handleValidateOrder}>
        Valider
      </button>
      <ContinueButton
        disabled={!metricsOrderIsValidated || numberOfSteps <= STEP_MAIN_CHOICE}
        onClick={() => setCurrentStep(STEP_MAIN_CHOICE)}
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

export default connect(mapStateToProps, mapDispatchToProps)(SortScreen);
