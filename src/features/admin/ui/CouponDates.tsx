import { DatePicker, Form, FormInstance } from 'antd';
import React, { useEffect } from 'react';

import { IResetState } from 'features/garage/lib/types';
import { RangePickerProps } from 'antd/lib/date-picker';
import moment from 'moment';

const { RangePicker } = DatePicker;
const { Item } = Form;
interface IinitialValues {
  initialStartDate?: string;
  initialEndDate?: string;
}
interface IProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: FormInstance<any>;
  reset: IResetState;
  initialValues: IinitialValues;
}

const disabledDate: RangePickerProps['disabledDate'] = (current) =>
  current && current > moment().endOf('day');

export const CouponDates: React.FC<IProps> = ({
  form,
  reset: { isReset, setIsReset },
  initialValues: { initialStartDate, initialEndDate },
}) => {
  useEffect(() => {
    form.setFieldValue('year', [
      moment(`${initialStartDate}`, 'YYYY-MM-DD'),
      moment(`${initialEndDate}`, 'YYYY-MM-DD'),
    ]);
    setIsReset(false);
  }, [isReset]);

  return (
    <Item
      style={{ width: '100%' }}
      label="Срок действия"
      labelCol={{ span: 20 }}
      name="Date"
    >
      <RangePicker
        style={{ width: '100%' }}
        disabledDate={disabledDate}
        disabled={isReset}
        picker="date"
      />
    </Item>
  );
};
