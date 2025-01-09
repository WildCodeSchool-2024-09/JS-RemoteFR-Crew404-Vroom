import { useEffect, useState } from "react";
import styles from "./Statistic.module.css";

// Types pour nos différentes statistiques
type DailyStats = {
  date: string;
  connections: number;
  newAccounts: number;
  newEvents: number;
  newVehicles: number;
};

type PointsStats = {
  pointsEarned: number;
  pointsSpent: number;
};

function StatisticsComponent() {
  const [dailyStats, setDailyStats] = useState<DailyStats[]>([]);
  const [pointsStats, setPointsStats] = useState<PointsStats>({
    pointsEarned: 0,
    pointsSpent: 0,
  });
  const [timeFrame, setTimeFrame] = useState<"day" | "month">("day");

  useEffect(() => {
    // Chargement des statistiques
    fetchStats();
  }, []);

  function fetchStats() {
    // Appel API
    const mockDailyStats: DailyStats[] = [
      {
        date: "2025-01-08",
        connections: 150,
        newAccounts: 10,
        newEvents: 5,
        newVehicles: 15,
      },
      {
        date: "2025-01-09",
        connections: 180,
        newAccounts: 12,
        newEvents: 7,
        newVehicles: 20,
      },
      // Ajoutez plus de jours si nécessaire
    ];

    const mockPointsStats: PointsStats = {
      pointsEarned: 5000,
      pointsSpent: 3500,
    };

    setDailyStats(mockDailyStats);
    setPointsStats(mockPointsStats);
  }

  function handleTimeFrameChange(newTimeFrame: "day" | "month") {
    setTimeFrame(newTimeFrame);
  }

  return (
    <div className={styles.statGeneralContainer}>
      <h2>Statistiques</h2>
      <div>
        <button
          type="button"
          onClick={() => {
            handleTimeFrameChange("day");
          }}
        >
          Par Jour
        </button>
        <button
          type="button"
          onClick={() => {
            handleTimeFrameChange("month");
          }}
        >
          Par Mois
        </button>
      </div>

      <h3>
        Statistiques {timeFrame === "day" ? "journalières" : "mensuelles"}
      </h3>
      <table className={styles.tableContainer}>
        <thead>
          <tr>
            <th className={styles.tableContainer}>Date</th>
            <th className={styles.tableContainer}>Connexions</th>
            <th className={styles.tableContainer}>Nouveaux Comptes</th>
            <th className={styles.tableContainer}>Nouveaux Événements</th>
            <th className={styles.tableContainer}>Nouveaux Véhicules</th>
          </tr>
        </thead>
        <tbody>
          {dailyStats.map((stat) => (
            <tr key={stat.date}>
              <td>{stat.date}</td>
              <td>{stat.connections}</td>
              <td>{stat.newAccounts}</td>
              <td>{stat.newEvents}</td>
              <td>{stat.newVehicles}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Statistiques des Points</h3>
      <p>Points gagnés : {pointsStats.pointsEarned}</p>
      <p>Points dépensés : {pointsStats.pointsSpent}</p>
      <p>Solde global : {pointsStats.pointsEarned - pointsStats.pointsSpent}</p>
    </div>
  );
}

export default StatisticsComponent;
