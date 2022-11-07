import { ButtonTinder, InputTinder, PasswordTinder } from 'shared/ui';
import { Form, Modal, message } from 'antd';

import { ApiError } from 'shared/api/error/error';
import { IError } from 'shared/lib/types';
import React from 'react';
import { useParams } from 'react-router';
import { IEditProfile, IUserProfileEditValues } from '../lib/types';
import { userAPI } from '../model/query/userProfileService';

const { Item } = Form;

export const EditProfile: React.FC<IEditProfile> = ({
  data,
  isEditOpen,
  setIsEditOpen,
}) => {
  const params = useParams();
  const [profilePatch, { isLoading }] = userAPI.useUserProfilePatchMutation();

  const handleOk = () => {
    setIsEditOpen(false);
  };

  const handleCancel = () => {
    setIsEditOpen(false);
  };

  const submit = async (values: IUserProfileEditValues) => {
    if (!values) return;
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
    <Modal
      title="Редактирование профиля"
      open={isEditOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
    >
      <Form
        className="edit-profile__form"
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 30 }}
        layout="vertical"
        scrollToFirstError
        onFinish={submit}
        initialValues={{
          name: data.name,
          email: data.email,
          phone: data.phone,
        }}
      >
        <Item label="Имя" name="name" rules={[{ required: false }]}>
          <InputTinder />
        </Item>
        <Item label="Почта" name="email" rules={[{ required: false }]}>
          <InputTinder />
        </Item>
        <Item label="Телефон" name="phone" rules={[{ required: false }]}>
          <InputTinder />
        </Item>
        <h3>Смена пароля</h3>
        <Item
          label="Старый пароль"
          name="oldPassword"
          rules={[{ required: false }]}
        >
          <PasswordTinder defaultValue="" />
        </Item>
        <Item
          label="Новый пароль"
          name="newPassword"
          rules={[{ required: false }]}
        >
          <PasswordTinder defaultValue="" />
        </Item>
        <Item
          label="Новый пароль повторно"
          name="newPassword"
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
          <PasswordTinder defaultValue="" />
        </Item>

        <Item>
          <ButtonTinder
            style={{ width: '100%' }}
            theme="accept"
            htmlType="submit"
            type="primary"
            loading={isLoading}
          >
            Отправить
          </ButtonTinder>
        </Item>
      </Form>
    </Modal>
  );
};
