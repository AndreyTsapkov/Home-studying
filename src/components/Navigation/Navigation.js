import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';

const Navigation = () => (
  <nav>
    <NavLink
      to="/skip-first-render"
      className={styles.link}
      activeclassname={styles.activeLink}
    >
      Пропуск первого рендера
    </NavLink>

    <NavLink
      to="/notes"
      className={styles.link}
      activeclassname={styles.activeLink}
    >
      useMemo
    </NavLink>

    <NavLink
      to="/signup"
      className={styles.link}
      activeclassname={styles.activeLink}
    >
      Форма
    </NavLink>

    <NavLink
      to="/colorpicker"
      className={styles.link}
      activeclassname={styles.activeLink}
    >
      Колорпикер
    </NavLink>

    <NavLink
      to="/counterReducer"
      className={styles.link}
      activeclassname={styles.activeLink}
    >
      useReducer
    </NavLink>

    <NavLink
      to="/counter"
      className={styles.link}
      activeclassname={styles.activeLink}
    >
      Счётчик/useReducer
    </NavLink>

    <NavLink
      to="/clock"
      className={styles.link}
      activeclassname={styles.activeLink}
    >
      Часы
    </NavLink>

    <NavLink
      to="/pokemon"
      className={styles.link}
      activeclassname={styles.activeLink}
    >
      Покемоны
    </NavLink>
  </nav>
);

export default Navigation;
