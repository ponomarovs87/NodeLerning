const statusName = ["loading", "loaded", "error"];

function targetState(state, targetStateItem, statusName, stateKey) {
  const targetState = stateKey ? state[stateKey] : state;
  if (targetState) {
    targetState.data = targetStateItem;
    targetState.status = statusName;
  } else {
    console.error(`State with key '${stateKey}' does not exist.`);
  }
}

export function extraReducersHelper(fetchName, targetStateItem, stateKey) {
  return {
    [fetchName.pending.type]: (state) => {
      targetState(state, targetStateItem, statusName[0], stateKey);
    },
    [fetchName.fulfilled.type]: (state, action) => {
      targetState(state, action.payload, statusName[1], stateKey);
    },
    [fetchName.rejected.type]: (state) => {
      targetState(state, targetStateItem, statusName[2], stateKey);
    },
  };
}
