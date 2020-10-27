import react from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import translate from "../helpers/translate";

import * as uiDuck from "../state/duckUi";
import * as dataDuck from "../state/duckData";
import ContinueButton from "./ContinueButton";

// import metrics from "../contents/metrics_list.fr.yml";

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250,
});

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
  };

  const handleValidateOrder = () => {
    setMetricsOrderIsValidated(true);
    setNumberOfSteps(6);
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
        disabled={!metricsOrderIsValidated || numberOfSteps <= 5}
        onClick={() => setCurrentStep(currentStep + 1)}
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
