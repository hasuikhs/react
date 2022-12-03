import fs from 'fs';
import { resolve } from 'path';

const basePath = resolve();

const fileNames = {
  messages: resolve(basePath, 'src/db/messages.json'),
  users: resolve(basePath, 'src/db/users.json')
};

export const readDB = target => {
  try {
    return JSON.parse(fs.readFileSync(fileNames[target], 'utf-8'));
  } catch (error) {
    console.error(error);
  }
};

export const wrightDB = (target, data) => {
  try {
    return fs.writeFileSync(fileNames[target], JSON.stringify(data));
  } catch (error) {
    console.error(error)
  }
}