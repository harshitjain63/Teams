import SQLite, {SQLiteDatabase} from 'react-native-sqlite-storage';

// Enable promise-based API
SQLite.enablePromise(true);

let db: SQLiteDatabase | null = null;

// Open the database connection
export const getDBConnection = async (): Promise<SQLiteDatabase> => {
  if (!db) {
    try {
      db = await SQLite.openDatabase({
        name: 'TeamsAppDBRegister',
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

// Create table for registration translations if it doesn't exist
export const createRegisterTable = async (): Promise<void> => {
  try {
    const dbConnection = await getDBConnection();
    await dbConnection.executeSql(
      `CREATE TABLE IF NOT EXISTS Register_translation (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          language TEXT NOT NULL,
          title TEXT,
          name_placeholder TEXT,
          email_placeholder TEXT,
          password_placeholder TEXT,
          confirm_password_placeholder TEXT,
          designation_placeholder TEXT,
          already_have_account TEXT,
          login_button_text TEXT,
          submit_button_text TEXT,
          create_account_button_text TEXT
      );`,
    );
    console.log('Register_translation table created successfully');
  } catch (error) {
    console.error('Error creating Register_translation table:', error);
  }
};

// Function to insert registration translations into the database
export const insertRegisterTranslations = async (
  translations: any,
  language: string,
): Promise<void> => {
  try {
    const dbConnection = await getDBConnection();
    await dbConnection.executeSql(
      `INSERT INTO Register_translation (language, title, name_placeholder, email_placeholder, password_placeholder, confirm_password_placeholder, designation_placeholder, already_have_account, login_button_text, submit_button_text, create_account_button_text)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
      [
        language,
        translations.title,
        translations.name_placeholder,
        translations.email_placeholder,
        translations.password_placeholder,
        translations.confirm_password_placeholder,
        translations.designation_placeholder,
        translations.already_have_account,
        translations.login_button_text,
        translations.submit_button_text,
        translations.create_account_button_text,
      ],
    );
    console.log('Registration translations inserted successfully');
  } catch (error) {
    console.error('Error inserting translations for profile:', error);
  }
};

// Function to fetch registration translations from the database
export const fetchRegisterTranslationsFromDB = async (
  language: string,
): Promise<any | null> => {
  try {
    const dbConnection = await getDBConnection();
    const results = await dbConnection.executeSql(
      'SELECT * FROM Register_translation WHERE language = ?;',
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
