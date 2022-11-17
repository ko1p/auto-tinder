import { Form, Input, InputNumber, UploadFile } from 'antd';
import React, { useState } from 'react';

import { ApiError } from 'shared/api/error/error';
import { ButtonTinder } from 'shared/ui';
import { HighlightOutlined } from '@ant-design/icons';
import { IError } from 'shared/lib/types';
import { RcFile } from 'antd/lib/upload';
import TextArea from 'antd/lib/input/TextArea';
import { ICoupon } from '../lib/types';
import { CouponImageUpload } from './CouponImageUpload';
import { CouponDates } from './CouponDates';
import { adminAPI } from '../model/AdminService';

const { Item } = Form;

interface IProps {
  couponId: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  r: 'add' | 'patch';
  initialValues?: ICoupon;
}

export const CouponForm: React.FC<IProps> = ({
  couponId,
  setOpen,
  initialValues,
  r,
}) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [addPhoto] = adminAPI.useAddPhotoCouponMutation();
  const [patchCoupon, { isLoading: isPatchCouponLoading }] =
    adminAPI.usePatchCouponMutation();
  const [addCoupon, { isLoading: isAddCouponLoading }] =
    adminAPI.useAddCouponMutation();
  const [form] = Form.useForm();
  const [isReset, setIsReset] = useState<boolean>(false);

  const stateReset = {
    isReset,
    setIsReset,
  };

  const patchCouponHandler = async (values: ICoupon) => {
    try {
      const photos = new FormData();

      if (fileList.length) {
        fileList.forEach((file) => {
          photos.append('imagesUrl', file.originFileObj as RcFile);
        });
        await addPhoto({ couponId, data: photos }).unwrap();
      }

      if (r === 'patch') await patchCoupon({ couponId, data: values });
      if (r === 'add') await addCoupon(values);

      setFileList([]);
      setOpen(false);
    } catch (e) {
      ApiError(e as IError);
    }
  };

  return (
    <Form
      className="signin-form"
      initialValues={{ remember: true }}
      onFinish={patchCouponHandler}
      autoComplete="off"
    >
      <Item
        name="title"
        rules={[
          {
            required: true,
            message: 'Введите имя купона',
          },
        ]}
      >
        <Input prefix={<HighlightOutlined />} placeholder="Заголовок купона" />
      </Item>
      <Item
        name="price"
        rules={[
          {
            required: true,
            message: 'Введите цену купона',
          },
        ]}
      >
        <InputNumber prefix={<HighlightOutlined />} placeholder="Цена купона" />
      </Item>
      <Item
        name="companyOwner"
        rules={[
          {
            required: true,
            message: 'Исполнитель',
          },
        ]}
      >
        <Input
          prefix={<HighlightOutlined />}
          placeholder="Исполнитель купона"
        />
      </Item>
      <Item label="Детальное описание" name="description">
        <TextArea rows={4} />
      </Item>
      <Item label="Фотографии" name="photos">
        <CouponImageUpload fileList={fileList} setFileList={setFileList} />
      </Item>
      <Item label="Фотографии" name="photos">
        <CouponDates
          initialValues={{
            initialStartDate: initialValues?.startDate,
            initialEndDate: initialValues?.endDate,
          }}
          form={form}
          reset={stateReset}
        />
      </Item>
      <Item className="signin-form__item">
        <ButtonTinder
          className="signin-form__submit"
          theme="accept"
          loading={isPatchCouponLoading || isAddCouponLoading}
          type="primary"
          htmlType="submit"
        >
          Готово
        </ButtonTinder>
      </Item>
    </Form>
  );
};
