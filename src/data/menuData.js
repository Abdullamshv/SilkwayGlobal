import { useTranslation } from "react-i18next";

export const useMenuData = () => {
  const { t } = useTranslation();

  return [
    {
      title: t("programsSub.malaysia"),
      link: "/programs/malaysia",
    },
    {
      title: t("programsSub.czechia"),
      link: "/programs/czechia",
    },
    {
      title: t("programsSub.uk"),
      link: "/programs/uk",
    },
  ];
};