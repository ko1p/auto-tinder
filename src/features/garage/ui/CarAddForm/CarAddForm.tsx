import { CheckOutlined, CloseOutlined, PlusOutlined } from '@ant-design/icons';
import {
  DatePicker,
  Drawer,
  Form,
  InputNumber,
  Space,
  Switch,
  Upload,
  UploadFile,
  UploadProps,
  message,
} from 'antd';
import React, { useState } from 'react';

import { ApiError } from 'shared/api/error/error';
import { ButtonTinder } from 'shared/ui';
import { IError } from 'shared/lib/types';
import { RcFile } from 'antd/lib/upload';
import TextArea from 'antd/lib/input/TextArea';
import { useAppSelector } from 'shared/lib/hooks/redux';
import { userSelector } from 'entities/user/model/state/authSelector';
import { BodyAndDriveSelectors } from './FormSelectors/BodyAndDriveSelects';
import { BrandAndModelSelectors } from './FormSelectors/BrandAndModelSelects';
import { CitySelector } from './FormSelectors/CitySelect';
import { EngineAndGearboxSelector } from './FormSelectors/EngineAndGearboxSelect';
import { FilterAddForm } from '../FilterAddForm/FilterAddForm';
import { ICarAddFormValues } from '../../lib/typest';
import { NumberSelectors } from './FormSelectors/NumbersSelects';
import { PriceAndMileageSelectors } from './FormSelectors/PriceAndMileageSelects';
import { garageAPI } from '../../model/query/garageService';

// import { FilterAddForm, PrefAddForm } from './FilterAddForm';

const { Item } = Form;

export const CarAddForm = () => {
  const [form] = Form.useForm();
  const userId = useAppSelector(userSelector);
  const [newCarId, setNewCarId] = useState<number | null>(null);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [drawer, setDrawer] = useState<boolean>(false);
  const [addCar, { isLoading, isSuccess }] = garageAPI.useAddCarMutation();
  const [addPhoto] = garageAPI.useAddPhotoMutation();
  const photoProps: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);

      return false;
    },
    fileList,
  };
  // eslint-disable-next-line consistent-return
  const AddCar = async (values: ICarAddFormValues) => {
    console.log(values);

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
      isExchanged = false,
      vinCode,
      stateNumber,
      price,
      mileage,
      totalOwners,
      description,
    } = values;
    console.log(fileList);
    const photos = new FormData();

    fileList.forEach((file) => {
      photos.append('imagesUrl', file as RcFile);
    });
    console.log(photos);

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
      await addPhoto({ carId: data.id, data: photos }).unwrap();
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

          <Item label="Фото автомобиля" name="fileList">
            <Upload {...photoProps} listType="picture-card">
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Фото</div>
              </div>
            </Upload>
          </Item>
          <Space.Compact block style={{ alignItems: 'center', gap: 5 }}>
            <ButtonTinder
              theme="accept"
              type="primary"
              htmlType="submit"
              loading={isLoading}
              disabled={isSuccess}
            >
              Добавить
            </ButtonTinder>
            <ButtonTinder
              theme="accent"
              loading={isLoading}
              disabled={!isSuccess}
              onClick={() => setDrawer(true)}
            >
              Обмен
            </ButtonTinder>
          </Space.Compact>
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
