import { Button, Modal } from 'antd';
import React, { useState } from 'react';

import { CouponForm } from './CouponForm';

interface IProps {
  couponId: string;
}

export const AdminCouponPatch: React.FC<IProps> = ({ couponId }) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Изменить купон</Button>
      <Modal
        title="Изменить купон"
        centered
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
      >
        <CouponForm r="patch" couponId={couponId} setOpen={setOpen} />
      </Modal>
    </>
  );
};
