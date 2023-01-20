import { useEffect, useState, useRef } from 'react';
import { setLocalData, getLocalData } from '../utils/localStorage';

function Search() {

  const inputRef = useRef(null);

  const onSubmit = event => {
    event.preventDefault();

    const keyword = event.target.keyword.value;

    if (keyword === '') {
      return alert('검색어를 입력해주세요.');
    }

    setLocalData({
      storageKey: 'keyword',
      dataKey: 'searchKey',
      dataBody: keyword
    });

    console.log(getLocalData({
      storageKey: 'keyword',
      dataKey: 'searchKey'
    }));
  }

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <>
      <form onSubmit={ onSubmit }>
        <input ref={ inputRef } name="keyword" type="text" placeholder="검색어를 입력하세요." />
        <button type="submit">보내기</button>
      </form>
    </>
  );
}

export default Search;