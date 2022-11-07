import { Form, Select } from 'antd';
import React, { useState } from 'react';

import { ApiError } from 'shared/api/error/error';
import { ICarProperty } from 'entities/car/lib/types';
import { IError } from 'shared/lib/types';
import { carAPI } from 'entities/car/model/CarService';

const { Option } = Select;
const { Item } = Form;

export const BrandAndModelSelectors: React.FC = () => {
  const [brand, setBrand] = useState<ICarProperty | null>(null);
  const [model, setModel] = useState<ICarProperty | null>(null);
  const [brandsOptions, setBrandsOptions] = useState<ICarProperty[] | null>(
    null
  );
  const [modelsOptions, setModelsOptions] = useState<ICarProperty[] | null>(
    null
  );
  const [useBrands, { isLoading: isBrandsLoading }] =
    carAPI.useLazyCarBrandsQuery();
  const [useModels, { isLoading: isModelsLoading }] =
    carAPI.useLazyCarModelsQuery();

  const getBrandsOptions = async () => {
    try {
      const result = await useBrands('');
      setBrandsOptions(result.data!);
    } catch (e) {
      ApiError(e as IError);
    }
  };
  const getModelsOptions = async () => {
    try {
      const res = await useModels(brand?.id);
      setModelsOptions(res.data!);
    } catch (e) {
      ApiError(e as IError);
    }
  };

  const brandChange = async (value: number) => {
    try {
      const newBrand = brandsOptions?.find((opt) => opt.id === value);
      if (newBrand) setBrand(newBrand);
      const res = await useModels(value);
      setModelsOptions(res.data!);
      setModel(res.data![0]);
    } catch (e) {
      ApiError(e as IError);
    }
  };
  const modelChange = async (value: number) => {
    try {
      const newModel = modelsOptions?.find((opt) => opt.id === value);
      if (newModel) setModel(newModel);
    } catch (e) {
      ApiError(e as IError);
    }
  };

  return (
    <>
      <Item label="Марка авто" name="brand" rules={[{ required: true }]}>
        <Select
          loading={isBrandsLoading}
          onChange={brandChange}
          onClick={getBrandsOptions}
        >
          {brandsOptions?.length &&
            brandsOptions.map((option) => (
              <Option key={option.id} value={option.id}>
                {option.name}
              </Option>
            ))}
        </Select>
      </Item>
      <Item
        label="Модель"
        name="model"
        valuePropName="model"
        rules={[{ required: true }]}
      >
        <Select
          disabled={!brand}
          loading={isModelsLoading && isBrandsLoading}
          onClick={getModelsOptions}
          onChange={modelChange}
          value={model?.id || null}
        >
          {modelsOptions?.length &&
            modelsOptions.map((option) => (
              <Option key={option.id} value={option.id}>
                {option.name}
              </Option>
            ))}
        </Select>
      </Item>
    </>
  );
};
