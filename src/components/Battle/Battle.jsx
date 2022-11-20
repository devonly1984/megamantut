import { PlayerSummary, BattleMenu, BattleAnnouncer } from '../';
import styles from './styles.module.css';
import { useEffect, useState } from 'react';
import { opponentStats, playerStats, wait } from '../../shared';
import { useAIOpponent, useBattleSequence } from '../../hooks';

export const Battle = ({ onGameEnd }) => {
  const [sequence, setSequence] = useState({});

  const {
    turn,
    inSequence,
    playerHealth,
    opponentHealth,
    announcerMessage,
    playerAnimation,
    opponentAnimation,
  } = useBattleSequence(sequence);

  const aiChoice = useAIOpponent(turn);
  useEffect(() => {
    if (aiChoice && turn === 1 && !inSequence) {
      setSequence({ turn, mode: aiChoice });
    }
  }, [turn, aiChoice, inSequence]);
  useEffect(() => {
    if (playerHealth === 0 || opponentHealth === 0) {
      (async () => {
        await wait(1000);
        onGameEnd(playerHealth === 0 ? opponentStats : playerStats);
      })();
    }
  }, [playerHealth, opponentHealth, onGameEnd]);
  return (
    <>
      <div className={styles.opponent}>
        <div className={styles.summary}>
          <PlayerSummary
            health={opponentHealth}
            name={opponentStats.name}
            level={opponentStats.level}
            maxValue={opponentStats.maxHealth}
          />
        </div>
      </div>
      <div className={styles.characters}>
        <div className={styles.gameHeader}>
          {playerStats.name} vs {opponentStats.name}
        </div>
        <div className={styles.gameImages}>
          <div className={styles.playerSprite}>
            <img
              src={playerStats.img}
              alt={playerStats.name}
              className={styles[playerAnimation]}
            />
          </div>
          <div className={styles.opponentSprite}>
            <img
              src={opponentStats.img}
              alt={opponentStats.name}
              className={styles[opponentAnimation]}
            />
          </div>
        </div>
      </div>
      <div className={styles.user}>
        <div className={styles.summary}>
          <PlayerSummary
            main
            health={playerHealth}
            name={playerStats.name}
            level={playerStats.level}
            maxValue={playerStats.maxHealth}
          />
        </div>
        <div className={styles.hud}>
          <div className={styles.hudChild}>
            <BattleAnnouncer
              message={
                announcerMessage || `What will ${playerStats.name} do?`
              }
            />
          </div>
          <div className={styles.hudChild}>
            <BattleMenu
              onAttack={() => setSequence({ turn, mode: 'attack' })}
              onHeal={() => setSequence({ turn, mode: 'heal' })}
              onMagic={() => setSequence({ turn, mode: 'magic' })}
            />
          </div>
        </div>
      </div>
    </>
  );
};
