import SQLite, {SQLiteDatabase} from 'react-native-sqlite-storage';

// Enable promise-based API
SQLite.enablePromise(true);

let db: SQLiteDatabase | null = null;

// Open the database connection
export const getDBConnection = async (): Promise<SQLiteDatabase> => {
  if (!db) {
    try {
      db = await SQLite.openDatabase({
        name: 'TeamsAppDBProfile',
        location: 'default',
      });
      console.log('Database connected successfully');
    } catch (error) {
      console.error('Error opening database:', error);
      throw Error('Could not open database');
    }
  }
  return db;
};

// Create table for profile translations if it doesn't exist
export const createProfileTable = async (): Promise<void> => {
  try {
    const dbConnection = await getDBConnection();
    await dbConnection.executeSql(
      `CREATE TABLE IF NOT EXISTS Profile_translation (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          language TEXT NOT NULL,
          title TEXT,
          name_placeholder TEXT,
          email_placeholder TEXT,
          designation_placeholder TEXT
      );`,
    );
    console.log('Profile_translation table created successfully');
  } catch (error) {
    console.error('Error creating Profile_translation table:', error);
  }
};

// Function to insert profile translations into the database
export const insertProfileTranslations = async (
  translations: any,
  language: string,
): Promise<void> => {
  try {
    const dbConnection = await getDBConnection();
    await dbConnection.executeSql(
      `INSERT INTO Profile_translation (language, title, name_placeholder, email_placeholder, designation_placeholder)
      VALUES (?, ?, ?, ?, ?);`,
      [
        language,
        translations.title,
        translations.name_placeholder,
        translations.email_placeholder,
        translations.designation_placeholder,
      ],
    );
    console.log('Profile translations inserted successfully');
  } catch (error) {
    console.error('Error inserting translations:', error);
  }
};

// Function to fetch profile translations from the database
export const fetchProfileTranslationsFromDB = async (
  language: string,
): Promise<any | null> => {
  try {
    const dbConnection = await getDBConnection();
    const results = await dbConnection.executeSql(
      'SELECT * FROM Profile_translation WHERE language = ?;',
      [language],
    );

    if (results[0].rows.length > 0) {
      return results[0].rows.item(0); // Return the first row
    } else {
      return null; // No translations found for the specified language
    }
  } catch (error) {
    console.error('Error fetching translations from database:', error);
    return null;
  }
};
