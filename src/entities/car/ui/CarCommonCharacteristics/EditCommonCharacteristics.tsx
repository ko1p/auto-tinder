import { Form, InputNumber, UploadFile } from 'antd';
import React, { useState } from 'react';

import { ApiError } from 'shared/api/error/error';
import { ButtonTinder } from 'shared/ui';
import { ICarPatch } from 'entities/car/lib/types';
import { IError } from 'shared/lib/types';
import { RcFile } from 'antd/lib/upload';
import { carAPI } from 'entities/car/model/CarService';
import { CarImageUpload } from './CarImageUpload/CarImageUpload';

const { Item } = Form;

interface IProps {
  carId: string;
  price: number;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EditCommonCharacteristics: React.FC<IProps> = ({
  carId,
  price,
  setOpen,
}) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [addPhoto, { isLoading: isAddPhotoLoading }] =
    carAPI.useAddPhotoMutation();
  const [patch, { isLoading }] = carAPI.usePatchUserCarInfoMutation();
  const [form] = Form.useForm();

  form.setFieldValue('price', price);

  const update = async (values: ICarPatch) => {
    try {
      const photos = new FormData();

      if (fileList.length) {
        fileList.forEach((file) => {
          photos.append('imagesUrl', file.originFileObj as RcFile);
        });
        await addPhoto({ carId: +carId, data: photos }).unwrap();
      }

      await patch({ carId, data: values });

      setFileList([]);
      setOpen(false);
    } catch (err) {
      ApiError(err as IError);
    }
  };

  return (
    <Form
      form={form}
      labelCol={{ span: 10 }}
      wrapperCol={{ span: 30 }}
      layout="vertical"
      scrollToFirstError
      onFinish={update}
    >
      <Item label="Фотографии" name="photos">
        <CarImageUpload fileList={fileList} setFileList={setFileList} />
      </Item>
      <Item label="Цена" name="price">
        <InputNumber min={1} addonAfter="₽" style={{ width: '100%' }} />
      </Item>
      <ButtonTinder
        theme="accept"
        key="submit"
        htmlType="submit"
        type="primary"
        loading={isLoading || isAddPhotoLoading}
      >
        Изменить
      </ButtonTinder>
    </Form>
  );
};
