"use client";

import { useAuth } from "@/hooks/useAuth";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { Form, Input, Checkbox, Button, theme, Spin, Alert } from "antd";
import { createSchemaFieldRule } from "antd-zod";
import GoogleLogo from "@/components/Common/Icons/GoogleLogo";
import { useTranslations } from "next-intl";
import { z } from "zod";
import { useState } from "react";

export interface RegistrationFormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignupForm = () => {
  const t = useTranslations("login");
  const { token } = theme.useToken();
  const [showGoogleSignIn, setShowGoogleSignIn] = useState(false);

  const {
    signUpMutation: { mutateAsync, isPending },
    loginWithGoogleMutation,
    error,
  } = useAuth();

  const [form] = Form.useForm();

  const onSubmit = async (values: RegistrationFormValues) => {
    try {
      await mutateAsync(values);
    } catch (error) {
      if ((error as Error).message === "EMAIL_LINK_REQUIRED") {
        setShowGoogleSignIn(true);
      }
    }
  };

  const handleGoogleSignIn = async () => {
      await loginWithGoogleMutation.mutateAsync();
  };

  const schema = z
    .object({
      username: z.string().nonempty(t("usernameRequired")),
      email: z.string().email(t("emailInvalid")).nonempty(t("emailRequired")),
      password: z
        .string()
        .min(6, t("passwordMinLength"))
        .nonempty(t("passwordRequired")),
      confirmPassword: z.string().nonempty(t("confirmpasswordRequired")),
    })
    .superRefine(({ confirmPassword, password }, ctx) => {
      if (confirmPassword !== password) {
        ctx.addIssue({
          code: "custom",
          message: t("confirmPasswordMustMatch"),
          path: ["confirmPassword"],
        });
      }
    });
  const rule = createSchemaFieldRule(schema);

  return (
    <Spin spinning={isPending}>
      <div style={{ backgroundColor: token.colorBgContainer }}>
        <Form
          form={form}
          onFinish={onSubmit}
          layout="vertical"
          labelAlign="left"
        >
          <div className="m-auto pb-6 text-center w-full">
            <h2 className="m-auto text-red-600 text-xl font-bold">
              {t("signup")}
            </h2>
          </div>
          <>
            <Form.Item label={t("username")} name="username" rules={[rule]}>
              <Input
                name="username"
                size="large"
                addonBefore={<UserOutlined className={"prefixIcon"} />}
                placeholder={t("username")}
              />
            </Form.Item>

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

            <Form.Item
              label={t("confirmPassword")}
              name="confirmPassword"
              rules={[rule]}
            >
              <Input.Password
                name="password"
                addonBefore={<LockOutlined className={"prefixIcon"} />}
                size="large"
                placeholder={t("confirmPassword")}
              />
            </Form.Item>
          </>

          <div
            style={{
              marginBlockEnd: 24,
            }}
          >
            <Checkbox name="autoLogin">{t("iAgree")}</Checkbox>
          </div>

          {error && !showGoogleSignIn && (
            <Alert
              message={error}
              type="error"
              showIcon
              style={{ marginBottom: 16 }}
            />
          )}

          {showGoogleSignIn ? (
            <div className="space-y-4">
              <Alert
                message={t("emailLinkRequired")}
                type="info"
                showIcon
                style={{ marginBottom: 16 }}
              />
              <Button
                size="large"
                className="bg-white border-gray-400 text-gray-600 hover:bg-gray-100"
                htmlType="button"
                block={true}
                onClick={handleGoogleSignIn}
              >
                <div className="flex items-center justify-center">
                  <div className="mr-2">
                    <GoogleLogo />
                  </div>
                  <span>{t("signInWithGoogle")}</span>
                </div>
              </Button>
            </div>
          ) : (
            <Button
              size="large"
              type="primary"
              className="bg-red-500 hover:bg-red-600"
              htmlType="submit"
              block={true}
            >
              {t("signup")}
            </Button>
          )}
        </Form>
      </div>
    </Spin>
  );
};

export default SignupForm;
