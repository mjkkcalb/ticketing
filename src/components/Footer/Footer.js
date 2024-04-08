import React from "react";
import {
  BiPencil,
  BiHomeAlt,
  BiSearch,
  BiBasket
} from "react-icons/bi";
import FooterStyle from "./footer.module.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className={FooterStyle.globalMenu}>
      <ul className={FooterStyle.globalMenuItem}>
        <li>
          <Link to="/main">
            <BiHomeAlt />
            <span>홈</span>
          </Link>
        </li>
        <li>
          <Link to="/ex">
          <BiSearch />
            <span>검색</span>
          </Link>
        </li>
        <li>
          <Link to="/save">
          <BiBasket />
            <span>장바구니</span>
          </Link>
        </li>
        <li>
          <Link to="/my">
            <BiPencil />
            <span>내페이지</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Footer;
