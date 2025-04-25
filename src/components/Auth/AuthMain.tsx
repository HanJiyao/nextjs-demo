"use client";
import Image from "next/image";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { theme } from "antd";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import LoginForm from "@/components/Auth/LoginForm";
import SignupForm from "@/components/Auth/SignupForm";

export default function AuthMain() {
  const { token } = theme.useToken();
  const t = useTranslations("login");
  const pathname = usePathname();
  const router = useRouter();
  const currentSearchParams = useSearchParams();
  const initialAction = currentSearchParams?.get("action");

  const [isLogin, setIsLogin] = useState<boolean>(
    initialAction ? initialAction === "login" : true
  );
  useEffect(() => {
    const action = isLogin ? "login" : "signup";

    const updatedSearchParams = new URLSearchParams(
      currentSearchParams?.toString()
    );
    updatedSearchParams.set("action", action);

    router.push(pathname + "?" + updatedSearchParams.toString());
  }, [isLogin, router, currentSearchParams, pathname]);
  return (
    <div
      className="relative w-full h-full flex flex-col justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/images/background.png')" }}
    >
      <div
        className="w-full h-full sm:w-auto sm:h-auto sm:max-w-[64rem] sm:max-h-[90%] m-auto sm:rounded-xl flex flex-row"
        style={{ backgroundColor: token.colorBgContainer }}
      >
        <div className="hidden sm:flex sm:w-1/2 h-full px-8 flex-col justify-center" >
          <Image
            src="/images/default-model.png"
            alt="Default Model"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
            className="rounded-lg m-auto px-8 py-8"
            crossOrigin="anonymous"
          />
        </div>
        <div className="form-container w-full py-16 px-8">
          <div>
            {isLogin ? <LoginForm /> : <SignupForm />}
            <div className="pt-12 pb-14 text-gray-700 w-full text-center sticky bottom-0">
              {isLogin ? (
                <div>
                  {t("dontHaveAnAccount")}{" "}
                  <button
                    type="button"
                    className="text-red-600 px-2"
                    onClick={() => setIsLogin(false)}
                  >
                    {t("signup")}
                  </button>
                </div>
              ) : (
                <div>
                  {t("haveAnAccount")}{" "}
                  <button
                    type="button"
                    className="text-red-600 px-2"
                    onClick={() => setIsLogin(true)}
                  >
                    {t("login")}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
