import React from "react";
import footerLogoSrc from "@/assets/footer-logo.png";

/**
 * Подвал сайта
 * @returns {any}
 */
function Footer() {
  return (
    <footer className="flex-1 py-12 px-8 flex bg-[#EBEFF3] max-sm:py-4 max-sm:px-2">
      <div className="max-w-[1440px] mx-auto f-1 flex justify-start w-full items-center gap-6 ">
        <img
          src={footerLogoSrc}
          width={35}
          height={41}
          className="h-fit"
          alt=""
        />
        <div className="flex flex-col items-start justify-start gap-2 max-sm:text-xs text-ldt-dark-gray">
          <span>(c) Все права защищены.</span>
          <span>Официальный ресурс Правительства Москвы</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
