import './PriceSlider.scss';

import { Button, Form } from 'antd';
import { IFilterState, IResetState } from 'features/garage/lib/typest';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';

import { BrandAndModelSelectors } from '../FormSelectors/BrandAndModelSelectors';

interface IProps {
  state: IFilterState;
  isReset: IResetState;
}

export const BrandAndModelsFilter: React.FC<IProps> = ({
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
    <Form.List name="users">
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, ...restField }) => (
            <>
              <BrandAndModelSelectors key={key} {...restField} />
              <MinusCircleOutlined onClick={() => remove(name)} />
            </>
          ))}
          <Form.Item>
            <Button
              type="dashed"
              onClick={() => add()}
              block
              icon={<PlusOutlined />}
            >
              Добавить Авто
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
  );
};
