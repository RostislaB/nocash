const host = "https://alnezis.riznex.ru:1337";

export const authCode = host + "/auth/code";
export const authCheckCode = host + "/auth/checkCode";

export const userGet = host + "/user/get";
export const shopsGet = host + "/shops/get";
export const shopGetId = (id) => host + "/shop/" + id;
