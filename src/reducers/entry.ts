import { User } from '@/store/StoreTypes'
import { EntryAppAction, CREATE_USER } from '@/actions/index'

const initialState: User = {}

export function EntryReducer(
  state = initialState,
  action: EntryAppAction
): User {
  switch (action.type) {
    case CREATE_USER: {
      const data = action.values
      return data
    }
    default:
      return state
  }

  return state
}

export default EntryReducer
