import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { decrement, increment, incrementByAmount } from '@/lib/redux/slices/counterSlice';
import { RootState } from '@/lib/redux/store';

const Counter = () => {
  const count = useAppSelector((state: RootState) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div>
      <div>
        <button onClick={() => dispatch(increment())}>
          Increment
        </button>
        <button onClick={() => dispatch(decrement())}>
          Decrement
        </button>
        <button onClick={() => dispatch(incrementByAmount(5))}>
          Increment by 5
        </button>
      </div>
      <div>Count: {count}</div>
    </div>
  );
};

export default Counter;
