import { useAppSelector } from '@/hooks/use-app-selector/use-app-selector.ts';
import { useAppDispatch } from '@/hooks/use-app-dispatch/use-app-dispatch.ts';
import { changeSorting } from '@/store/actions.ts';
import { memo, useCallback, useMemo, useState } from 'react';
import { SORTING_OPTIONS } from '@/constants/forms/forms.ts';

const OPTIONS = Object.values(SORTING_OPTIONS);

const Option = memo(({ option, isActive, onSelect }: {
  option: string;
  isActive: boolean;
  onSelect: (option: string) => void;
}) => (
  <li
    key={option}
    tabIndex={0}
    className={`places__option ${isActive && 'places__option--active'}`}
    onClick={() => onSelect(option)}
  >
    {option}
  </li>
));

Option.displayName = 'Option';

export default function FilterForm() {
  const [isOpened, setIsOpened] = useState(false);
  const dispatch = useAppDispatch();
  const currentSorting = useAppSelector((state) => state.offers.sorting);

  const handleToggle = useCallback(() => {
    setIsOpened((prev) => !prev);
  }, []);

  const handleSelect = useCallback((sorting: string) => {
    dispatch(changeSorting(sorting as SORTING_OPTIONS));
  }, [dispatch]);

  const ulClassName = useMemo(
    () => `places__options places__options--custom ${isOpened ? 'places__options--opened' : ''}`,
    [isOpened],
  );

  const optionElements = useMemo(
    () => OPTIONS.map((option) => (
      <Option
        key={option}
        option={option}
        isActive={currentSorting === option}
        onSelect={handleSelect}
      />
    )),
    [currentSorting, handleSelect],
  );

  return (
    <form className="places__sorting" onClick={handleToggle}>
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0}>
        {currentSorting}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={ulClassName}>
        {optionElements}
      </ul>
    </form>
  );
}
