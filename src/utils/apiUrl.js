const host = "https://alnezis.riznex.ru:1337";

export const authCode = host + "/auth/code";
export const authCheckCode = host + "/auth/checkCode";

export const userGet = host + "/user/get";
export const userGetCard = host + "/user/cards";
export const userAddBalance = host + "/user/addBalance";
export const shopsGet = host + "/shops/get";
export const shopGetId = (id) => host + "/shop/" + id;
export const shopBuyItems = (id) => host + `/shops/${id}/buy`;
export const shopCheck = (id) => `/shop/${id}/check`;
