import { CheckOutlined, CloseOutlined, PlusOutlined } from '@ant-design/icons';
import {
  DatePicker,
  Drawer,
  Form,
  Input,
  InputNumber,
  Switch,
  Upload,
} from 'antd';
import React, { useState } from 'react';

import { ButtonTinder } from 'shared/ui';
import { ICarProperty } from 'entities/car/lib/types';
import TextArea from 'antd/lib/input/TextArea';
import { BodySelector } from './FormSelectors/BodySelector';
import { BrandSelector } from './FormSelectors/BrandSelector';
import { CitySelector } from './FormSelectors/CitySelector';
import { DriveSelector } from './FormSelectors/DriveSelector';
import { EngineSelector } from './FormSelectors/EngineSelector';
import { GearBoxSelector } from './FormSelectors/GearBoxSelector';
import { ModelSelector } from './FormSelectors/ModelSelector';

const { Item } = Form;

export const CarAddForm = () => {
  const [drawer, setDrawer] = useState<boolean>(false);
  const [isForSale, setIsForSale] = useState<boolean>(false);
  const [brand, setBrand] = useState<ICarProperty | null>(null);
  const [model, setModel] = useState<ICarProperty | null>(null);

  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <>
      <article className="car-add-form">
        <Form
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 30 }}
          layout="vertical"
          scrollToFirstError
          // onValuesChange={ }
          // disabled={ }
          onFinish={onFinish}
        >
          <BrandSelector setBrand={setBrand} setModel={setModel} />
          <ModelSelector brand={brand} model={model} setModel={setModel} />
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
          <Item label="Предполагается обмен" valuePropName="isExchanged">
            <Switch
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
              onChange={() => setIsForSale(!isForSale)}
            />
          </Item>
          <CitySelector disabled={!isForSale} />
          <Item label="Продвигается" valuePropName="isPromoted">
            <Switch
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
              disabled
            />
          </Item>
          <Item label="VIN" name="vinCode" rules={[{ required: true }]}>
            <InputNumber style={{ width: '100%' }} />
          </Item>
          <Item
            label="Гос. Номер"
            name="stateNumber"
            rules={[{ required: true }]}
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
            <InputNumber />
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
              // onClick={() => setDrawer(true)}
            >
              Добавить
            </ButtonTinder>
          </Item>
        </Form>
      </article>
      <article className="car-filters">
        <Drawer
          title="Two-level Drawer"
          width={320}
          closable={false}
          onClose={() => setDrawer(false)}
          open={drawer}
        >
          This is two-level drawer
        </Drawer>
      </article>
    </>
  );
};
