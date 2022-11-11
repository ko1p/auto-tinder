import './PriceSlider.scss';

import { DatePicker, Form } from 'antd';
import React, { useEffect } from 'react';

import { IResetState } from 'features/garage/lib/typest';

const { RangePicker } = DatePicker;
const { Item } = Form;

interface IProps {
  isReset: IResetState;
}

export const ManufacturedInputs: React.FC<IProps> = ({
  isReset: { isReset, setIsReset },
}) => {
  useEffect(() => {
    setIsReset(false);
  }, [isReset]);

  return (
    <Item label="Год производства" labelCol={{ span: 20 }} name="year">
      <RangePicker disabled={isReset} picker="year" />
    </Item>
  );
};
