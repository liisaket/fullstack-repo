import { useState, useEffect } from "react";

import { DiaryEntry, Entries, Weather, Visibility } from "./types";
import { getAllEntries, createEntry } from "./services/diaryService";
import axios from "axios";

const ShowEntries = ({ entries }: Entries): JSX.Element => {
  return (
    <div>
      <ul>
        {entries.map((entry) => (
          <li key={entry.id}>
            <h3 style={{ marginBottom: 0 }}>{entry.date}</h3>
            <p style={{ margin: 0 }}>weather: {entry.weather}</p>
            <p style={{ margin: 0 }}>visibility: {entry.visibility}</p>
            <p style={{ margin: 0 }}>comment: {entry.comment}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

const NewEntry = ({ entries, setEntries }: Entries) => {
  const [error, setError] = useState("");
  const [newDate, setDate] = useState("");
  const [newWeather, setWeather] = useState<Weather>(Weather.Sunny);
  const [newVisibility, setVisibility] = useState<Visibility>(Visibility.Great);
  const [newComment, setComment] = useState("");

  const entryCreation = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      const data = await createEntry({
        date: newDate,
        weather: newWeather,
        visibility: newVisibility,
        comment: newComment,
      });
      setEntries(entries.concat(data));
      setDate("");
      setWeather(Weather.Sunny);
      setVisibility(Visibility.Great);
      setComment("");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setTimeout(() => {
          setError(error.response?.data);
        });
        setTimeout(() => {
          setError("");
        }, 5000);
      } else {
        console.error(error);
      }
    }
  };

  return (
    <div>
      {" "}
      <h3>New Diary Entry</h3>
      <p style={{ color: "red" }}>{error}</p>
      <form onSubmit={entryCreation}>
        <div>
          date{" "}
          <input
            type="date"
            value={newDate}
            onChange={({ target }) => setDate(target.value)}
          />
        </div>
        <div>
          weather{" "}
          {Object.values(Weather).map((weather) => (
            <label key={weather}>
              <input
                type="radio"
                value={weather}
                checked={newWeather === weather}
                onChange={() => setWeather(weather)}
              />
              {weather}
            </label>
          ))}
        </div>
        <div>
          visibility{" "}
          {Object.values(Visibility).map((visibility) => (
            <label key={visibility}>
              <input
                type="radio"
                value={visibility}
                checked={newVisibility === visibility}
                onChange={() => setVisibility(visibility)}
              />
              {visibility}
            </label>
          ))}
        </div>
        <div>
          comment{" "}
          <input
            type="string"
            value={newComment}
            onChange={({ target }) => setComment(target.value)}
          />
        </div>
        <button type="submit">add entry</button>
      </form>
    </div>
  );
};

const App = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    getAllEntries().then((data: DiaryEntry[]) => {
      setEntries(data);
    });
  }, []);

  return (
    <div>
      <h1>Diary entries</h1>
      <ShowEntries entries={entries} setEntries={setEntries} />
      <NewEntry entries={entries} setEntries={setEntries} />
    </div>
  );
};

export default App;
