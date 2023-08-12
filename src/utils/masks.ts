export const numberMask = (value: string) => {
  return value.replace(/\D/g, "");
};

export const cnpjMask = (value: string) => {
  return value
    .replace(/\D+/g, "") // não deixa ser digitado nenhuma letra
    .replace(/(\d{2})(\d)/, "$1.$2") // captura 2 grupos de número o primeiro com 2 digitos e o segundo de com 3 digitos, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de número
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1/$2") // captura 2 grupos de número o primeiro e o segundo com 3 digitos, separados por /
    .replace(/(\d{4})(\d)/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1"); // captura os dois últimos 2 números, com um - antes dos dois números
};

export const dateMask = (value: string) => {
  let v = value.replace(/\D/g, "").slice(0, 8);
  if (v.length >= 5) {
    return `${v.slice(0, 2)}/${v.slice(2, 4)}/${v.slice(4)}`;
  } else if (v.length >= 3) {
    return `${v.slice(0, 2)}/${v.slice(2)}`;
  }
  return v;
};

export const zeroLeftMask = (value: number) => {
  return ("0000" + value).slice(-2);
};
