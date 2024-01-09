import { HIDE_MEMO, SHOW_MEMO } from "./constants";

export function showMemo() {
  return {
    type: SHOW_MEMO
  };
}

export function hideMemo() {
  return {
    type: HIDE_MEMO
  };
}