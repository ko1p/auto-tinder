export const divideBrandsAndModels = (brandsAndModels: string[]) => {
  const splited = brandsAndModels.map((str) => str.split('-'));
  const brands = splited
    .filter((item) => item.length === 2)
    .map((brand) => +brand.pop()!);
  const models = splited
    .filter((item) => item.length === 3)
    .map((brand) => +brand.pop()!);

  return [brands, models];
};
