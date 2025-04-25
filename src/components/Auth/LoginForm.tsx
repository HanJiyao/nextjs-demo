import { LockOutlined, MailOutlined } from "@ant-design/icons";
import GoogleLogo from "@/components/Common/Icons/GoogleLogo";
import { Form, Input, Button, theme, Alert } from "antd";
import { createSchemaFieldRule } from "antd-zod";
import { useTranslations } from "next-intl";
import { z } from "zod";
import { useState } from "react";
import ForgotPasswordModal from "@/components/Modals/ForgotPasswordModal";
import { useAuth } from "@/hooks/useAuth";

export interface LoginFormValues {
  email: string;
  password: string;
}

const LoginForm = () => {
  const t = useTranslations("login");
  const { token } = theme.useToken();

  const [isOpenForgotPassword, setIsOpenForgotPassword] = useState(false);

  const [form] = Form.useForm();

 const { loginWithGoogleMutation, error } = useAuth();

  // const onSubmit = async (values: LoginFormValues) => {
  //   await mutateAsync(values);
  // };

  const schema = z.object({
    email: z.string().email(t("emailInvalid")).nonempty(t("emailRequired")),
    password: z
      .string()
      .min(6, t("passwordMinLength"))
      .nonempty(t("passwordRequired")),
  });

  const rule = createSchemaFieldRule(schema);

  return (
    <div style={{ backgroundColor: token.colorBgContainer }}>
        <Form
          form={form}
          // onFinish={onSubmit}
          layout="vertical"
          labelAlign="left"
        >
          <div className="m-auto pb-6 text-center w-full">
            <h2 className="m-auto text-red-600 text-xl font-bold">
              {t("login")}
            </h2>
          </div>
          <>
            <Form.Item label={t("email")} name="email" rules={[rule]}>
              <Input
                name={t("email")}
                type="email"
                size="large"
                addonBefore={<MailOutlined className={"prefixIcon"} />}
                placeholder={t("email")}
              />
            </Form.Item>

            <Form.Item label={t("password")} name="password" rules={[rule]}>
              <Input.Password
                name="password"
                addonBefore={<LockOutlined className={"prefixIcon"} />}
                size="large"
                placeholder={t("password")}
              />
            </Form.Item>
          </>

          {error && (
            <Alert
              message={error}
              type="error"
              showIcon
              style={{ marginBottom: 16 }}
            />
          )}

          <div className="flex flex-row gap-2">
            <Button
              size="large"
              type="default"
              htmlType="button"
              block={true}
              onClick={() => setIsOpenForgotPassword(true)}
            >
              <div className="flex flex-row">
                <span>{t("forgotPassword")}</span>
              </div>
            </Button>

            <Button
              size="large"
              type="primary"
              className="bg-red-500 hover:bg-red-600"
              htmlType="submit"
              block={true}
            >
              <div className="flex flex-row">
                <span>{t("login")}</span>
              </div>
            </Button>
          </div>
        </Form>

        <hr className="my-6 border-gray-300 border-t" />

        <div className="pb-6">
          <Button
            size="large"
            color="blue"
            className="bg-white border-gray-400 text-gray-600 hover:bg-gray-100"
            htmlType="button"
            block={true}
            onClick={() => loginWithGoogleMutation.mutate()}
          >
            <div className="mr-2">
              <GoogleLogo />
            </div>
            <span>{t("signInWithGoogle")}</span>
          </Button>
        </div>

        <ForgotPasswordModal
          open={isOpenForgotPassword}
          onClose={() => setIsOpenForgotPassword(false)}
        />
    </div>
  );
};

export default LoginForm;
