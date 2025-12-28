import { Link } from 'react-router-dom';
import { changeCity } from '@/store/actions.ts';
import { useAppDispatch } from '@/hooks/use-app-dispatch/use-app-dispatch.ts';
import { City } from '@/types/city/city.ts';

type CitiesTabsProps = {
  cities: City[];
  currentCity: City;
}

export default function CitiesTabs({ cities, currentCity }: CitiesTabsProps) {
  const dispatch = useAppDispatch();

  return (
    <>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            {
              cities.map((city) => (
                <li className="locations__item" key={city.name}>
                  <Link
                    className={`locations__item-link tabs__item ${city.name === currentCity.name && 'tabs__item--active'}`}
                    onClick={() => dispatch(changeCity(city))}
                    to="#"
                  >
                    <span>{city.name}</span>
                  </Link>
                </li>
              ))
            }
          </ul>
        </section>
      </div>
    </>
  );
}
