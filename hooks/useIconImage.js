export const useIconImage = () => {
  const images = [
    require("../assets/img/action/BB1.png"),
    require("../assets/img/action/BB2.png"),
    require("../assets/img/action/BB3.png"),
    require("../assets/img/action/BB4.png"),
    require("../assets/img/action/BB5.png"),
    require("../assets/img/action/BB6.png"),
    require("../assets/img/action/eat.png"),
    require("../assets/img/action/washface.png"),
    require("../assets/img/action/brushteeth.png"),
    require("../assets/img/action/shower.png"),
    require("../assets/img/action/hair.png"),
    require("../assets/img/action/clothing.png"),
    require("../assets/img/action/makeup.png"),
    require("../assets/img/action/bag.png"),
    require("../assets/img/action/procrastinate.png"),
  ];
  const ids = {
    BB1: 0,
    BB2: 1,
    BB3: 2,
    BB4: 3,
    BB5: 4,
    BB6: 5,
    eat: 6,
    washface: 7,
    brushteeth: 8,
    shower: 9,
    hair: 10,
    clothing: 11,
    makeup: 12,
    bag: 13,
    procrastinate: 14,
  };
  return { images, ids };
};
