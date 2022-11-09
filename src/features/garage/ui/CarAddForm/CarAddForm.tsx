import { CheckOutlined, CloseOutlined, PlusOutlined } from '@ant-design/icons';
import {
  DatePicker,
  Drawer,
  Form,
  InputNumber,
  Switch,
  Upload,
  message,
} from 'antd';
import React, { useState } from 'react';

import { ApiError } from 'shared/api/error/error';
import { ButtonTinder } from 'shared/ui';
import { IError } from 'shared/lib/types';
import TextArea from 'antd/lib/input/TextArea';
import { useAppSelector } from 'shared/lib/hooks/redux';
import { userSelector } from 'entities/user/model/state/authSelector';
import { BodyAndDriveSelectors } from './FormSelectors/BodyAndDriveSelectors';
import { BrandAndModelSelectors } from './FormSelectors/BrandAndModelSelectors';
import { CitySelector } from './FormSelectors/CitySelector';
import { EngineAndGearboxSelector } from './FormSelectors/EngineAndGearboxSelector';
import { FilterAddForm } from '../FilterAddForm/FilterAddForm';
import { ICarAddFormValues } from '../../lib/typest';
import { NumberSelectors } from './FormSelectors/NumbersSelectors';
import { PriceAndMileageSelectors } from './FormSelectors/PriceAndMileageSelectors';
import { garageAPI } from '../../model/query/garageService';

// import { FilterAddForm, PrefAddForm } from './FilterAddForm';

const { Item } = Form;

export const CarAddForm = () => {
  const [form] = Form.useForm();
  const userId = useAppSelector(userSelector);
  const [newCarId, setNewCarId] = useState<number | null>(null);
  const [drawer, setDrawer] = useState<boolean>(false);
  const [addCar, { isLoading, isSuccess }] = garageAPI.useAddCarMutation();

  // eslint-disable-next-line consistent-return
  const AddCar = async (values: ICarAddFormValues) => {
    const {
      brand,
      // isPromoted,
      model,
      manufacturedAt,
      body,
      exchangeCity,
      drive,
      engine,
      gearbox,
      isExchanged,
      vinCode,
      stateNumber,
      price,
      mileage,
      totalOwners,
      description,
      // fileList,
    } = values;

    try {
      if (!userId) return message.error('Неавторизованный пользователь');
      const data = await addCar({
        brand,
        isPromoted: false,
        model,
        manufacturedAt: +manufacturedAt.format('YYYY'),
        body,
        exchangeCity,
        drive,
        engine,
        gearbox,
        isExchanged,
        vinCode,
        stateNumber,
        price,
        mileage,
        totalOwners,
        description: description || '',
        userId,
      }).unwrap();
      setNewCarId(data.id);
      setDrawer(true);
    } catch (e) {
      ApiError(e as IError);
    }
  };

  return (
    <>
      <article className="car-add-form">
        <Form
          form={form}
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 30 }}
          layout="vertical"
          scrollToFirstError
          onFinish={AddCar}
        >
          <BrandAndModelSelectors form={form} />
          <Item
            label="Год производства"
            name="manufacturedAt"
            rules={[{ required: true }]}
          >
            <DatePicker picker="year" />
          </Item>
          <BodyAndDriveSelectors />
          <EngineAndGearboxSelector />
          <CitySelector />
          <Item label="Продвигается" name="isPromoted">
            <Switch
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
              disabled
            />
          </Item>
          <NumberSelectors />
          <PriceAndMileageSelectors />
          <Item
            label="Общее кол-во владельцев"
            name="totalOwners"
            rules={[{ required: true }]}
          >
            <InputNumber min={1} />
          </Item>

          <Item label="Детальное описание" name="description">
            <TextArea rows={4} />
          </Item>

          <Item label="Фото автомобиля" valuePropName="fileList">
            <Upload action="/upload.do" listType="picture-card">
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Фото</div>
              </div>
            </Upload>
          </Item>
          <Item>
            <ButtonTinder
              theme="accept"
              type="primary"
              htmlType="submit"
              loading={isLoading}
              disabled={isSuccess}
              onClick={() => setDrawer(true)}
            >
              Добавить
            </ButtonTinder>
          </Item>
        </Form>
      </article>
      <article className="car-filters">
        <Drawer
          title="Выберите предпочтения для обмена"
          width={320}
          closable={false}
          onClose={() => setDrawer(false)}
          open={drawer}
        >
          <FilterAddForm carId={newCarId!} />
        </Drawer>
      </article>
    </>
  );
};
