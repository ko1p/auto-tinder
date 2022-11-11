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

export const MilleageSlider: React.FC<IProps> = ({ form }) => {
  const step = 10;
  const [initMin, initMax] = [1, 500000];

  const minMile = Form.useWatch('minMile', form);
  const maxMile = Form.useWatch('maxMile', form);
  const minmaxMile = Form.useWatch('minmaxMile', form);
  const [active, setActive] = useState<boolean>(false);

  const changeMin = (value: number | null) => {
    if (value === null) changeMin(0);
    else {
      if (maxMile < value)
        return form.setFieldsValue({
          maxMile: value,
          minMile: maxMile,
          minmaxMile: [maxMile, value],
        });
      return form.setFieldValue('minmaxMile', [value, minmaxMile[1]]);
    }
  };
  const changeMax = (value: number | null) => {
    if (value === null) changeMax(0);
    else {
      if (value < minMile)
        return form.setFieldsValue({
          maxMile: value,
          minMile: maxMile,
          minmaxMile: [maxMile, value],
        });
      return form.setFieldValue('minmaxMile', [minmaxMile[0], value]);
    }
  };
  const changeMinMax = (value: number[]) => {
    form.setFieldsValue({ minMile: value[0], maxMile: value[1] });
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
        Пробег км
      </CheckboxTinder>
      <Space.Compact block style={{ alignItems: 'center', gap: 5 }}>
        <Item style={{ width: '49%', margin: 0 }} name="minMile">
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
        <Item style={{ width: '49%', margin: 0 }} name="maxMile">
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
      <Item style={{ margin: 0 }} name="minmaxMile">
        <Slider
          step={step}
          min={initMin}
          max={initMax}
          defaultValue={[initMin, initMax]}
          range={{ draggableTrack: true }}
          value={[minMile, maxMile]}
          onChange={changeMinMax}
          disabled={!active}
        />
      </Item>
    </Space>
  );
};
