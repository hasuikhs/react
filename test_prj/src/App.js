import { useState, useRef } from 'react';
import axios from 'axios';

function App() {

  const [title, setTitle] = useState('');
  const titleRef = useRef(null);

  const [body, setBody] = useState('');
  const bodyRef = useRef(null);

  const onSubmit = () => {
    if (title === '') {
      alert('title 열이 비어있음!');
      titleRef.current.focus();
      return;
    }

    if (body ===  '') {
      alert('body 내용이 비어있음!');
      bodyRef.current.focus();
      return;
    }

    // db 실행 npx json-server --watch db.json --port=3001
    axios.post('http://localhost:3001/posts', {
      title: title,
      body: body
    })
  }

  return (
    <div className="container">
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          ref={ titleRef }
          className="form-control"
          placeholder="title을 입력해주세요"
          value={ title }
          onChange={ e => setTitle(e.target.value) }
        />
      </div><div className="mb-3">
        <label className="form-label">Body</label>
        <textarea
          ref={ bodyRef }
          className="form-control"
          placeholder="body를 입력해주세요"
          value={ body }
          rows="20"
          onChange={ e => setBody(e.target.value) }
        />
      </div>
      <button className="btn btn-primary" onClick={ onSubmit }>
        Post
      </button>
    </div>
  );
}

export default App;
