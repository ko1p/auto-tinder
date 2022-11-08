import { CheckOutlined, CloseOutlined, PlusOutlined } from '@ant-design/icons';
import {
  DatePicker,
  Drawer,
  Form,
  Input,
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
import { BodySelector } from './FormSelectors/BodySelector';
import { BrandAndModelSelectors } from './FormSelectors/BrandAndModelSelectors';
import { CitySelector } from './FormSelectors/CitySelector';
import { DriveSelector } from './FormSelectors/DriveSelector';
import { EngineSelector } from './FormSelectors/EngineSelector';
import { FilterAddForm } from './FilterAddForm';
import { GearBoxSelector } from './FormSelectors/GearBoxSelector';
import { ICarAddFormValues } from '../lib/typest';
import { garageAPI } from '../model/query/garageService';

// import { FilterAddForm, PrefAddForm } from './FilterAddForm';

const { Item } = Form;

export const CarAddForm = () => {
  const userId = useAppSelector(userSelector);
  const [newCarId, setNewCarId] = useState<number | null>(null);
  const [drawer, setDrawer] = useState<boolean>(false);
  const [isForSale, setIsForSale] = useState<boolean>(false);
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
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 30 }}
          layout="vertical"
          scrollToFirstError
          onFinish={AddCar}
        >
          <BrandAndModelSelectors />
          <Item
            label="Год производства"
            name="manufacturedAt"
            rules={[{ required: true }]}
          >
            <DatePicker picker="year" />
          </Item>
          <BodySelector />
          <DriveSelector />
          <EngineSelector />
          <GearBoxSelector />
          <Item
            label="Предполагается обмен"
            name="isExchanged"
            valuePropName="isExchanged"
          >
            <Switch
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
              onChange={() => setIsForSale(!isForSale)}
            />
          </Item>
          <CitySelector disabled={!isForSale} />
          <Item label="Продвигается" name="isPromoted">
            <Switch
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
              disabled
            />
          </Item>
          <Item
            label="VIN"
            name="vinCode"
            rules={[{ required: true, min: 17, max: 17 }]}
          >
            <Input style={{ width: '100%' }} />
          </Item>
          <Item
            label="Гос. Номер"
            name="stateNumber"
            rules={[
              {
                required: true,
                message: 'Введите номер автомобиля в формате - А000АА00',
                pattern:
                  /^[АВЕКМНОРСТУХ]\d{3}(?<!000)[АВЕКМНОРСТУХ]{2}\d{2,3}$/,
              },
            ]}
          >
            <Input />
          </Item>
          <Item label="Цена в рублях" name="price" rules={[{ required: true }]}>
            <InputNumber />
          </Item>
          <Item label="Пробег" name="mileage" rules={[{ required: true }]}>
            <InputNumber style={{ width: '100%' }} />
          </Item>
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
