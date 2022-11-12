import { Form, Input, Space, message } from 'antd';

import { ApiError } from 'shared/api/error/error';
import { ButtonTinder } from 'shared/ui';
import { IError } from 'shared/lib/types';
import React from 'react';
import { useParams } from 'react-router';
import { IEditProfile, IUserProfileEditValues } from '../../lib/types';
import { userAPI } from '../../model/query/userProfileService';

const { Item } = Form;
const { Password } = Input;

export const EditProfile: React.FC<IEditProfile> = ({
  data,
  isEditOpen,
  setIsEditOpen,
}) => {
  const params = useParams();
  const [profilePatch, { isLoading }] = userAPI.useUserProfilePatchMutation();

  const submit = async (values: IUserProfileEditValues) => {
    if (!values) return;
    console.log(values);
    try {
      await profilePatch({
        data: { ...values },
        userId: params.userId!,
      }).unwrap();
      message.info('Профиль обновлён');
    } catch (e) {
      ApiError(e as IError);
    } finally {
      setIsEditOpen(false);
    }
  };

  return (
    <Form
      disabled={!isEditOpen}
      className="edit-profile__form"
      name="basic"
      labelCol={{ span: 7 }}
      wrapperCol={{ span: 16 }}
      autoComplete="off"
      scrollToFirstError
      onFinish={submit}
      initialValues={{
        name: data.name,
        email: data.email,
        phone: data.phone,
      }}
    >
      <Item label="Имя" name="name" rules={[{ required: false }]}>
        <Input />
      </Item>
      <Item label="Почта" name="email" rules={[{ required: false }]}>
        <Input />
      </Item>
      <Item label="Телефон" name="phone" rules={[{ required: false }]}>
        <Input />
      </Item>
      <Item
        label="Старый пароль"
        name="oldPassword"
        rules={[{ required: false }]}
      >
        <Password />
      </Item>
      <Item
        label="Новый пароль"
        name="newPassword"
        rules={[{ required: false }]}
      >
        <Password defaultValue="" />
      </Item>
      <Item
        label="Повторите пароль"
        name="newPasswordRepeat"
        rules={[
          { required: false },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('newPassword') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Пароли не совпадают'));
            },
          }),
        ]}
      >
        <Password defaultValue="" />
      </Item>

      <Space
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          gap: 20,
        }}
      >
        <ButtonTinder
          theme="accept"
          htmlType="submit"
          type="primary"
          loading={isLoading}
        >
          Отправить
        </ButtonTinder>
        <ButtonTinder
          theme="cancel"
          loading={isLoading}
          onClick={() => setIsEditOpen(false)}
        >
          Отменить
        </ButtonTinder>
      </Space>
    </Form>
  );
};
