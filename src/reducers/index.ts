import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import consts from './consts'
import posts from './posts'
import entry from './entry'
import remind from './remind'
import auth from './auth'
import parts from './parts'
import memberPosts from './member_posts'

export * from './consts'
export * from './posts'
export * from './entry'
export * from './remind'
export * from './auth'
export * from './parts'
export * from './member_posts'

export default combineReducers({
  consts,
  posts,
  entry,
  remind,
  parts,
  auth,
  memberPosts,
  form,
})
