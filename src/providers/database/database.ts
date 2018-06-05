import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Platform } from 'ionic-angular';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
// import { DataChica } from '../../_models/DataChica.model';
import { Pedazo } from '../../_models/Pedazo.model';
import { DiariaDetalle } from '../../_models/DiariaDetalle.model';
import { DiariaControl } from '../../_models/DiariaControl.model';
import { Closure } from '../../_models/Closure.model';
import { AuxiliarService } from '../../_lib/auxiliar.service';
import { Consolidated } from '../../_models/Consolidated.model';

@Injectable()
export class DatabaseProvider {

  private database: SQLiteObject;
  private dbReady = new BehaviorSubject<boolean>(false);


  constructor(private platform: Platform, public http: HttpClient, public sqlite: SQLite, public _auxiliarService: AuxiliarService) {
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
                , winningNumber INTEGER);`, {})
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

  // ----------------------------CLOSURE----------------------------------

  createClosure(closure: Closure) {
    return this.isReady()
      .then(() => {
        return this.database.executeSql(`INSERT INTO Closure (description, date, status, total, id_user, user, winningNumber) VALUES ('${closure.description}', '${closure.date}',${closure.status},${closure.total}, ${closure.id_user},'${closure.user}',${closure.winningNumber}); `, {}).then((result) => {
          if (result.insertId) {
            let miClosure: Closure = new Closure(0, '', '', 0, 0, 0, '', 0);
            miClosure.id = parseInt(result.insertId);
            return this.getClosureByID(miClosure);
          }
        })
      });
  }

  getClosureByID(closure: Closure) {
    return this.isReady()
      .then(() => {
        return this.database.executeSql(`SELECT * FROM Closure WHERE id = ${closure.id} ORDER BY id DESC`, [])
          .then((data) => {
            if (data.rows.length) {
              let closure = new Closure(0, '', '', 0, 0, 0, '', 0);
              closure.id = parseInt(data.rows.item(0).id);
              closure.description = data.rows.item(0).description;
              closure.date = data.rows.item(0).date;
              closure.status = parseInt(data.rows.item(0).status);
              closure.total = parseInt(data.rows.item(0).total);
              closure.id_user = parseInt(data.rows.item(0).id_user);
              closure.user = data.rows.item(0).user;
              closure.winningNumber = parseInt(data.rows.item(0).winningNumber);
              return closure as Closure;
            }
            return null;
          })
      })
  }

  getClosureID() {
    return this.isReady()
      .then(() => {
        return this.database.executeSql(`SELECT * FROM Closure WHERE status = 0 ORDER BY id DESC`, [])
          .then((data) => {
            if (data.rows.length) {
              let closure = new Closure(0, '', '', 0, 0, 0, '', 0);
              closure.id = parseInt(data.rows.item(0).id);
              closure.description = data.rows.item(0).description;
              closure.date = data.rows.item(0).date;
              return closure as Closure;
            }
            return null;
          })
      })
  }

  getClosures() {
    return this.isReady()
      .then(() => {
        return this.database.executeSql(`SELECT * FROM Closure ORDER BY id DESC`, [])
          .then((data) => {
            let lists: Closure[] = [];
            if (data.rows.length) {
              for (let i = 0; i < data.rows.length; i++) {
                let detalle: Closure = new Closure(0, '', '', 0, 0, 0, '', 0);
                detalle.id = parseInt(data.rows.item(i).id);
                detalle.description = data.rows.item(i).description;
                detalle.date = data.rows.item(i).date;
                detalle.status = parseInt(data.rows.item(i).status);
                detalle.id_user = parseInt(data.rows.item(i).id_user);
                detalle.user = data.rows.item(i).user;
                detalle.winningNumber = parseInt(data.rows.item(i).winningNumber);
                lists.push(detalle);
              }
            }
            return lists;
          })
      })
  }

  createClosureFinish(closure: Closure) {
    return this.isReady()
      .then(() => {
        return this.database.executeSql(`UPDATE Closure SET status = 1`, {}).then((result) => {
          return this.database.executeSql(`UPDATE DiariaControl SET status = 1`, {}).then((result) => {
            return this.database.executeSql(`UPDATE DiariaDetalle SET status = 1`, {}).then((result) => {
              return this.database.executeSql(`INSERT INTO Closure (description, date, status, total, id_user, user, winningNumber) VALUES ('${closure.description}', '${closure.date}',${closure.status},${closure.total}, ${closure.id_user},'${closure.user}',${closure.winningNumber}); `, {}).then((result) => {
                if (result.insertId) {
                  let miClosure: Closure = new Closure(0, '', '', 0, 0, 0, '', 0);
                  miClosure.id = parseInt(result.insertId);
                  this.totalTotalConsolidated = 0;
                  return this.getClosureByID(miClosure);
                }
              })
            });
          });
        });
      });
  }

  createStock(number: Number) {
    return this.isReady()
      .then(() => {
        return this.database.executeSql(`SELECT * FROM Pedazos WHERE number = ${number} `, []).then((result) => {
          if (result.rows.length) {
            let pedazos = parseInt(result.rows.item(0).pedazos);
            return this.database.executeSql(`UPDATE stocktaking SET pedazos = ? WHERE number = ? `, [pedazos, number]).then((result) => {
              return 1;
            });
          }
        });
      });
  }

  // ----------------------------STOCKTAKING----------------------------------

  // createStock(pedazo: Pedazo) {
  //   return this.isReady()
  //     .then(() => {
  //       return this.database.executeSql(`INSERT INTO stocktaking(number, pedazos, id_closure) VALUES(${pedazo.number}, ${pedazo.pedazos}, ${pedazo.id_closure}); `, {}).then((result) => {
  //         if (result.insertId) {
  //           // console.log("Data a Guardar: ", result);
  //           return this.getStockById(result.insertId);
  //         }
  //       })
  //     });
  // }

  //-----AQUIIIII
  editStockMinus(pedazo: Pedazo) {
    return this.isReady()
      .then(() => {
        return this.database.executeSql(`UPDATE stocktaking SET pedazos = ? WHERE number = ? `, [pedazo.pedazos, pedazo.number]).then((result) => {
          if (result.insertId) {
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
          return this.database.executeSql(`INSERT INTO stocktaking(number, pedazos, id_closure) VALUES(${pedazo.number}, ${pedazo.pedazos}, ${pedazo.id_closure}); `, {}).then((result) => {
            return -1
          });
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

  editPedazoAndStocking(pedazo: Pedazo) {
    return this.isReady()
      .then(() => {
        return this.database.executeSql(`UPDATE Pedazos SET number = ?, pedazos = ? WHERE number = ? `, [pedazo.number, pedazo.pedazos, pedazo.number]).then((result) => {
          if (result.insertId) {
            return this.getPedazosById(result.insertId).then(() => {
              return this.database.executeSql(`UPDATE stocktaking SET pedazos = ? WHERE number = ? `, [pedazo.pedazos, pedazo.number]).then((result) => {
                if (result.insertId) {
                  return this.getStockById(result.insertId);
                }
              })
            })
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

  totalTotalConsolidated: number = 0;
  //----------------------------CONSOLIDATED------------------------
  getConsolidatedFinal(pStatus: number) {
    return this.isReady()
      .then(() => {
        return this.database.executeSql(`SELECT * FROM DiariaDetalle WHERE status = ${pStatus} ORDER BY number ASC`, [])
          .then((data) => {
            let lists: Consolidated[] = [];
            if (data.rows.length) {
              this.totalTotalConsolidated = 0;
              for (let index = 0; index < 100; index++) {
                var total: number = 0;
                for (let i = 0; i < data.rows.length; i++) {
                  let lempiras = parseInt(data.rows.item(i).lempiras);
                  let number = parseInt(data.rows.item(i).number);
                  if (number == index) {
                    total += lempiras;
                    this.totalTotalConsolidated += lempiras;
                  } else {
                    continue;
                  }
                }
                if (total > 0) {
                  lists.push(new Consolidated(0, 0, '', index, total, 0, '', 0, 0));
                }
              }
            }
            return lists as Consolidated[];
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
        // this.database.executeSql(`UPDATE Pedazos SET number = ?, pedazos = ? WHERE number = ? `, [pedazo.number, pedazo.pedazos, pedazo.number]
        // return this.database.executeSql(`DELETE FROM DiariaControl WHERE id = ${control.id} `, [])
        return this.database.executeSql(`UPDATE DiariaControl SET status = 7 WHERE id = ${control.id} `, [])
          .then(() => {
            // return this.database.executeSql(`DELETE FROM DiariaDetalle WHERE id_control = ${control.id}`, [])
            return this.database.executeSql(`UPDATE DiariaDetalle SET status = 7 WHERE id_control = ${control.id}`, [])
          })
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