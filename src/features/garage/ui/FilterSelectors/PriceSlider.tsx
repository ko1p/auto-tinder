import './PriceSlider.scss';

import { IFilterState, IResetState } from 'features/garage/lib/typest';
import { InputNumber, Slider } from 'antd';
import React, { useEffect, useState } from 'react';

import { CheckboxTinder } from 'shared/ui';

interface IProps {
  state: IFilterState;
  isReset: IResetState;
}

export const PriceSlider: React.FC<IProps> = ({
  state: { filter, setFilter },
  isReset: { isReset, setIsReset },
}) => {
  const step = 10;
  const [min, max] = [0, 1000];
  const [range, setRange] = useState({ min: 1, max: 1000 });
  const [active, setActive] = useState<boolean>(false);

  useEffect(() => {
    setIsReset(false);
    setActive(false);
    setRange({ min: 1, max: 1000 });
  }, [isReset]);

  useEffect(() => {
    if (active)
      setFilter({ ...filter, priceStart: range.min, priceFinish: range.max });
    else setFilter({ ...filter, priceStart: min, priceFinish: max });
  }, [range, active]);

  const changeMin = (value: number) => {
    if (Number.isNaN(value) || value < min) return setRange({ ...range, min });
    if (value > max) return setRange({ min: max, max });

    if (range.max < value) return setRange({ min: value, max: value });
    return setRange({ ...range, min: value });
  };
  const changeMax = (value: number) => {
    if (Number.isNaN(value) || value < min) return setRange({ min, max: min });
    if (value > max) return setRange({ ...range, max });
    if (range.min > value) return setRange({ min: value, max: value });
    return setRange({ ...range, max: value });
  };

  return (
    <>
      <CheckboxTinder
        checked={active}
        onChange={(e) => setActive(e.target.checked)}
      >
        Цена
      </CheckboxTinder>
      <div className="price-slider__range">
        <InputNumber
          className="price-slider__input-number"
          value={range.min}
          onChange={(e) => changeMin(Number(e))}
          disabled={!active}
        />
        <span>-</span>
        <InputNumber
          className="price-slider__input-number"
          value={range.max}
          onChange={(e) => changeMax(Number(e))}
          disabled={!active}
        />
      </div>

      <Slider
        step={step}
        min={min}
        max={max}
        range={{ draggableTrack: true }}
        value={[range.min, range.max]}
        onChange={(e: number[]) => setRange({ min: e[0], max: e[1] })}
        disabled={!active}
      />
    </>
  );
};
