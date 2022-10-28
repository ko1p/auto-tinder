import { MenuItem } from '@mui/material';
import { ListItem } from './types';

export function buildSelectItems(data: ListItem[]): JSX.Element[] {
  return data.map(item => (
    <MenuItem value={item.id} key={item.id}>
      {item.name}
    </MenuItem>
  ));
}
