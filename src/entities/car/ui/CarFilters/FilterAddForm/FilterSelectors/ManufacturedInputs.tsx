import './PriceSlider.scss';

import { DatePicker, Form, FormInstance } from 'antd';
import React, { useEffect } from 'react';

import { IResetState } from 'features/garage/lib/types';
import { RangePickerProps } from 'antd/lib/date-picker';
import moment from 'moment';

const { RangePicker } = DatePicker;
const { Item } = Form;
interface IinitialValues {
  initialManufactoredMin?: number;
  initialManufactoredMax?: number;
}
interface IProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: FormInstance<any>;
  reset: IResetState;
  initialValues: IinitialValues;
}

const disabledDate: RangePickerProps['disabledDate'] = (current) =>
  current && current > moment().endOf('day');

export const ManufacturedInputs: React.FC<IProps> = ({
  form,
  reset: { isReset, setIsReset },
  initialValues: { initialManufactoredMin, initialManufactoredMax },
}) => {
  useEffect(() => {
    if (!!initialManufactoredMin && !!initialManufactoredMax)
      form.setFieldValue('year', [
        moment(`${initialManufactoredMin}`, 'YYYY'),
        moment(`${initialManufactoredMax}`, 'YYYY'),
      ]);
    setIsReset(false);
  }, [isReset]);

  return (
    <Item
      style={{ width: '100%' }}
      label="Год производства"
      labelCol={{ span: 20 }}
      name="year"
    >
      <RangePicker
        style={{ width: '100%' }}
        disabledDate={disabledDate}
        disabled={isReset}
        picker="year"
      />
    </Item>
  );
};
