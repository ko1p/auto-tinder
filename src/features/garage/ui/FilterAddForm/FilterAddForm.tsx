/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable consistent-return */

import { Form, Space, message } from 'antd';
import React, { useState } from 'react';

import { ApiError } from 'shared/api/error/error';
import { ButtonTinder } from 'shared/ui';
import { IError } from 'shared/lib/types';
import { divideBrandsAndModels } from 'features/garage/lib/utils/divideBrandsAndModels';
import { useAppSelector } from 'shared/lib/hooks/redux';
import { userSelector } from 'entities/user/model/state/authSelector';
import { BodyAndDriveMultipleSelects } from './FilterSelectors/BodyAndDriveMultipleSelects';
import { BrandOrModelTreeSelector } from './FilterSelectors/BrandOrModelTreeSelect';
import { CitiesSelect } from './FilterSelectors/CitiesSelect';
import { EngineAndGearboxMultipleSelects } from './FilterSelectors/EngineAndGearboxMultipleSelects';
import { IFilter } from '../../lib/types';
import { ManufacturedInputs } from './FilterSelectors/ManufacturedInputs';
import { MilleageSlider } from './FilterSelectors/MilleageSlider';
import { PriceSlider } from './FilterSelectors/PriceSlider';
import { garageAPI } from '../../model/query/garageService';

interface IProps {
  carId: number;
}

export const FilterAddForm: React.FC<IProps> = ({ carId }) => {
  const [form] = Form.useForm();
  const userId = useAppSelector(userSelector);
  const [AddFilter, { isLoading }] = garageAPI.useAddFilterMutation();
  const [isReset, setIsReset] = useState<boolean>(false);

  const stateReset = {
    isReset,
    setIsReset,
  };

  const sendFilter = async (values: any) => {
    const [brands, models] = divideBrandsAndModels(values.brandsAndModels);
    const [manufacturedAtStart, manufacturedAtFinish] = [
      +values.year[0].format('YYYY'),
      +values.year[1].format('YYYY'),
    ];
    const [priceStart, priceFinish] = [...values.minmaxPrice];
    const [mileageStart, mileageFinish] = [...values.minmaxMile];
    const { body, gearbox, engine, drive, exchangeCities } = values;

    const filter: IFilter = {
      city: exchangeCities,
      brands,
      models,
      body,
      gearbox,
      engine,
      drive,
      manufacturedAtStart,
      manufacturedAtFinish,
      priceStart,
      priceFinish,
      mileageStart,
      mileageFinish,
    };
    try {
      if (!userId) return message.error('Неавторизованный пользователь');
      await AddFilter({ carId, filter }).unwrap();
    } catch (e) {
      ApiError(e as IError);
    }
  };

  return (
    <article className="car-add-form">
      <Form
        form={form}
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 30 }}
        layout="vertical"
        scrollToFirstError
        onFinish={sendFilter}
      >
        <BrandOrModelTreeSelector form={form} reset={stateReset} />
        <BodyAndDriveMultipleSelects form={form} reset={stateReset} />
        <EngineAndGearboxMultipleSelects form={form} reset={stateReset} />
        <PriceSlider form={form} reset={stateReset} />
        <MilleageSlider form={form} reset={stateReset} />
        <ManufacturedInputs form={form} reset={stateReset} />
        <CitiesSelect form={form} reset={stateReset} />
        <Space>
          <ButtonTinder
            theme="accept"
            type="primary"
            htmlType="submit"
            loading={isLoading}
            onClick={(e) => console.log(e)}
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
