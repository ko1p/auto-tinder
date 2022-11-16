import { DatePicker, Form, Input, InputNumber } from 'antd';
import React, { useEffect } from 'react';

import { ApiError } from 'shared/api/error/error';
import { ButtonTinder } from 'shared/ui';
import { ICarPatch } from 'entities/car/lib/types';
import { IError } from 'shared/lib/types';
import { RangePickerProps } from 'antd/lib/date-picker';
import TextArea from 'antd/lib/input/TextArea';
import { carAPI } from 'entities/car/model/CarService';
import moment from 'moment';

const { Item } = Form;

interface IProps {
  vinCode: string;
  stateNumber: string;
  manufacturedAt: number;
  mileage: number;
  description: string;
  totalOwners: number;
  carId: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export const EditDescription: React.FC<IProps> = ({
  vinCode,
  stateNumber,
  manufacturedAt,
  mileage,
  description,
  totalOwners,
  carId,
  setOpen,
}) => {
  const [patch, { isLoading }] = carAPI.usePatchUserCarInfoMutation();
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldValue('vinCode', vinCode);
    form.setFieldValue('stateNumber', stateNumber);
    form.setFieldValue('manufacturedAt', moment(`${manufacturedAt}`, 'YYYY'));
    form.setFieldValue('mileage', mileage);
    form.setFieldValue('description', description);
    form.setFieldValue('totalOwners', totalOwners);
  }, []);

  const update = async (values: ICarPatch) => {
    const { manufacturedAt: newManufacturedAt } = values;

    try {
      await patch({
        carId,
        data: { ...values, manufacturedAt: +newManufacturedAt.format('YYYY') },
      });
      setOpen(false);
    } catch (err) {
      ApiError(err as IError);
    }
  };

  const disabledDate: RangePickerProps['disabledDate'] = (current) =>
    current && current > moment().endOf('day');

  return (
    <Form
      form={form}
      labelCol={{ span: 10 }}
      wrapperCol={{ span: 30 }}
      layout="vertical"
      scrollToFirstError
      onFinish={update}
    >
      <Item
        style={{ width: '60%' }}
        label="VIN"
        name="vinCode"
        rules={[{ required: true, min: 17, max: 17 }]}
      >
        <Input />
      </Item>
      <Item
        style={{ width: '40%' }}
        labelCol={{ span: 20 }}
        label="Гос. Номер"
        name="stateNumber"
        rules={[
          {
            required: true,
            message: 'А000АА00',
            pattern:
              /^[АВЕКМНОРСТУХ|авекмнорстух]\d{3}(?<!000)[АВЕКМНОРСТУХ|авекмнорстух]{2}\d{2,3}$/,
          },
        ]}
      >
        <Input />
      </Item>
      <Item
        label="Год производства"
        name="manufacturedAt"
        rules={[{ required: true }]}
      >
        <DatePicker disabledDate={disabledDate} picker="year" />
      </Item>
      <Item
        style={{ width: '40%' }}
        labelCol={{ span: 20 }}
        label="Пробег"
        name="mileage"
        rules={[{ required: true }]}
      >
        <InputNumber min={0} style={{ width: '100%' }} />
      </Item>
      <Item
        label="Общее кол-во владельцев"
        name="totalOwners"
        rules={[{ required: true }]}
      >
        <InputNumber min={1} max={99} />
      </Item>
      <Item label="Детальное описание" name="description">
        <TextArea rows={4} />
      </Item>
      <ButtonTinder
        theme="accept"
        key="submit"
        htmlType="submit"
        type="primary"
        loading={isLoading}
      >
        Изменить
      </ButtonTinder>
    </Form>
  );
};
