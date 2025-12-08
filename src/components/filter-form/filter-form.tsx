import { useAppSelector } from '@/hooks/use-app-selector.ts';
import { useAppDispatch } from '@/hooks/use-app-dispatch.ts';
import { changeSorting } from '@/store/actions.ts';
import { SortingOptions } from '@/utils/sorting-variables.ts';
import { useState } from 'react';

export default function FilterForm() {
  const [isOpened, setIsOpened] = useState(false);
  const dispatch = useAppDispatch();
  const currentSorting = useAppSelector((state) => state.offers.sorting);

  return (
    <form className="places__sorting" onClick={() => setIsOpened(!isOpened)}>
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0}>
        {currentSorting}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        className={`places__options places__options--custom ${isOpened && 'places__options--opened'}`}
      >
        {Object.values(SortingOptions).map((key) => (
          <li
            key={key}
            tabIndex={0}
            className={`places__option ${currentSorting === key && 'places__option--active'}`}
            onClick={() => dispatch(changeSorting(key as SortingOptions))}
          >
            {key}
          </li>
        ))}
      </ul>
    </form>
  );
}
