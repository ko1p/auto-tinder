import { Button, Modal } from 'antd';
import React, { useState } from 'react';

import { CouponForm } from './CouponForm/CouponForm';

export const AdminCouponAdd: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Добавить купон</Button>
      <Modal
        title="Добавить купон"
        centered
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
      >
        <CouponForm r="add" setOpen={setOpen} />
      </Modal>
    </>
  );
};
