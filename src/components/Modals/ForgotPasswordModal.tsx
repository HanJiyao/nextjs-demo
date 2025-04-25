import React, { useState } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import { useTranslations } from "next-intl";
import { createSchemaFieldRule } from "antd-zod";
import { z } from "zod";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase/clientApp";

interface ForgotPasswordModalProps {
  open: boolean;
  onClose: () => void;
}

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({
  open,
  onClose,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const t = useTranslations("components.modals.forgotPasswordModal");

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();

      sendPasswordResetEmail(auth, values.email).then(() => {
        message.success(t("resetEmailSent"));
        form.resetFields();
        onClose();
      });
    } catch {
      message.error(t("resetError"));
    } finally {
      setLoading(false);
    }
  };

  const schema = z.object({
    email: z.string().email(t("invalidEmail")),
  });

  const rule = createSchemaFieldRule(schema);

  return (
    <Modal
      open={open}
      title={t("forgotPassword")}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          {t("cancel")}
        </Button>,
        <Button
          key="submit"
          type="primary"
          htmlType="submit"
          loading={loading}
          onClick={handleSubmit}
        >
          {t("submit")}
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item name="email" label={t("emailLabel")} rules={[rule]}>
          <Input placeholder={t("emailPlaceholder")} type="email" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ForgotPasswordModal;
