import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Platform } from 'ionic-angular';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
// import { DataChica } from '../../_models/DataChica.model';
import { Pedazo } from '../../_models/Pedazo.model';
import { DiariaDetalle } from '../../_models/DiariaDetalle.model';
import { DiariaControl } from '../../_models/DiariaControl.model';

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
        name: 'Panda.db',
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
          `CREATE TABLE IF NOT EXISTS DiariaControl 
          (id INTEGER PRIMARY KEY AUTOINCREMENT
            , id_client INTEGER
            , client TEXT
            , total INTEGER
            , date TEXT
            , status INTEGER);`, {})
          .then(() => {
            return this.database.executeSql(
              `CREATE TABLE IF NOT EXISTS DiariaDetalle 
          (id INTEGER PRIMARY KEY AUTOINCREMENT
            , id_control INTEGER
            , number INTEGER
            , lempiras INTEGER
            , id_client INTEGER
            , client TEXT
            , date TEXT
            , status INTEGER);`, {})
          })
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
            // console.log("Data a Editar: ", result);
            return this.getStockById(result.insertId);
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
            // console.log("Data a Editar: ", result);
            return this.getPedazosById(result.insertId);
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

  //------------------DIARIA DETALLE---------------------

  getDiariaDetalleByID(id: number) {
    return this.isReady()
      .then(() => {
        return this.database.executeSql(`SELECT * FROM DiariaDetalle WHERE id = ${id}`, [])
          .then((data) => {
            if (data.rows.length) {
              let detail = new DiariaDetalle(0, 0, 0, 0, 0, '', '', 0);
              detail.id = parseInt(data.rows.item(0).id);
              detail.id_control = parseInt(data.rows.item(0).id_control);
              detail.number = parseInt(data.rows.item(0).number);
              detail.lempiras = parseInt(data.rows.item(0).lempiras);
              detail.id_client = parseInt(data.rows.item(0).id_client);
              detail.client = data.rows.item(0).client, data.rows.item(0).date;
              detail.status = parseInt(data.rows.item(0).status);
              return detail as DiariaDetalle;
            }
            return null;
          })
      })
  }

  CreateDiariaDetalle(diaria: DiariaDetalle) {
    return this.isReady()
      .then(() => {
        return this.database.executeSql(`INSERT INTO DiariaDetalle (id_control, number, lempiras, id_client, client, date, status) VALUES (${diaria.id_control}, ${diaria.number},${diaria.lempiras},${diaria.id_client},'${diaria.client}','${diaria.date}',${diaria.status});`, {}).then((result) => {
          if (result.insertId) {
            return this.getDiariaDetalleByID(result.insertId);
          }
        })
      });
  }

  removeDiariaDetalleByID(id: number) {
    return this.isReady()
      .then(() => {
        return this.database.executeSql(`DELETE FROM DiariaDetalle WHERE id = ${id}`, [])
      });
  }

  removeDiariaDetalle(detalle: DiariaDetalle) {
    return this.isReady()
      .then(() => {
        return this.database.executeSql(`DELETE FROM DiariaDetalle WHERE id_control = ${detalle.id_control}`, [])
      });
  }

  getDiariaDetalleByStatus(pStatus: number) {
    return this.isReady()
      .then(() => {
        return this.database.executeSql(`SELECT * FROM DiariaDetalle WHERE status = ${pStatus}`, [])
          .then((data) => {
            let lists: DiariaDetalle[] = [];
            if (data.rows.length > 0) {
              for (let i = 0; i < data.rows.length; i++) {
                let detalle = new DiariaDetalle(0, 0, 0, 0, 0, '', '', 0);
                detalle.id = parseInt(data.rows.item(i).id);
                detalle.id_control = parseInt(data.rows.item(i).id_control);
                detalle.lempiras = parseInt(data.rows.item(i).lempiras);
                detalle.number = parseInt(data.rows.item(i).number);
                detalle.id_client = parseInt(data.rows.item(i).id_client);
                detalle.client = data.rows.item(i).client;
                detalle.date = data.rows.item(i).date;
                detalle.status = parseInt(data.rows.item(i).status);
                lists.push(detalle);
              }
            }
            return lists as DiariaDetalle[];
          })
      })
  }

  getDiariaDetalle() {
    return this.isReady()
      .then(() => {
        return this.database.executeSql("SELECT * FROM DiariaDetalle", [])
          .then((data) => {
            let lists: DiariaDetalle[] = [];
            if (data.rows.length > 0) {
              for (let i = 0; i < data.rows.length; i++) {
                let detalle = new DiariaDetalle(parseInt(data.rows.item(i).id), parseInt(data.rows.item(i).id_control), parseInt(data.rows.item(i).number), parseInt(data.rows.item(i).lempiras), parseInt(data.rows.item(i).id_client), data.rows.item(i).client, data.rows.item(i).date, parseInt(data.rows.item(i).status));
                lists.push(detalle);
              }
            }
            return lists as DiariaDetalle[];
          })
      })
  }

  getDiariaDetalleByIdControl(detalle: DiariaDetalle) {
    return this.isReady()
      .then(() => {
        return this.database.executeSql(`SELECT * FROM DiariaDetalle where id_control = ${detalle.id_control}`, [])
          .then((data) => {
            let lists: DiariaDetalle[] = [];
            if (data.rows.length > 0) {
              for (let i = 0; i < data.rows.length; i++) {
                let detalle = new DiariaDetalle(parseInt(data.rows.item(i).id), parseInt(data.rows.item(i).id_control), parseInt(data.rows.item(i).number), parseInt(data.rows.item(i).lempiras), parseInt(data.rows.item(i).id_client), data.rows.item(i).client, data.rows.item(i).date, parseInt(data.rows.item(i).status));
                lists.push(detalle);
              }
            }
            return lists as DiariaDetalle[];
          })
      })
  }

  // -----------------------------------DIARIA CONTROL---------------------------------------------

  CreateDiariaControl(diaria: DiariaControl) {
    return this.isReady()
      .then(() => {
        return this.database.executeSql(`INSERT INTO DiariaControl (id_client, client, total, date, status) VALUES (${diaria.id_client},'${diaria.client}',${diaria.total},'${diaria.date}',${diaria.status});`, {}).then((result) => {
          if (result.insertId) {
            let miDiariaControl: DiariaControl = new DiariaControl(0, 0, '', 0);
            // El insertId contiene el id agregado en ese momento.
            miDiariaControl.id = parseInt(result.insertId);
            return this.getDiariaControlByID(miDiariaControl);
          }
        })
      });
  }

  getDiariaControlByID(control: DiariaControl) {
    return this.isReady()
      .then(() => {
        return this.database.executeSql(`SELECT * FROM DiariaControl WHERE id = ${control.id} and status = ${control.status}`, [])
          .then((data) => {
            if (data.rows.length) {
              let control = new DiariaControl(0, 0, '', 0);
              control.id = data.rows.item(0).id;
              control.id_client = data.rows.item(0).id_client;
              control.client = data.rows.item(0).client;
              control.total = data.rows.item(0).total;
              control.date = data.rows.item(0).date;
              control.status = data.rows.item(0).status;
              return control as DiariaControl;
            }
            return null;
          })
      })
  }

  removeDiariaControlByID(control: DiariaControl) {
    return this.isReady()
      .then(() => {
        return this.database.executeSql(`DELETE FROM DiariaControl WHERE id = ${control.id}`, [])
      })
  }

  getDiariaControlByStatus(control: DiariaControl) {
    return this.isReady()
      .then(() => {
        return this.database.executeSql(`SELECT * FROM DiariaControl WHERE status = ${control.status}`, [])
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

  // -----------------------------------CLIENT-------------------------------------------

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