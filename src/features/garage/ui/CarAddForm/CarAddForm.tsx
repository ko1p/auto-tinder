import {
  DatePicker,
  Drawer,
  Form,
  InputNumber,
  Space,
  Upload,
  UploadFile,
  UploadProps,
  message,
} from 'antd';
import React, { useEffect, useState } from 'react';

import { ApiError } from 'shared/api/error/error';
import { ButtonTinder } from 'shared/ui';
import { FilterForm } from 'entities/car/ui/CarFilters/FilterAddForm/FilterForm';
import { IError } from 'shared/lib/types';
import { PlusOutlined } from '@ant-design/icons';
import { RangePickerProps } from 'antd/lib/date-picker';
import { RcFile } from 'antd/lib/upload';
import TextArea from 'antd/lib/input/TextArea';
import { carAPI } from 'entities/car/model/CarService';
import moment from 'moment';
import { useAppSelector } from 'shared/lib/hooks/redux';
import { userSelector } from 'entities/user/model/state/authSelector';
import { garageAPI } from '../../model/query/garageService';
import { PriceAndMileageSelectors } from './FormSelectors/PriceAndMileageSelects';
import { NumberSelectors } from './FormSelectors/NumbersSelects';
import { ICarAddFormValues } from '../../lib/types';
import { EngineAndGearboxSelector } from './FormSelectors/EngineAndGearboxSelect';
import { CitySelector } from './FormSelectors/CitySelect';
import { BrandAndModelSelectors } from './FormSelectors/BrandAndModelSelects';
import { BodyAndDriveSelectors } from './FormSelectors/BodyAndDriveSelects';

// import { FilterAddForm, PrefAddForm } from './FilterAddForm';

const { Item } = Form;

export const CarAddForm = () => {
  const [form] = Form.useForm();
  const userId = useAppSelector(userSelector);
  const [newCarId, setNewCarId] = useState<string | null>(null);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [drawer, setDrawer] = useState<boolean>(false);
  const [isReset, setIsReset] = useState<boolean>(false);
  const stateReset = {
    isReset,
    setIsReset,
  };

  useEffect(() => {
    form.setFieldValue('manufacturedAt', undefined);
    form.setFieldValue('totalOwners', 1);
    form.setFieldValue('description', '');
    setIsReset(false);
  }, [isReset]);

  const [addCar, { isLoading }] = garageAPI.useAddCarMutation();
  const [addPhoto] = carAPI.useAddPhotoMutation();

  // eslint-disable-next-line consistent-return
  const AddCar = async (values: ICarAddFormValues) => {
    console.log(values);

    const {
      brand,
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
    const photos = new FormData();

    if (fileList.length)
      fileList.forEach((file) => {
        photos.append('imagesUrl', file as RcFile);
      });

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
      if (fileList.length)
        await addPhoto({ carId: data.id, data: photos }).unwrap();
      setNewCarId(`${data.id}`);
      setDrawer(true);
    } catch (e) {
      ApiError(e as IError);
    }
  };

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

  const disabledDate: RangePickerProps['disabledDate'] = (current) =>
    current && current > moment().endOf('day');

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
          <BrandAndModelSelectors form={form} reset={stateReset} />
          <Item
            label="Год производства"
            name="manufacturedAt"
            rules={[{ required: true }]}
          >
            <DatePicker disabledDate={disabledDate} picker="year" />
          </Item>
          <BodyAndDriveSelectors form={form} reset={stateReset} />
          <EngineAndGearboxSelector form={form} reset={stateReset} />
          <CitySelector form={form} reset={stateReset} />
          <NumberSelectors form={form} reset={stateReset} />
          <PriceAndMileageSelectors form={form} reset={stateReset} />
          <Item
            label="Общее кол-во владельцев"
            name="totalOwners"
            rules={[{ required: true }]}
          >
            <InputNumber min={1} max={99} />
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
          <Space style={{ alignItems: 'center', gap: 5 }}>
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
      <article className="car-filters">
        <Drawer
          title="Выберите предпочтения для обмена"
          width={320}
          closable={false}
          onClose={() => setDrawer(false)}
          open={drawer}
        >
          <FilterForm r="add" carId={newCarId!} />
        </Drawer>
      </article>
    </>
  );
};
