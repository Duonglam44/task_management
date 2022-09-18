// all reducers no need to export with default option
import { combineReducers } from 'redux'
import { TodoReducer } from '@redux/reducers/todoReducer'

const rootReducer = combineReducers({
  TodoReducer
})

export default rootReducer
export type RootState = ReturnType<typeof rootReducer>
