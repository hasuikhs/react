import { useNavigate } from 'react-router';

function NotFound() {
  const navigate = useNavigate();

  document.body.addEventListener('keyup', e => {
    if (e.key === 'Escape') navigate(-1);
  });

  return (
    <>
      404
      <button onClick={ () => navigate(-1) }>돌아가기</button>
    </>
  );
}

export default NotFound;