const statusName = ["loading", "loaded", "error"];

function targetState(state, stateKey, targetStateItem, statusName) {
  const targetState = stateKey ? state[stateKey] : state;
  targetState.items = targetStateItem;
  targetState.status = statusName;
}

export function extraReducersHelper(fetchName, targetStateItem, stateKey) {
  return {
    [fetchName.pending]: (state) => {
      targetState(state, stateKey, targetStateItem, statusName[0]);
    },
    [fetchName.fulfilled]: (state, action) => {
      targetState(state, stateKey, action.payload, statusName[1]);
    },
    [fetchName.rejected]: (state) => {
      targetState(state, stateKey, targetStateItem, statusName[2]);
    },
  };
}
