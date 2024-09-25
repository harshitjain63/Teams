import SQLite, {SQLiteDatabase} from 'react-native-sqlite-storage';

// Enable promise-based API
SQLite.enablePromise(true);

let db: SQLiteDatabase | null = null;

// Open the database connection
export const getDBConnection = async (): Promise<SQLiteDatabase> => {
  if (!db) {
    try {
      db = await SQLite.openDatabase({name: 'TeamsAppDB', location: 'default'});
      console.log('Database connected successfully');
    } catch (error) {
      console.error('Error opening database:', error);
      throw Error('Could not open database');
    }
  }
  return db;
};

// Create table for language if it doesn't exist
export const createTable = async (): Promise<void> => {
  try {
    const dbConnection = await getDBConnection();
    await dbConnection.executeSql(
      `CREATE TABLE IF NOT EXISTS languages (
           id INTEGER PRIMARY KEY AUTOINCREMENT,
            screen TEXT,
            language TEXT,
            title TEXT,
            name_placeholder TEXT,
            email_placeholder TEXT,
            password_placeholder TEXT,
            submit_button_text TEXT,
            UNIQUE(screen, language) -- Prevent duplicate entries for the same screen and language
        );`,
    );
    console.log('Table created successfully');
  } catch (error) {
    console.error('Error creating table:', error);
  }
};

export const insertTranslations = async (translations: any) => {
  try {
    const dbConnection = await getDBConnection();

    // Check if the translation already exists
    const [existing] = await dbConnection.executeSql(
      'SELECT * FROM languages WHERE screen = ? AND language = ?',
      [translations.screen, translations.language],
    );

    if (existing.rows.length === 0) {
      await dbConnection.executeSql(
        `INSERT INTO languages (screen, language, title, name_placeholder, email_placeholder, password_placeholder, submit_button_text)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          translations.screen,
          translations.language,
          translations.texts.title,
          translations.texts.name_placeholder,
          translations.texts.email_placeholder,
          translations.texts.password_placeholder,
          translations.texts.submit_button_text,
        ],
      );
      console.log('Data inserted successfully');
    } else {
      console.log('Translation already exists');
    }
  } catch (error) {
    console.error('Error inserting data:', error);
  }
};

// Fetch all Data
export const getTranslations = async (
  screen: string,
  language: string,
): Promise<any | null> => {
  try {
    const dbConnection = await getDBConnection();
    const [result] = await dbConnection.executeSql(
      'SELECT * FROM languages WHERE screen = ? AND language = ?',
      [screen, language],
    );

    if (result.rows.length > 0) {
      return result.rows.item(0); // Return the first matching row
    } else {
      return null; // No translation found
    }
  } catch (error) {
    console.error('Error fetching translations', error);
    throw Error('Could not fetch translations');
  }
};
