import { Action } from 'redux'
import { Dispatch } from 'redux'
import { API_ENDPOINT } from '@/common/constants/api'
import { API } from '@/utilities'

export type RemindAppAction = Action

export const REMIND_CHECK_OK = 'REMIND_CHECK_OK'

export const remindMail = (values: any) => async (): Promise<void> => {
  await API.post(`${API_ENDPOINT.ENTRY_REMIND}`, values)
}

export const remindCheck = (onetimeKey: string) => async (
  dispatch: Dispatch
): Promise<void> => {
  await API.get(`${API_ENDPOINT.ENTRY_REMIND_CONFIG}/${onetimeKey}`)
  dispatch({ type: REMIND_CHECK_OK })
}

export const remindRegist = (values: any) => async (): Promise<void> => {
  await API.post(`${API_ENDPOINT.ENTRY_REMIND_CONFIG}`, values)
}
