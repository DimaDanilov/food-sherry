import { IUserData } from "@/models/UserData";
import { foodFakeArray } from "./foodArray";

export const userFakeData: IUserData = {
  name: "Имя",
  surname: "Фамилия",
  registrationDate: "01.02.2020",
  adsCreated: 83,
  adsTaken: 6,
  ads: foodFakeArray,
};
