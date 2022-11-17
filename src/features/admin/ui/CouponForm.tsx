import { DollarCircleOutlined, HighlightOutlined } from '@ant-design/icons';
import { Form, Input, InputNumber, UploadFile } from 'antd';
import React, { useState } from 'react';

import { ApiError } from 'shared/api/error/error';
import { ButtonTinder } from 'shared/ui';
import { IError } from 'shared/lib/types';
import { RcFile } from 'antd/lib/upload';
import TextArea from 'antd/lib/input/TextArea';
import { CouponDates } from './CouponDates';
import { CouponImageUpload } from './CouponImageUpload';
import { ICoupon } from '../lib/types';
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
          photos.append('image', file.originFileObj as RcFile);
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
      layout="vertical"
      initialValues={{ remember: true }}
      onFinish={patchCouponHandler}
      autoComplete="off"
    >
      <Item
        style={{ width: '100%' }}
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
        style={{ width: '100%' }}
        name="price"
        rules={[
          {
            required: true,
            message: 'Введите цену купона',
          },
        ]}
      >
        <InputNumber
          prefix={<DollarCircleOutlined />}
          placeholder="Цена купона"
        />
      </Item>
      <Item
        style={{ width: '100%' }}
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
      <Item
        style={{ width: '100%' }}
        label="Детальное описание"
        name="description"
      >
        <TextArea rows={4} />
      </Item>
      <Item style={{ width: '100%' }} label="Фотографии" name="photos">
        <CouponImageUpload fileList={fileList} setFileList={setFileList} />
      </Item>
      <CouponDates
        initialValues={{
          initialStartDate: initialValues?.startDate,
          initialEndDate: initialValues?.endDate,
        }}
        form={form}
        reset={stateReset}
      />
      <Item style={{ width: '100%' }} className="signin-form__item">
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
