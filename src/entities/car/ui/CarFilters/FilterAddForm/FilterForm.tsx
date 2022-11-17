/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable consistent-return */

import { Form, Space, message } from 'antd';
import { IFilter, IGetFilter } from 'entities/car/lib/types';
import React, { useState } from 'react';

import { ApiError } from 'shared/api/error/error';
import { ButtonTinder } from 'shared/ui';
import { IError } from 'shared/lib/types';
import { carAPI } from 'entities/car/model/CarService';
import { divideBrandsAndModels } from 'entities/car/lib/utils/divideBrandsAndModels';
import { useAppSelector } from 'shared/lib/hooks/redux';
import { userSelector } from 'entities/user/model/state/authSelector';
import { BodyAndDriveMultipleSelects } from './FilterSelectors/BodyAndDriveMultipleSelects';
import { BrandOrModelTreeSelector } from './FilterSelectors/BrandOrModelTreeSelect';
import { CitiesSelect } from './FilterSelectors/CitiesSelect';
import { EngineAndGearboxMultipleSelects } from './FilterSelectors/EngineAndGearboxMultipleSelects';
import { ManufacturedInputs } from './FilterSelectors/ManufacturedInputs';
import { MilleageSlider } from './FilterSelectors/MilleageSlider';
import { PriceSlider } from './FilterSelectors/PriceSlider';

interface IProps {
  carId: string;
  r: 'add' | 'patch';
  initialValues?: IGetFilter;
}

export const FilterForm: React.FC<IProps> = ({ carId, initialValues, r }) => {
  const [form] = Form.useForm();
  const userId = useAppSelector(userSelector);
  const [AddFilter, { isLoading: isAddLoading }] =
    carAPI.useAddFilterMutation();
  const [PatchFilter, { isLoading: IsPatchLoading }] =
    carAPI.usePatchFilterMutation();
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
    const { bodies, gearboxes, engines, drives, exchangeCities: city } = values;

    const filter: IFilter = {
      city: city.map((item: { value: any }) => item.value || item),
      brands,
      models,
      bodies: bodies.map((body: { value: any }) => body.value || body),
      gearboxes: gearboxes.map((box: { value: any }) => box.value || box),
      engines: engines.map((engine: { value: any }) => engine.value || engine),
      drives: drives.map((drive: { value: any }) => drive.value || drive),
      manufacturedAtStart,
      manufacturedAtFinish,
      priceStart,
      priceFinish,
      mileageStart,
      mileageFinish,
    };
    try {
      if (!userId) return message.error('Неавторизованный пользователь');
      if (r === 'add') await AddFilter({ carId, filter }).unwrap();
      if (r === 'patch') await PatchFilter({ carId, filter }).unwrap();
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
        <BrandOrModelTreeSelector
          initialValues={{
            initialBrands: initialValues?.brands,
            initialModels: initialValues?.models,
          }}
          form={form}
          reset={stateReset}
        />
        <BodyAndDriveMultipleSelects
          initialValues={{
            initialBodies: initialValues?.bodies,
            initialDrives: initialValues?.drives,
          }}
          form={form}
          reset={stateReset}
        />
        <EngineAndGearboxMultipleSelects
          initialValues={{
            initialEngines: initialValues?.engines,
            initialGearboxes: initialValues?.gearboxes,
          }}
          form={form}
          reset={stateReset}
        />
        <PriceSlider
          initialValues={{
            initialPriceMin: initialValues?.priceStart,
            initialPriceMax: initialValues?.priceFinish,
          }}
          form={form}
          reset={stateReset}
        />
        <MilleageSlider
          initialValues={{
            initialMileageMin: initialValues?.mileageStart,
            initialMileageMax: initialValues?.mileageFinish,
          }}
          form={form}
          reset={stateReset}
        />
        <ManufacturedInputs
          initialValues={{
            initialManufactoredMin: initialValues?.manufacturedAtStart,
            initialManufactoredMax: initialValues?.manufacturedAtFinish,
          }}
          form={form}
          reset={stateReset}
        />
        <CitiesSelect
          initialValues={{
            initialCities: initialValues?.city,
          }}
          form={form}
          reset={stateReset}
        />
        <Space>
          <ButtonTinder
            theme="accept"
            type="primary"
            htmlType="submit"
            loading={isAddLoading || IsPatchLoading}
            onClick={(e) => console.log(e)}
          >
            Добавить
          </ButtonTinder>
          <ButtonTinder
            theme="cancel"
            type="primary"
            loading={isAddLoading || IsPatchLoading}
            onClick={() => setIsReset(true)}
          >
            Сбросить
          </ButtonTinder>
        </Space>
      </Form>
    </article>
  );
};
