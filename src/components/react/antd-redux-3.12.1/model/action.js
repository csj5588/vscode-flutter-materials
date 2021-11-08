import { message } from 'antd';
import {
  MATERIALS_SAVE_CREATE,
  MATERIALS_SAVE_CREATE_PARAMS,
  MATERIALS_INIT_CREATE_PARAMS,
  MATERIALS_SAVE_TABLE,
  MATERIALS_SAVE_SEARCH_PARAMS,
} from './type';
import S from './../apis';

export const saveCreate = payload => ({ type: MATERIALS_SAVE_CREATE, payload });
export const saveTable = payload => ({ type: MATERIALS_SAVE_TABLE, payload });
export const saveCreateParams = payload => ({ type: MATERIALS_SAVE_CREATE_PARAMS, payload });
export const initCreateParams = payload => ({ type: MATERIALS_INIT_CREATE_PARAMS, payload });
export const saveSearchParams = payload => ({ type: MATERIALS_SAVE_SEARCH_PARAMS, payload });

export const getTableList = (payload = {}) => async (dispatch, getState) => {
  const { materials: state } = getState();
  const params = {
    ...state.searchParams,
    ...payload,
  }
  S.getDataList(params).then(res => {
    const { data = {} } = res;
    dispatch(saveTable({
      data: data.list || [],
      total: +data.total,
    }));
    message.success('查询成功');
    // 回存
    dispatch(saveSearchParams(params));
  });
};

// 新增、编辑
export const add = payload => async (dispatch, getState) => {
  S.add(payload).then(() => {
    message.success('操作成功');
    // 刷新列表
    dispatch(getTableList());
    // 关闭弹窗
    dispatch(saveCreate({ show: false }));
  });
};

export const del = payload => async (dispatch, getState) => {
  S.del(payload).then(() => {
    message.success('删除成功');
    // 刷新列表
    dispatch(getTableList());
  });
};
