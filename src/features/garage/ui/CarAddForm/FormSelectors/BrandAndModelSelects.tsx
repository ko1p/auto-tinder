import { Form, FormInstance, Select, Space } from 'antd';
import React, { useEffect, useState } from 'react';

import { ApiError } from 'shared/api/error/error';
import { ICarProperty } from 'entities/car/lib/types';
import { IError } from 'shared/lib/types';
import { IResetState } from 'features/garage/lib/types';
import { carAPI } from 'entities/car/model/CarService';

const { Option } = Select;
const { Item } = Form;

interface IProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: FormInstance<any>;
  reset: IResetState;
}

export const BrandAndModelSelectors: React.FC<IProps> = ({
  form,
  reset: { isReset, setIsReset },
}) => {
  useEffect(() => {
    form.setFieldValue('brand', undefined);
    form.setFieldValue('model', undefined);
    setIsReset(false);
  }, [isReset]);

  const [brand, setBrand] = useState<ICarProperty | null>(null);
  const [isBrandChecked, setIsBrandChecked] = useState<boolean>(false);
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
    } catch (e) {
      ApiError(e as IError);
    }
  };

  return (
    <Space.Compact block style={{ alignItems: 'center', gap: 5 }}>
      <Item
        style={{ width: 150 }}
        label="Марка авто"
        name="brand"
        rules={[{ required: true }]}
      >
        <Select
          loading={isBrandsLoading}
          onChange={(e) => {
            form.resetFields(['model']);
            setIsBrandChecked(true);
            brandChange(e);
          }}
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
        style={{ width: 150 }}
        label="Модель авто"
        name="model"
        valuePropName="model"
        rules={[{ required: true }]}
      >
        <Select
          disabled={!isBrandChecked}
          loading={isModelsLoading && isBrandsLoading}
          onClick={getModelsOptions}
        >
          {modelsOptions?.length &&
            modelsOptions.map((option) => (
              <Option key={option.id} value={option.id}>
                {option.name}
              </Option>
            ))}
        </Select>
      </Item>
    </Space.Compact>
  );
};
