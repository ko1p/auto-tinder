import { Form, Select } from 'antd';
import React, { useState } from 'react';

import { ApiError } from 'shared/api/error/error';
import { ICarProperty } from 'entities/car/lib/types';
import { IError } from 'shared/lib/types';
import { carAPI } from 'entities/car/model/CarService';

const { Option } = Select;
const { Item } = Form;
interface IProps {
  setModel: React.Dispatch<React.SetStateAction<ICarProperty | null>>;
  setBrand: React.Dispatch<React.SetStateAction<ICarProperty | null>>;
}

export const BrandSelector: React.FC<IProps> = ({ setBrand, setModel }) => {
  const [brands, setBrands] = useState<ICarProperty[] | null>(null);
  const [useBrands, { isLoading }] = carAPI.useLazyCarBrandsQuery();

  const getBrands = async () => {
    try {
      const res = await useBrands('');
      setBrands(res.data!);
    } catch (e) {
      ApiError(e as IError);
    }
  };

  return (
    <Item label="Марка авто" name="brand" rules={[{ required: true }]}>
      <Select
        loading={isLoading}
        onSelect={setBrand}
        onChange={() => setModel(null)}
        onClick={getBrands}
      >
        {brands?.length &&
          brands.map((brand) => (
            <Option key={brand.id} value={brand.id}>
              {brand.name}
            </Option>
          ))}
      </Select>
    </Item>
  );
};
