import { Bar } from '../';
import styles from './styles.module.css';

const red = '#821200';
const blue = '#1953cb';
export const PlayerSummary = ({
  name,
  level,
  value,
  maxValue,
  main = false,
}) => {
  return (
    <div style={{ background: main ? red : blue }} className={styles.main}>
      <div className={styles.info}>
        <div className={styles.name}>{name}</div>
        <div className={styles.level}>LVL: {level}</div>
      </div>
      <div className={styles.health}>
        <Bar label="HP" value={value} maxValue={maxValue} />
      </div>
    </div>
  );
};
