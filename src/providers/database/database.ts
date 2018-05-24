import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Platform } from 'ionic-angular';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DataChica } from '../../_models/DataChica.model';
import { Pedazo } from '../../_models/Pedazo.model';

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
      .then(() => {
        return this.database.executeSql(
          `CREATE TABLE IF NOT EXISTS chicas 
          (id INTEGER PRIMARY KEY AUTOINCREMENT
            , lempiras INTEGER
            , number INTEGER
            , idClient INTEGER
            , client TEXT
            , fecha TEXT
            , status INTEGER);`, {})
          .then(() => {
            return this.database.executeSql(
              `CREATE TABLE IF NOT EXISTS pedazos 
                (id INTEGER PRIMARY KEY AUTOINCREMENT
                  ,number INTEGER
                  , pedazos INTEGER);`, {})
          }).then(() => {
            return this.database.executeSql(
              `CREATE TABLE IF NOT EXISTS stocktaking 
                  (id INTEGER PRIMARY KEY AUTOINCREMENT
                  ,number INTEGER
                  , pedazos INTEGER);`, {})
          })
      })
      .catch((err) => console.log("Error detected creating tables", err));
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

  createStock(pedazo: Pedazo) {
    return this.isReady()
      .then(() => {
        return this.database.executeSql(`INSERT INTO stocktaking (number, pedazos) VALUES (${pedazo.number},${pedazo.pedazos});`, {}).then((result) => {
          if (result.insertId) {
            console.log("Data a Guardar: ", result);
            return this.getStockById(result.insertId);
          }
        })
      });
  }

  editStock(pedazo: Pedazo) {
    return this.isReady()
      .then(() => {
        return this.database.executeSql(`UPDATE stocktaking SET pedazos = ? WHERE number = ?`, [pedazo.pedazos, pedazo.number]).then((result) => {
          if (result.insertId) {
            console.log("Data a Editar: ", result);
            return this.getListChicas(result.insertId);
          }
        })
      });
  }

  getStock() {
    return this.isReady()
      .then(() => {
        return this.database.executeSql("SELECT * FROM stocktaking", [])
          .then((data) => {
            let lists: Pedazo[] = [];
            if (data.rows.length > 0) {
              for (let i = 0; i < data.rows.length; i++) {
                let id: number = data.rows.item(i).id as number;
                let number: number = data.rows.item(i).number as number;
                let pedazos: number = data.rows.item(i).pedazos as number;
                let pedazo: Pedazo = new Pedazo(id, number, pedazos);
                // console.log("Pedazo: ", JSON.stringify(pedazo));
                // console.log("ID: ", id ," Pedazos: ", pedazos, " Numero: ", number);
                lists.push(pedazo);
                // lists.push({
                //   number: data.rows.item(i).number,
                //   pedazos: data.rows.item(i).pedazos
                // });
              }
            }
            return lists;
          })
      })
  }

  getStockById(number: number) {
    return this.isReady()
      .then(() => {
        return this.database.executeSql(`SELECT * FROM stocktaking WHERE number = ${number}`, [])
          .then((data) => {
            if (data.rows.length) {
              return data.rows.item(0);
            }
            return null;
          })
      })
  }

  createPedazo(pedazo: Pedazo) {
    return this.isReady()
      .then(() => {
        return this.database.executeSql(`INSERT INTO pedazos (number, pedazos) VALUES (${pedazo.number},${pedazo.pedazos});`, {}).then((result) => {
          if (result.insertId) {
            console.log("Data a Guardar: ", result);
            return this.getListPedazos(result.insertId);
          }
        })
      });
  }

  getListPedazos(id: number) {
    return this.isReady()
      .then(() => {
        return this.database.executeSql(`SELECT * FROM pedazos WHERE id = ${id}`, [])
          .then((data) => {
            if (data.rows.length) {
              return data.rows.item(0);
            }
            return null;
          })
      })
  }

  editPedazo(pedazo: Pedazo) {
    return this.isReady()
      .then(() => {
        return this.database.executeSql(`UPDATE pedazos SET number = ?, pedazos = ? WHERE number = ?`, [pedazo.number, pedazo.pedazos, pedazo.number]).then((result) => {
          if (result.insertId) {
            console.log("Data a Editar: ", result);
            return this.getListChicas(result.insertId);
          }
        })
      });
  }

  getPedazos() {
    return this.isReady()
      .then(() => {
        return this.database.executeSql("SELECT * FROM pedazos", [])
          .then((data) => {
            let lists = [];
            if (data.rows.length > 0) {
              for (let i = 0; i < data.rows.length; i++) {
                lists.push({
                  number: data.rows.item(i).number,
                  pedazos: data.rows.item(i).pedazos
                });
              }
            }
            return lists;
          })
      })
  }

  getPedazosById(number: number) {
    return this.isReady()
      .then(() => {
        return this.database.executeSql(`SELECT * FROM pedazos WHERE number = ${number}`, [])
          .then((data) => {
            let lists = [];
            if (data.rows.length > 0) {
              for (let i = 0; i < data.rows.length; i++) {
                lists.push({
                  number: data.rows.item(i).number,
                  pedazos: data.rows.item(i).pedazos
                });
              }
            }
            return lists;
          })
      })
  }

  getChicaById(id: number) {
    return this.isReady()
      .then(() => {
        return this.database.executeSql(`SELECT * FROM chicas WHERE id = ${id}`, [])
          .then((data) => {
            let lists = [];
            if (data.rows.length > 0) {
              for (let i = 0; i < data.rows.length; i++) {
                lists.push({
                  id: data.rows.item(i).id,
                  lempiras: data.rows.item(i).lempiras,
                  number: data.rows.item(i).number,
                  idClient: data.rows.item(i).idClient,
                  client: data.rows.item(i).client,
                  fecha: data.rows.item(i).fecha,
                  status: data.rows.item(i).status
                });
              }
            }
            return lists;
          })
      })
  }

  CreateChica(chica: DataChica) {
    return this.isReady()
      .then(() => {
        return this.database.executeSql(`INSERT INTO chicas (number, lempiras, idClient, client, fecha, status) VALUES ('${chica.number}','${chica.lempiras}','${chica.idClient}','${chica.client}','${chica.fecha}','${chica.status}');`, {}).then((result) => {
          if (result.insertId) {
            return this.getListChicas(result.insertId);
          }
        })
      });
  }

  getListChicas(id: number) {
    return this.isReady()
      .then(() => {
        return this.database.executeSql(`SELECT * FROM chicas WHERE id = ${id}`, [])
          .then((data) => {
            if (data.rows.length) {
              return data.rows.item(0);
            }
            return null;
          })
      })
  }

  removeChica(id: number) {
    return this.isReady()
      .then(() => {
        return this.database.executeSql(`DELETE FROM chicas WHERE id = ${id}`, [])
      })
  }

  getChicas() {
    return this.isReady()
      .then(() => {
        return this.database.executeSql("SELECT * FROM chicas", [])
          .then((data) => {
            let lists = [];
            if (data.rows.length > 0) {
              for (let i = 0; i < data.rows.length; i++) {
                lists.push({
                  id: data.rows.item(i).id,
                  lempiras: data.rows.item(i).lempiras,
                  number: data.rows.item(i).number,
                  idClient: data.rows.item(i).idClient,
                  client: data.rows.item(i).client,
                  fecha: data.rows.item(i).fecha,
                  status: data.rows.item(i).status
                });
              }
            }
            return lists;
          })
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
                  address: data.rows.item(i).address,
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