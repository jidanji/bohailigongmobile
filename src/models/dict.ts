import { GetGroup } from '@/serivces/dict';
import { produce } from 'immer';

export default {
  namespace: 'dict',
  state: {
    GroupItems:[]
  },
  reducers: {
    saveList(state, { payload }) {
      //return {...state,GroupItems:payload}
      return produce(state, (draftState: any) => {
        state.GroupItems=payload
      });
    }
  },
  effects: {
    * fetchList({ payload }, { put, call, select }) {
      const GroupItems = yield call(GetGroup, null);
      yield put({ type: 'saveList', payload: GroupItems });
    },
  }
};
