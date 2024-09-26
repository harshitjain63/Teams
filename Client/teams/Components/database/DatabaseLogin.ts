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
export const createLoginTable = async (): Promise<void> => {
  try {
    const dbConnection = await getDBConnection();
    await dbConnection.executeSql(
      `CREATE TABLE IF NOT EXISTS Login_translation (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          language TEXT NOT NULL,
          title TEXT,
          email_placeholder TEXT,
          password_placeholder TEXT,
          submit_button_text TEXT,
          dont_have_account TEXT,
          register_button_text TEXT
      );`,
    );
    console.log('Login_translation table created successfully');
  } catch (error) {
    console.error('Error creating Login_translation table:', error);
  }
};

// Function to insert translations into the database
export const insertLoginTranslations = async (
  translations: any,
  language: string,
): Promise<void> => {
  try {
    const dbConnection = await getDBConnection();
    await dbConnection.executeSql(
      `INSERT INTO Login_translation (language, title, email_placeholder, password_placeholder, submit_button_text, dont_have_account, register_button_text)
      VALUES (?, ?, ?, ?, ?, ?, ?);`,
      [
        language,
        translations.title,
        translations.email_placeholder,
        translations.password_placeholder,
        translations.submit_button_text,
        translations.dont_have_account,
        translations.register_button_text,
      ],
    );
    console.log('Login translations inserted successfully');
  } catch (error) {
    console.error('Error inserting translations:', error);
  }
};

// Function to fetch translations from the database
export const fetchLoginTranslationsFromDB = async (
  language: string,
): Promise<any | null> => {
  try {
    const dbConnection = await getDBConnection();
    const results = await dbConnection.executeSql(
      'SELECT * FROM Login_translation WHERE language = ?;',
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
