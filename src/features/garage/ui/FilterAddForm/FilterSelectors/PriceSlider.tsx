/* eslint-disable consistent-return */

import './PriceSlider.scss';

import { Form, FormInstance, InputNumber, Slider, Space } from 'antd';
import React, { useState } from 'react';

import { CheckboxTinder } from 'shared/ui';
import { MinusOutlined } from '@ant-design/icons';

const { Item } = Form;
interface IProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: FormInstance<any>;
}

export const PriceSlider: React.FC<IProps> = ({ form }) => {
  const step = 10;
  const [initMin, initMax] = [1, 1000];

  const minPrice = Form.useWatch('minPrice', form);
  const maxPrice = Form.useWatch('maxPrice', form);
  const minmaxPrice = Form.useWatch('minmaxPrice', form);
  const [active, setActive] = useState<boolean>(false);

  const changeMin = (value: number | null) => {
    if (value === null) changeMin(0);
    else {
      if (maxPrice < value)
        return form.setFieldsValue({
          maxPrice: value,
          minPrice: maxPrice,
          minmaxPrice: [maxPrice, value],
        });
      return form.setFieldValue('minmaxPrice', [value, minmaxPrice[1]]);
    }
  };
  const changeMax = (value: number | null) => {
    if (value === null) changeMax(0);
    else {
      if (value < minPrice)
        return form.setFieldsValue({
          maxPrice: value,
          minPrice: maxPrice,
          minmaxPrice: [maxPrice, value],
        });
      return form.setFieldValue('minmaxPrice', [minmaxPrice[0], value]);
    }
  };
  const changeMinMax = (value: number[]) => {
    form.setFieldsValue({ minPrice: value[0], maxPrice: value[1] });
  };

  return (
    <Space
      direction="vertical"
      style={{
        gap: 5,
        padding: 5,
        border: '2px ridge #96fafa',
        backgroundColor: '#fafafa',
      }}
    >
      <CheckboxTinder
        checked={active}
        onChange={(e) => setActive(e.target.checked)}
      >
        Цена ₽
      </CheckboxTinder>
      <Space.Compact block style={{ alignItems: 'center', gap: 5 }}>
        <Item style={{ width: '49%', margin: 0 }} name="minPrice">
          <InputNumber
            style={{ width: '100%' }}
            min={initMin}
            max={initMax}
            defaultValue={initMin}
            className="price-slider__input-number"
            disabled={!active}
            onChange={changeMin}
          />
        </Item>
        <Item style={{ width: '2', margin: 0 }}>
          <MinusOutlined />
        </Item>
        <Item style={{ width: '49%', margin: 0 }} name="maxPrice">
          <InputNumber
            style={{ width: '100%' }}
            min={initMin}
            max={initMax}
            defaultValue={initMax}
            className="price-slider__input-number"
            onChange={changeMax}
            disabled={!active}
          />
        </Item>
      </Space.Compact>
      <Item style={{ margin: 0 }} name="minmaxPrice">
        <Slider
          step={step}
          min={initMin}
          max={initMax}
          defaultValue={[initMin, initMax]}
          range={{ draggableTrack: true }}
          value={[minPrice, maxPrice]}
          onChange={changeMinMax}
          disabled={!active}
        />
      </Item>
    </Space>
  );
};
