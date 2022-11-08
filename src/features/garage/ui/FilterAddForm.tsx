import { Form, Space } from 'antd';
import React, { useState } from 'react';

import { ButtonTinder } from 'shared/ui';
import { BrandAndModelsFilter } from './FilterSelectors/BrandAndModelsFilter';
import { IFilter } from '../lib/typest';
import { ManufacturedInputs } from './FilterSelectors/ManufacturedInputs';
import { MilleageSlider } from './FilterSelectors/MilleageSlider';
import { PriceSlider } from './FilterSelectors/PriceSlider';
import { garageAPI } from '../model/query/garageService';

interface IProps {
  carId: number;
}

const initialFilter: IFilter = {
  city: 0,
  priceStart: 0,
  priceFinish: 0,
  brands: [0],
  models: [0],
  body: 0,
  gearbox: 0,
  engine: 0,
  drive: 0,
  manufacturedAtStart: 0,
  manufacturedAtFinish: 0,
  mileageStart: 0,
  mileageFinish: 0,
};

export const FilterAddForm: React.FC<IProps> = ({ carId }) => {
  const [AddFilter, { isLoading }] = garageAPI.useAddFilterMutation();
  const [filter, setFilter] = useState<IFilter>(initialFilter);
  const [isReset, setIsReset] = useState<boolean>(false);
  const state = {
    filter,
    setFilter,
  };
  const stateReset = {
    isReset,
    setIsReset,
  };

  console.log(AddFilter, carId);

  return (
    <article className="car-add-form">
      <Form
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 30 }}
        layout="vertical"
        scrollToFirstError
        onFinish={() => console.log(filter)}
      >
        <ManufacturedInputs state={state} isReset={stateReset} />
        <PriceSlider state={state} isReset={stateReset} />
        <MilleageSlider state={state} isReset={stateReset} />
        <BrandAndModelsFilter state={state} isReset={stateReset} />
        <Space>
          <ButtonTinder
            theme="accept"
            type="primary"
            htmlType="submit"
            loading={isLoading}
          >
            Добавить
          </ButtonTinder>
          <ButtonTinder
            theme="cancel"
            type="primary"
            loading={isLoading}
            onClick={() => setIsReset(true)}
          >
            Сбросить
          </ButtonTinder>
        </Space>
      </Form>
    </article>
  );
};
