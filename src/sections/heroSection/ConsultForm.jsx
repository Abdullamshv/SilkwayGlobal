import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import cross from "./../../assets/heroSection_imgs/form_cross.svg";

export default function ConsultForm({ closePanel }) {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    phoneNumber: "",
  });

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") closePanel();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closePanel]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = { fullName: "", phoneNumber: "" };
    let isValid = true;

    if (!formData.fullName.trim()) {
      newErrors.fullName = t("consult.errorFullName");
      isValid = false;
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = t("consult.errorPhone");
      isValid = false;
    } else if (!/^\+?\d{10,15}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = t("consult.invalidPhone");
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      const payload = {
        full_name: formData.fullName,
        phone_number: formData.phoneNumber,
      };

      fetch("http://localhost:8000/api/v1/consultations/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((res) => {
          if (!res.ok) throw new Error("submit error");
          return res.json();
        })
        .then((data) => {
          toast.success(data.message || t("consult.successMessage"));
          setFormData({ fullName: "", phoneNumber: "" });
          closePanel();
        })
        .catch(() => {
          toast.error(t("consult.errorSubmit"));
        });
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-gray-900/60 z-40" onClick={closePanel} />
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="flex items-center justify-center max-w-lg mx-auto p-6 bg-white shadow-lg rounded-xl font-[montserrat] relative">
          <form onSubmit={handleSubmit} className="mx-10 space-y-6 w-full">
            <div className="w-full relative text-start">
              <button
                type="button"
                onClick={closePanel}
                className="absolute right-0 top-0 text-gray-500 hover:text-gray-700 text-xl hover:cursor-pointer"
              >
                <img src={cross} alt="close" />
              </button>
              <h1 className="text-4xl text-black mb-2 font-semibold">
                {t("consult.title")}
              </h1>
              <p className="text-gray-600">{t("consult.subtitle")}</p>
            </div>

            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-black"
              >
                {t("consult.fullNameLabel")}
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder={t("consult.fullNamePlaceholder")}
                value={formData.fullName}
                onChange={handleChange}
                className={`mt-1 block w-full p-3 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.fullName ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-black"
              >
                {t("consult.phoneNumberLabel")}
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                placeholder={t("consult.phoneNumberPlaceholder")}
                value={formData.phoneNumber}
                onChange={handleChange}
                className={`mt-1 block w-full p-3 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.phoneNumber ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phoneNumber}
                </p>
              )}
            </div>

            <div className="space-y-4">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors font-medium"
              >
                {t("consult.submit")}
              </button>
              <p className="text-center text-gray-600">
                {t("consult.altContact")}{" "}
                <a
                  href="https://wa.me/77077777777"
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  +7 707 777 77 77
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer position="top-center" />
    </>
  );
}
