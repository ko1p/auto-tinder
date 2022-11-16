/* eslint-disable consistent-return */

import { Form, FormInstance, Skeleton, TreeSelect } from 'antd';
import React, { useEffect, useState } from 'react';

import { ApiError } from 'shared/api/error/error';
import { ICarProperty } from 'entities/car/lib/types';
import { IError } from 'shared/lib/types';
import { IResetState } from 'features/garage/lib/types';
import { carAPI } from 'entities/car/model/CarService';

const { SHOW_PARENT } = TreeSelect;
const { Item } = Form;

interface ITreeData {
  title: string;
  value: string;
  key: string;
  children?: ITreeData[];
}

interface IinitialValues {
  initialBrands?: ICarProperty[];
  initialModels?: ICarProperty[];
}

interface IProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: FormInstance<any>;
  reset: IResetState;
  initialValues: IinitialValues;
}

export const BrandOrModelTreeSelector: React.FC<IProps> = ({
  form,
  reset: { isReset, setIsReset },
  initialValues: { initialBrands, initialModels },
}) => {
  const [value, setValue] = useState<string[]>();
  const { data: brands, isLoading: isBrandsLoading } =
    carAPI.useCarBrandsQuery('');
  const [useModels] = carAPI.useLazyCarModelsQuery();
  const [treeData, setTreeData] = useState<ITreeData[] | null>(null);

  useEffect(() => {
    if (!initialBrands && !initialModels) {
      form.setFieldValue('brandsAndModels', undefined);
      return setIsReset(false);
    }
    if (!treeData) return undefined;

    const initialData = () => {
      const initialValuesArray: string[] = [];
      initialModels!.forEach((initialModel) => {
        treeData.forEach((brand) => {
          brand.children?.forEach((model) => {
            if (model.value.split('-').pop() === `${initialModel.id}`)
              initialValuesArray.push(model.value);
          });
        });
      });
      initialBrands!.forEach((initialBrand) =>
        initialValuesArray.push(`0-${initialBrand.id}`)
      );
      return initialValuesArray;
    };

    form.setFieldValue('brandsAndModels', initialData());
  }, [isReset, treeData]);

  useEffect(() => {
    const getModels = async (id: number) => {
      try {
        const { data } = await useModels(id);
        return data;
      } catch (err) {
        ApiError(err as IError);
      }
      return null;
    };

    const makeData = async () => {
      const response = brands!.map(async ({ id: brandId, name: brandName }) => {
        const models = await getModels(brandId);
        return {
          title: brandName,
          value: `0-${brandId}`,
          key: `0-${brandId}`,
          children: models!.map(({ id: modelId, name: modelName }) => ({
            title: modelName,
            value: `0-${brandId}-${modelId}`,
            key: `0-${brandId}-${modelId}`,
          })),
        };
      });
      // eslint-disable-next-line no-return-await
      return Promise.all(response);
    };
    makeData()
      .then(setTreeData)
      .catch((e) => ApiError(e as IError));
  }, [brands]);

  const onChange = (newValue: string[]) => {
    setValue(newValue);
  };

  const tProps = {
    treeData: treeData!,
    value,
    onChange,
    treeCheckable: true,
    showCheckedStrategy: SHOW_PARENT,
    placeholder: 'Выберите бренды или модели',
    style: {
      width: '100%',
    },
  };

  return isBrandsLoading ? (
    <Skeleton.Input />
  ) : (
    <Item
      labelCol={{ span: 20 }}
      label="Выберите бренд и марку"
      name="brandsAndModels"
    >
      <TreeSelect {...tProps} />
    </Item>
  );
};
