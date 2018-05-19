import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class DatabaseProvider {

  private db: SQLiteObject;
  private isOpen: Boolean;

  constructor(public http: HttpClient, public storare: SQLite) {
    if (!this.isOpen) {
      this.storare.create({ name: 'Lachi.db', location: 'default' }).then((db: SQLiteObject) => {
        this.db = db
        db.executeSql("CREATE TABLE IF NOT EXISTS clients (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, telephone TEXT, address TEXT, email TEXT) ", []);
        this.isOpen = true;
      }).catch((error) => {
        console.log(error);
      })
    }
  }

  CreateClient(name: string, telephone: string, address: string, email: string) {
    return new Promise((resolve, reject) => {
      let sql = "INSERT INTO clients (name, telephone, address, email) VALUES(?, ?, ?, ?)";
      this.db.executeSql(sql, [name, telephone, address, email]).then((data) => {
        resolve(data);
      }, (error) => {
        reject(error);
      });
    });
  }

  getAllClients() {
    return new Promise((resolve, reject) => {
      this.db.executeSql("SELECT * FROM clients", []).then((data) => {
        let arrayUsers = [];
        if (data.rows.length > 0) {
          for (let i = 0; i < data.rows.length; i++) {
            arrayUsers.push({
              id: data.rows.item(i).id,
              name: data.rows.item(i).name,
              telephone: data.rows.item(i).telephone,
              email: data.rows.item(i).email
            });
          }
        }
        resolve(arrayUsers);
      }, (error) => {
        reject(error);
      })
    })
  }

}
