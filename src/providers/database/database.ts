import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Platform } from 'ionic-angular';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
// import { DataChica } from '../../_models/DataChica.model';
import { Pedazo } from '../../_models/Pedazo.model';
import { DiariaDetalle } from '../../_models/DiariaDetalle.model';
import { DiariaControl } from '../../_models/DiariaControl.model';
import { ConsolidateControl } from '../../_models/ConsolidateControl.model';
import { ConsolidateDetalle } from '../../_models/ConsolidateDetalle.model';

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

  private createTables() {
    return this.database.executeSql(`CREATE TABLE IF NOT EXISTS Clients 
    (id INTEGER PRIMARY KEY AUTOINCREMENT
      , name TEXT
      , telephone TEXT
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
            , status INTEGER
            , id_closure INTEGER);`, {})
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
            , status INTEGER
            , paid INTEGER
            , id_closure INTEGER);`, {})
          })
          .then(() => {
            return this.database.executeSql(
              `CREATE TABLE IF NOT EXISTS Pedazos 
                (id INTEGER PRIMARY KEY AUTOINCREMENT
                  , number INTEGER
                  , pedazos INTEGER
                  , id_closure INTEGER);`, {})
          }).then(() => {
            return this.database.executeSql(
              `CREATE TABLE IF NOT EXISTS User
              (id INTEGER PRIMARY KEY AUTOINCREMENT
                , id_user INTEGER
                , name TEXT
                , username TEXT
                , kind INTEGER
                , status INTEGER);`, {})
          }).then(() => {
            return this.database.executeSql(
              `CREATE TABLE IF NOT EXISTS Closure
              (id INTEGER PRIMARY KEY AUTOINCREMENT
                , description TEXT
                , date TEXT
                , status INTEGER
                , total INTEGER
                , id_user INTEGER
                , user TEXT
                , winnigNumber INTEGER);`, {})
          }).then(() => {
            return this.database.executeSql(
              `CREATE TABLE IF NOT EXISTS ConsolidatedControl
              (id INTEGER PRIMARY KEY AUTOINCREMENT
                , id_user INTEGER
                , user TEXT
                , date TEXT
                , kind INTEGER
                , total INTEGER
                , status INTEGER
                , id_closure INTEGER);`, {})
          }).then(() => {
            return this.database.executeSql(
              `CREATE TABLE IF NOT EXISTS ConsolidatedDetalle
              (id INTEGER PRIMARY KEY AUTOINCREMENT
                , id_control INTEGER
                , number INTEGER
                , lempiras INTEGER
                , date TEXT
                , status INTEGER
                , id_closure INTEGER);`, {})
          }).then(() => {
            return this.database.executeSql(
              `CREATE TABLE IF NOT EXISTS stocktaking 
                  (id INTEGER PRIMARY KEY AUTOINCREMENT
                  , number INTEGER
                  , pedazos INTEGER
                  , id_closure INTEGER);`, {})
          }).catch((err) => console.log("Error detected creating tables", err));
      })
      .catch((err) => console.log("Error detected creating tables", err));
  }

  // -----------------------------CONSOLIDATE CONTROL--------------------------------------------
  createConsolidateControl(consolidated: ConsolidateControl) {
    return this.isReady()
      .then(() => {
        return this.database.executeSql(`INSERT INTO ConsolidatedControl (id_user, user, date, kind, total, status, id_closure) VALUES (${consolidated.id_user},'${consolidated.user}','${consolidated.date}',${consolidated.kind},${consolidated.total},${consolidated.status},${consolidated.id_closure}); `, {}).then((result) => {
          if (result.insertId) {
            let miConsolidatedControl: ConsolidateControl = new ConsolidateControl(0, 0, '', '', 0, 0, 0, 0);
            // El insertId contiene el id agregado en ese momento.
            miConsolidatedControl.id = parseInt(result.insertId);
            return this.getConsolidateControlByID(miConsolidatedControl);
          }
        })
      });
  }

  getConsolidateControlByID(control: ConsolidateControl) {
    return this.isReady()
      .then(() => {
        return this.database.executeSql(`SELECT * FROM ConsolidatedControl WHERE id = ${control.id} and status = ${control.status} `, [])
          .then((data) => {
            if (data.rows.length) {
              let control = new ConsolidateControl(0, 0, '', '', 0, 0, 0, 0);
              control.id = parseInt(data.rows.item(0).id);
              control.id_user = parseInt(data.rows.item(0).id_user);
              control.user = data.rows.item(0).user;
              control.date = data.rows.item(0).date;
              control.kind = parseInt(data.rows.item(0).kind);
              control.total = parseInt(data.rows.item(0).total);
              control.status = parseInt(data.rows.item(0).status);
              control.id_closure = parseInt(data.rows.item(0).id_closure);
              return control as ConsolidateControl;
            }
            return null;
          })
      })
  }

  removeConsolidateControlByID(control: ConsolidateControl) {
    return this.isReady()
      .then(() => {
        return this.database.executeSql(`DELETE FROM ConsolidatedControl WHERE id = ${control.id} `, [])
      })
  }

  getConsolidateControlByStatus(control: ConsolidateControl) {
    return this.isReady()
      .then(() => {
        return this.database.executeSql(`SELECT * FROM ConsolidatedControl WHERE status = ${control.status} `, [])
          .then((data) => {
            let lists: ConsolidateControl[] = [];
            if (data.rows.length > 0) {
              for (let i = 0; i < data.rows.length; i++) {
                let control: ConsolidateControl = new ConsolidateControl(0, 0, '', '', 0, 0, 0, 0);
                control.id = parseInt(data.rows.item(i).id);
                control.id_user = parseInt(data.rows.item(i).id_user);
                control.user = data.rows.item(i).user;
                control.date = data.rows.item(i).date;
                control.kind = parseInt(data.rows.item(i).kind);
                control.total = parseInt(data.rows.item(i).total);
                control.status = parseInt(data.rows.item(i).status);
                control.id_closure = parseInt(data.rows.item(i).id_closure);
                lists.push(control);
              }
            }
            return lists;
          })
      })
  }

  // ----------------------------CONSOLIDATED DETALLE----------------------------------

  createConsolidateDetalle(consolidated: ConsolidateDetalle) {
    return this.isReady()
      .then(() => {
        return this.database.executeSql(`INSERT INTO ConsolidatedDetalle (id_control, number, lempiras, date, status, id_closure) VALUES (${consolidated.id_control},${consolidated.number},${consolidated.lempiras},'${consolidated.date}',${consolidated.status},${consolidated.id_closure}); `, {}).then((result) => {
          if (result.insertId) {
            let miConsolidatedDetalle: ConsolidateDetalle = new ConsolidateDetalle(0, 0, 0, 0, '', 0, 0);
            // El insertId contiene el id agregado en ese momento.
            miConsolidatedDetalle.id = parseInt(result.insertId);
            return this.getConsolidateDetalleByID(miConsolidatedDetalle);
          }
        })
      });
  }

  getConsolidateDetalleByID(pDetalle: ConsolidateDetalle) {
    return this.isReady()
      .then(() => {
        return this.database.executeSql(`SELECT * FROM ConsolidatedDetalle WHERE id = ${pDetalle.id}`, [])
          .then((data) => {
            if (data.rows.length) {
              let detalle = new ConsolidateDetalle(0, 0, 0, 0, '', 0, 0);
              detalle.id = parseInt(data.rows.item(0).id);
              detalle.id_control = parseInt(data.rows.item(0).id_control);
              detalle.number = parseInt(data.rows.item(0).number);
              detalle.lempiras = parseInt(data.rows.item(0).lempiras);
              detalle.date = data.rows.item(0).date;
              detalle.status = parseInt(data.rows.item(0).status);
              detalle.id_closure = parseInt(data.rows.item(0).id_closure);
              return detalle as ConsolidateDetalle;
            }
            return null;
          })
      })
  }

  removeConsolidateDetalleByID(pDetalle: ConsolidateDetalle) {
    return this.isReady()
      .then(() => {
        return this.database.executeSql(`DELETE FROM ConsolidatedDetalle WHERE id = ${pDetalle.id} `, [])
      })
  }

  getConsolidateDetalleByStatus(pDetalle: ConsolidateDetalle) {
    return this.isReady()
      .then(() => {
        return this.database.executeSql(`SELECT * FROM ConsolidatedDetalle WHERE status = ${pDetalle.status} `, [])
          .then((data) => {
            let lists: ConsolidateDetalle[] = [];
            if (data.rows.length > 0) {
              for (let i = 0; i < data.rows.length; i++) {
                let detalle: ConsolidateDetalle = new ConsolidateDetalle(0, 0, 0, 0, '', 0, 0);
                detalle.id = parseInt(data.rows.item(0).id);
                detalle.id_control = parseInt(data.rows.item(0).id_control);
                detalle.number = parseInt(data.rows.item(0).number);
                detalle.lempiras = parseInt(data.rows.item(0).lempiras);
                detalle.date = data.rows.item(0).date;
                detalle.status = parseInt(data.rows.item(0).status);
                detalle.id_closure = parseInt(data.rows.item(0).id_closure);
                lists.push(detalle);
              }
            }
            return lists;
          })
      })
  }

  // ----------------------------STOCKTAKING----------------------------------

  createStock(pedazo: Pedazo) {
    return this.isReady()
      .then(() => {
        return this.database.executeSql(`INSERT INTO stocktaking(number, pedazos, id_closure) VALUES(${pedazo.number}, ${pedazo.pedazos}, ${pedazo.id_closure}); `, {}).then((result) => {
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
        return this.database.executeSql(`UPDATE stocktaking SET pedazos = ? WHERE number = ? `, [pedazo.pedazos, pedazo.number]).then((result) => {
          if (result.insertId) {
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
                let id_closure: number = data.rows.item(i).id_closure as number;
                let pedazo: Pedazo = new Pedazo(id, number, pedazos, id_closure);
                lists.push(pedazo);
              }
            }
            return lists;
          })
      })
  }

  getStockById(number: number) {
    return this.isReady()
      .then(() => {
        return this.database.executeSql(`SELECT * FROM stocktaking WHERE number = ${number} `, [])
          .then((data) => {
            if (data.rows.length) {
              return data.rows.item(0);
            }
            return null;
          })
      })
  }

  // ------------------------------PEDAZOS--------------------------------

  createPedazo(pedazo: Pedazo) {
    return this.isReady()
      .then(() => {
        return this.database.executeSql(`INSERT INTO Pedazos(number, pedazos, id_closure) VALUES(${pedazo.number}, ${pedazo.pedazos}, ${pedazo.id_closure}); `, {}).then((result) => {
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
        return this.database.executeSql(`SELECT * FROM Pedazos WHERE id = ${id} `, [])
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
        return this.database.executeSql(`UPDATE Pedazos SET number = ?, pedazos = ? WHERE number = ? `, [pedazo.number, pedazo.pedazos, pedazo.number]).then((result) => {
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
        return this.database.executeSql("SELECT * FROM Pedazos", [])
          .then((data) => {
            let lists = [];
            if (data.rows.length > 0) {
              for (let i = 0; i < data.rows.length; i++) {
                lists.push({
                  number: data.rows.item(i).number,
                  pedazos: data.rows.item(i).pedazos,
                  id_closure: data.rows.item(i).id_closure
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
        return this.database.executeSql(`SELECT * FROM Pedazos WHERE number = ${number} `, [])
          .then((data) => {
            let lists = [];
            if (data.rows.length > 0) {
              for (let i = 0; i < data.rows.length; i++) {
                lists.push({
                  number: data.rows.item(i).number,
                  pedazos: data.rows.item(i).pedazos,
                  id_closure: data.rows.item(i).id_closure
                });
              }
            }
            return lists;
          })
      })
  }

  //------------------DIARIA DETALLE---------------------

  getDiariaDetalleByID(detalle: DiariaDetalle) {
    return this.isReady()
      .then(() => {
        return this.database.executeSql(`SELECT * FROM DiariaDetalle WHERE id = ${detalle.id} and status = ${detalle.status} `, [])
          .then((data) => {
            if (data.rows.length) {
              let detail = new DiariaDetalle(0, 0, 0, 0, 0, '', '', 0, 0, 0);
              detail.id = parseInt(data.rows.item(0).id);
              detail.id_control = parseInt(data.rows.item(0).id_control);
              detail.number = parseInt(data.rows.item(0).number);
              detail.lempiras = parseInt(data.rows.item(0).lempiras);
              detail.id_client = parseInt(data.rows.item(0).id_client);
              detail.client = data.rows.item(0).client, data.rows.item(0).date;
              detail.status = parseInt(data.rows.item(0).status);
              detail.id_closure = parseInt(data.rows.item(0).id_closure);
              detail.paid = parseInt(data.rows.item(0).paid);
              return detail as DiariaDetalle;
            }
            return null;
          })
      })
  }

  CreateDiariaDetalle(diaria: DiariaDetalle) {
    return this.isReady()
      .then(() => {
        return this.database.executeSql(`INSERT INTO DiariaDetalle(id_control, number, lempiras, id_client, client, date, status, id_closure, paid) VALUES(${diaria.id_control}, ${diaria.number}, ${diaria.lempiras}, ${diaria.id_client}, '${diaria.client}', '${diaria.date}', ${diaria.status}, ${diaria.id_closure}, ${diaria.paid}); `, {}).then((result) => {
          if (result.insertId) {
            let miDiariaDetalle: DiariaDetalle = new DiariaDetalle(0, 0, 0, 0, 0, '', '', 0, 0, 0);
            miDiariaDetalle.id = parseInt(result.insertId);
            return this.getDiariaDetalleByID(miDiariaDetalle);
          }
        })
      });
  }

  removeDiariaDetalleByID(id: number) {
    return this.isReady()
      .then(() => {
        return this.database.executeSql(`DELETE FROM DiariaDetalle WHERE id = ${id} `, [])
      });
  }

  removeDiariaDetalle(detalle: DiariaDetalle) {
    return this.isReady()
      .then(() => {
        return this.database.executeSql(`DELETE FROM DiariaDetalle WHERE id_control = ${detalle.id_control} `, [])
      });
  }

  getDiariaDetalleByStatus(pStatus: number) {
    return this.isReady()
      .then(() => {
        return this.database.executeSql(`SELECT * FROM DiariaDetalle WHERE status = ${pStatus} `, [])
          .then((data) => {
            let lists: DiariaDetalle[] = [];
            if (data.rows.length > 0) {
              for (let i = 0; i < data.rows.length; i++) {
                let detalle = new DiariaDetalle(0, 0, 0, 0, 0, '', '', 0, 0, 0);
                detalle.id = parseInt(data.rows.item(i).id);
                detalle.id_control = parseInt(data.rows.item(i).id_control);
                detalle.lempiras = parseInt(data.rows.item(i).lempiras);
                detalle.number = parseInt(data.rows.item(i).number);
                detalle.id_client = parseInt(data.rows.item(i).id_client);
                detalle.client = data.rows.item(i).client;
                detalle.date = data.rows.item(i).date;
                detalle.status = parseInt(data.rows.item(i).status);
                detalle.id_closure = parseInt(data.rows.item(i).id_closure);
                detalle.paid = parseInt(data.rows.item(i).paid);
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
                let detalle = new DiariaDetalle(parseInt(data.rows.item(i).id), parseInt(data.rows.item(i).id_control), parseInt(data.rows.item(i).number), parseInt(data.rows.item(i).lempiras), parseInt(data.rows.item(i).id_client), data.rows.item(i).client, data.rows.item(i).date, parseInt(data.rows.item(i).status), parseInt(data.rows.item(i).id_closure), parseInt(data.rows.item(i).paid));
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
        return this.database.executeSql(`SELECT * FROM DiariaDetalle where id_control = ${detalle.id_control} `, [])
          .then((data) => {
            let lists: DiariaDetalle[] = [];
            if (data.rows.length) {
              for (let i = 0; i < data.rows.length; i++) {
                let detalle = new DiariaDetalle(parseInt(data.rows.item(i).id), parseInt(data.rows.item(i).id_control), parseInt(data.rows.item(i).number), parseInt(data.rows.item(i).lempiras), parseInt(data.rows.item(i).id_client), data.rows.item(i).client, data.rows.item(i).date, parseInt(data.rows.item(i).status), parseInt(data.rows.item(i).id_closure), parseInt(data.rows.item(i).paid));
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
        return this.database.executeSql(`INSERT INTO DiariaControl(id_client, client, total, date, status, id_closure) VALUES(${diaria.id_client}, '${diaria.client}', ${diaria.total}, '${diaria.date}', ${diaria.status}, ${diaria.id_closure}); `, {}).then((result) => {
          if (result.insertId) {
            let miDiariaControl: DiariaControl = new DiariaControl(0, 0, '', 0, 0);
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
        return this.database.executeSql(`SELECT * FROM DiariaControl WHERE id = ${control.id} and status = ${control.status} `, [])
          .then((data) => {
            if (data.rows.length) {
              let control = new DiariaControl(0, 0, '', 0, 0);
              control.id = data.rows.item(0).id;
              control.id_client = data.rows.item(0).id_client;
              control.client = data.rows.item(0).client;
              control.total = data.rows.item(0).total;
              control.date = data.rows.item(0).date;
              control.status = data.rows.item(0).status;
              control.id_closure = data.rows.item(0).id_closure;
              return control as DiariaControl;
            }
            return null;
          })
      })
  }

  removeDiariaControlByID(control: DiariaControl) {
    return this.isReady()
      .then(() => {
        return this.database.executeSql(`DELETE FROM DiariaControl WHERE id = ${control.id} `, [])
      })
  }

  getDiariaControlByStatus(control: DiariaControl) {
    return this.isReady()
      .then(() => {
        return this.database.executeSql(`SELECT * FROM DiariaControl WHERE status = ${control.status} ORDER BY id DESC`, [])
          .then((data) => {
            let lists: DiariaControl[] = [];
            if (data.rows.length) {
              for (let i = 0; i < data.rows.length; i++) {
                let control = new DiariaControl(0, 0, '', 0, 0);
                control.id = data.rows.item(i).id;
                control.id_client = data.rows.item(i).id_client;
                control.client = data.rows.item(i).client;
                control.total = data.rows.item(i).total;
                control.date = data.rows.item(i).date;
                control.status = data.rows.item(i).status;
                control.id_closure = data.rows.item(i).id_closure;
                lists.push(control);
              }
            }
            return lists;
          })
      })
  }

  getDiariaLenght() {
    return this.isReady()
      .then(() => {
        return this.database.executeSql(`SELECT * FROM DiariaControl ORDER BY id DESC LIMIT 1`, [])
          .then((data) => {
            if (data.rows.length) {
              let control = new DiariaControl(0, 0, '', 0, 0);
              control.id = data.rows.item(0).id;
              // control.id_client = data.rows.item(0).id_client;
              // control.client = data.rows.item(0).client;
              // control.total = data.rows.item(0).total;
              // control.date = data.rows.item(0).date;
              // control.status = data.rows.item(0).status;
              // control.id_closure = data.rows.item(0).id_closure;
              return control as DiariaControl;
            }
            return null;
          })
      })
  }

  // -----------------------------------CLIENT-------------------------------------------

  CreateClient(name: string, telephone: string, address: string, email: string) {
    return this.isReady()
      .then(() => {
        return this.database.executeSql(`INSERT INTO Clients(name, telephone, address, email) VALUES('${name}', '${telephone}', '${address}', '${email}'); `, {}).then((result) => {
          if (result.insertId) {
            return this.getList(result.insertId);
          }
        })
      });
  }

  getAllClients() {
    return this.isReady()
      .then(() => {
        return this.database.executeSql("SELECT * FROM Clients", [])
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
        return this.database.executeSql(`SELECT * FROM Clients WHERE id = ${id} `, [])
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
        return this.database.executeSql(`DELETE FROM Clients WHERE id = ${id} `, [])
      })
  }

}