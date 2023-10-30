const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  const update = {...state}
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      update.good += 1
      return state = update
    case 'OK':
      update.ok += 1
      return state = update
    case 'BAD':
      update.bad += 1
      return state = update
    case 'ZERO':
      const reset = {
        good: 0,
        ok: 0,
        bad: 0
      }
      return state = reset
    default: return state
  }
  
}

export default counterReducer
