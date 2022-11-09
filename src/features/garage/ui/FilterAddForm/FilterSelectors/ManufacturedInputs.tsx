import './PriceSlider.scss';

import { IFilterState, IResetState } from 'features/garage/lib/typest';
import React, { useEffect, useState } from 'react';

import { DatePicker } from 'antd';

const { RangePicker } = DatePicker;

interface IProps {
  state: IFilterState;
  isReset: IResetState;
}

export const ManufacturedInputs: React.FC<IProps> = ({
  state: { filter, setFilter },
  isReset: { isReset, setIsReset },
}) => {
  const [min, max] = [1800, 2022];
  const [range, setRange] = useState({ min: 0, max: 0 });
  const [active, setActive] = useState<boolean>(false);

  useEffect(() => {
    setIsReset(false);
    setActive(false);
    setRange({ min: 0, max: 0 });
  }, [isReset]);

  useEffect(() => {
    if (active)
      setFilter({
        ...filter,
        manufacturedAtStart: range.min,
        manufacturedAtFinish: range.max,
      });
    else
      setFilter({
        ...filter,
        manufacturedAtStart: min,
        manufacturedAtFinish: max,
      });
  }, [range, active]);

  return (
    <RangePicker
      disabled={isReset}
      onChange={(e) => {
        if (!e) return;
        if (e[0]) setRange({ ...range, min: +e[0].format('YYYY') });
        if (e[1]) setRange({ ...range, max: +e[1].format('YYYY') });
      }}
      picker="year"
    />
  );
};
