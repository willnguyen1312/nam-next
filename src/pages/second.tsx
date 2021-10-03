import Link from "next/link";
import { Button, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const SecondPage = () => {
  const router = useRouter();
  const { t: tSecond } = useTranslation("second-page");
  const { t: tCommon } = useTranslation("common");

  return (
    <main>
      <VStack>
        <Link passHref href="/">
          <Button>{tSecond("back-to-home")}</Button>
        </Link>
        <Link
          passHref
          href="/second"
          locale={router.locale === "en" ? "de" : "en"}
        >
          <Button>{tCommon("change-locale")}</Button>
        </Link>
      </VStack>
    </main>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["second-page", "common"])),
  },
});

export default SecondPage;
