const statusName = ["loading", "sucsess", "error"];

function targetState(state, targetStateItem, statusName, stateKey) {
  const targetState = stateKey ? state[stateKey] : state;
  if (targetState) {
    const { data, error } = targetStateItem;
    targetState.data = data;
    targetState.error = error;
    targetState.status = statusName;
  } else {
    console.error(`State with key '${stateKey}' does not exist.`);
  }
}

export function extraReducersHelper(fetchName, targetStateItem, stateKey) {
  return {
    [fetchName.pending.type]: (state) => {
      targetState(
        state,
        { data: targetStateItem, error: targetStateItem },
        statusName[0],
        stateKey
      );
    },
    [fetchName.fulfilled.type]: (state, action) => {
      targetState(
        state,
        { data: action.payload, error: targetStateItem },
        statusName[1],
        stateKey
      );
    },
    [fetchName.rejected.type]: (state, action) => {
      targetState(
        state,
        { data: targetStateItem, error: action.payload },
        statusName[2],
        stateKey
      );
    },
  };
}
