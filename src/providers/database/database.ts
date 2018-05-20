import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Platform } from 'ionic-angular';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DatabaseProvider {

  private database: SQLiteObject;
  private dbReady = new BehaviorSubject<boolean>(false);

  constructor(private platform: Platform, public http: HttpClient, public sqlite: SQLite) {
    this.createDataBase();
  }

  createDataBase() {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'Lachi.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          this.database = db;

          this.createTables().then(() => {
            //communicate we are ready!
            this.dbReady.next(true);
          });
        })

    });
  }

  private createTables() {
    return this.database.executeSql(`CREATE TABLE IF NOT EXISTS clients 
    (id INTEGER PRIMARY KEY AUTOINCREMENT
      , name TEXT, telephone TEXT
      , address TEXT
      , email TEXT);`, {})
      .catch((err) => console.log("error detected creating tables", err));
  }

  private isReady() {
    return new Promise((resolve, reject) => {
      //if dbReady is true, resolve
      if (this.dbReady.getValue()) {
        resolve();
      }
      //otherwise, wait to resolve until dbReady returns true
      else {
        this.dbReady.subscribe((ready) => {
          if (ready) {
            resolve();
          }
        });
      }
    })
  }

  getAllClients() {
    return this.isReady()
      .then(() => {
        return this.database.executeSql("SELECT * FROM clients", [])
          .then((data) => {
            let lists = [];
            if (data.rows.length > 0) {
              for (let i = 0; i < data.rows.length; i++) {
                lists.push({
                  id: data.rows.item(i).id,
                  name: data.rows.item(i).name,
                  telephone: data.rows.item(i).telephone,
                  email: data.rows.item(i).email
                });
              }
            }
            return lists;
          })
      })
  }

  CreateClient(name: string, telephone: string, address: string, email: string) {
    return this.isReady()
      .then(() => {
        return this.database.executeSql(`INSERT INTO clients (name, telephone, address, email) VALUES ('${name}','${telephone}','${address}','${email}');`, {}).then((result) => {
          if (result.insertId) {
            return this.getList(result.insertId);
          }
        })
      });
  }

  getList(id: number) {
    return this.isReady()
      .then(() => {
        return this.database.executeSql(`SELECT * FROM clients WHERE id = ${id}`, [])
          .then((data) => {
            if (data.rows.length) {
              return data.rows.item(0);
            }
            return null;
          })
      })
  }

  deleteList(id: number) {
    return this.isReady()
      .then(() => {
        return this.database.executeSql(`DELETE FROM clients WHERE id = ${id}`, [])
      })
  }

}
