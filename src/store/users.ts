import {
  createSlice,
  createEntityAdapter,
  PayloadAction,
  Update,
  createSelector,
} from '@reduxjs/toolkit'
import { AllowanceState } from './allowance/allowance.types'
import { StoreKeys } from './root';
import { selectReducer } from './utils';

export interface UserType {
  id: string;
  name: string;
  balance: number;
  allowances: Array<AllowanceState['id']>;
}

export type UsersStateType = {
  users: UserType[];
};

const initialState: UsersStateType = {
  users: [
    {
      id: "510298100",
      name: "Roger Skrzypczyk",
      balance: 100.5,
      allowances: [],
    },
    {
      id: "810291029",
      name: "Marcin Misiorek",
      balance: 1000,
      allowances: [],
    },
    {
      id: "500100100",
      name: "Jan Kowalski",
      balance: 600,
      allowances: [],
    },
    {
      id: "710291990",
      name: "Ewa Nowak",
      balance: 123,
      allowances: [],
    },
  ],
};
export const userAdapter = createEntityAdapter<UserType>()

const userSliceState = userAdapter.getInitialState(initialState)

export const userSlice = createSlice({
  initialState: userSliceState,
  name: "User",
  reducers: {
    updateBalance: (state,  action: PayloadAction<UserType>) => {
      const {id, ...changes} = action.payload

      const update: Update<UserType> = {
        id,
        changes,
      }
      userAdapter.updateOne(state, update)
      return state
    },
  },
})

export const userActions = userSlice.actions
export const userReducer = userSlice.reducer