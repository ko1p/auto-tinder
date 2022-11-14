import './PriceSlider.scss';

import { DatePicker, Form, FormInstance } from 'antd';
import React, { useEffect } from 'react';

import { IResetState } from 'features/garage/lib/types';
import { RangePickerProps } from 'antd/lib/date-picker';
import moment from 'moment';

const { RangePicker } = DatePicker;
const { Item } = Form;

interface IProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: FormInstance<any>;
  reset: IResetState;
}

const disabledDate: RangePickerProps['disabledDate'] = (current) =>
  current && current > moment().endOf('day');

export const ManufacturedInputs: React.FC<IProps> = ({
  form,
  reset: { isReset, setIsReset },
}) => {
  useEffect(() => {
    form.setFieldValue('year', undefined);
    setIsReset(false);
  }, [isReset]);

  return (
    <Item label="Год производства" labelCol={{ span: 20 }} name="year">
      <RangePicker
        disabledDate={disabledDate}
        disabled={isReset}
        picker="year"
      />
    </Item>
  );
};
