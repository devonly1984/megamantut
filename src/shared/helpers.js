export const wait = ms =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
export const attack = (attacker, reciever) => {
  const recievedDamage =
    attacker.attack - (attacker.level - reciever.level) * 1.25;

  const finalDamage = recievedDamage - reciever.defense / 2;

  return finalDamage;
};
export const magic = ({ attacker, reciever }) => {
  const recievedDamage =
    attacker.magic - (attacker.level - reciever.level) * 1.25;
  const finalDamage = recievedDamage - reciever.magicDefense / 2;
  return finalDamage;
};
export const heal = ({ receiver }) => {
  return receiver.magic + receiver.level * 0.25;
};
