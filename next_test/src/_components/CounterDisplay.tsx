import { useAppSelector } from '../lib/redux/hooks';
import { RootState } from '../lib/redux/store';

const CounterDisplay = () => {
  const count = useAppSelector((state: RootState) => state.counter.value);

  return (
    <div>
      COUNT: { count }
    </div>
  );
};

export default CounterDisplay;
