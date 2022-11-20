import { PlayerSummary, BattleMenu, BattleAnnouncer } from '..';
import styles from './styles.module.css';
import { useEffect, useState } from 'react';
import { opponentStats, playerStats, wait } from '../../shared';
import { useAIOpponent, useBattleSequence } from '../../hooks';

export const EndMenu = ({ winner, onStartClick }) => {
  return (
    <div className={styles.main}>
      <h1>{winner.name} has won!</h1>
      <button className={styles.startButton} onClick={onStartClick}>
        Play Again!
      </button>
    </div>
  );
};
