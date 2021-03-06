import { ProductSelect } from "./App";

const machines: DrinkMachine[] = [
  {
    id: 0,
    type: "example",
    place: "example",
    area: "工学部",
    card: "No",
    contents: ["琉球コーラ"],
    image: "non",
    location: [11, 11],
  },
  {
    id: 1,
    type: "example",
    place: "example",
    area: "共通教育棟",
    card: "Yes",
    contents: ["example"],
    image: "non",
    location: [11, 11],
  },
];

test("ProductSelect unit test", () => {
  // 完全一致
  expect(ProductSelect("琉球コーラ", [0, 1], machines)).toStrictEqual([0]);

  // 空白は検索しない
  expect(ProductSelect("", [0, 1], machines)).toStrictEqual([0, 1]);

  // 半角スペースのみでも検索しない
  expect(ProductSelect(" ", [0, 1], machines)).toStrictEqual([0, 1]);

  // 全角スペースのみでも検索しない
  expect(ProductSelect("　", [0, 1], machines)).toStrictEqual([0, 1]);

  // 部分一致
  expect(ProductSelect("コーラ", [0, 1], machines)).toStrictEqual([0]);

  // 商品名の後に空白(半角)
  expect(ProductSelect("コーラ ", [0, 1], machines)).toStrictEqual([0]);

  // 商品名の後に空白(半角)
  expect(ProductSelect("コーラ　", [0, 1], machines)).toStrictEqual([0]);

  // 商品名の後に空白(半角(大量))
  expect(ProductSelect("コーラ　　　　  ", [0, 1], machines)).toStrictEqual([
    0,
  ]);

  // 空白多め
  expect(ProductSelect("     ", [0, 1], machines)).toStrictEqual([0, 1]);
});
