import { Form, Select } from 'antd';
import React, { useState } from 'react';

import { ApiError } from 'shared/api/error/error';
import { ICarProperty } from 'entities/car/lib/types';
import { IError } from 'shared/lib/types';
import { carAPI } from 'entities/car/model/CarService';

const { Option } = Select;
const { Item } = Form;

interface IProps {
  brand: ICarProperty | null;
  model: ICarProperty | null;
  setModel: React.Dispatch<React.SetStateAction<ICarProperty | null>>;
}

export const ModelSelector: React.FC<IProps> = ({ brand, model, setModel }) => {
  const [models, setModels] = useState<ICarProperty[] | null>(null);
  const [useModels, { isLoading }] = carAPI.useLazyCarModelsQuery();

  const getModels = async () => {
    try {
      const res = await useModels(brand);
      setModels(res.data!);
    } catch (e) {
      ApiError(e as IError);
    }
  };

  const setModelById = (id: string) => {
    const mdl = models?.find((i) => `${i.id}` === id);
    if (mdl) setModel(mdl);
  };

  return (
    <Item
      label="Модель"
      name="model"
      valuePropName="model"
      rules={[{ required: true }]}
    >
      <Select
        disabled={!brand}
        loading={isLoading}
        onClick={getModels}
        value={model?.name || null}
        onSelect={setModelById}
      >
        {models?.length &&
          models.map((mdl) => (
            <Option key={mdl.id} value={mdl.id}>
              {mdl.name}
            </Option>
          ))}
      </Select>
    </Item>
  );
};
