import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import * as java from 'java';
import * as fs from 'fs';
import { join } from 'path';

@Injectable()
export class H2Service implements OnModuleInit {
  private readonly logger = new Logger(H2Service.name);
  private readonly DB_PATH = join(process.cwd(), 'database', 'h2db');
  private isReady = false;


  async onModuleInit() {
    try {
      this.configureJavaEnvironment();
      await this.setupH2Driver();
    
      await this.initializeDatabase();
      
      this.isReady = true;
      this.logger.log('H2 Service initialized successfully');
    } catch (error) {
      this.logger.error('Failed to initialize H2 Service', error);
      throw error;
    }
  }

  private configureJavaEnvironment() {
    // Configurações essenciais para Java 21
    java.options.push('-Djava.awt.headless=true');
    java.options.push('--add-opens=java.base/java.lang=ALL-UNNAMED');
    java.options.push('--add-opens=java.base/java.util=ALL-UNNAMED');
    this.logger.debug('Java VM options configured');
  }

  private async setupH2Driver() {
    const h2JarPath = join(process.cwd(), 'libs', 'h2-2.2.224.jar');
    
    if (!fs.existsSync(h2JarPath)) {
      throw new Error(`H2 JDBC driver not found at: ${h2JarPath}`);
    }

    java.classpath.push(h2JarPath);
    this.logger.debug(`H2 driver added to classpath: ${h2JarPath}`);
  }

  private async initializeDatabase() {
    const dbDir = join(process.cwd(), 'database');
    if (!fs.existsSync(dbDir)) {
      fs.mkdirSync(dbDir);
      this.logger.debug(`Created database directory at: ${dbDir}`);
    }

    const conn = await this.createConnection();
    try {
      await this.createEssentialTables(conn);
      this.logger.log('Database tables verified/created');
    } finally {
      await this.closeConnection(conn);
    }
  }

  private async createConnection() {
    return new Promise<any>((resolve, reject) => {
      const url = `jdbc:h2:file:${this.DB_PATH};DB_CLOSE_DELAY=-1`;
      
      
      java.callStaticMethod(
        'java.sql.DriverManager',
        'getConnection',
        url,
        'sa',
        '',
        (err, conn) => {
          if (err) {
            this.logger.error('Connection failed', err);
            reject(new Error(`Failed to connect to H2 database: ${err.message}`));
          } else {
            resolve(conn);
          }
        }
      );
    });
  }

  private async createEssentialTables(conn: any) {
      const schemaPath = join(process.cwd(), 'src', 'h2', 'schema.sql');
      
      let createTablesSQL = '';
      try {
        createTablesSQL = fs.readFileSync(schemaPath, 'utf-8');
        this.logger.debug(`Schema SQL carregado de: ${schemaPath}`);
      } catch (err) {
        this.logger.error('Erro ao ler schema.sql', err);
        throw err;
      }

      try {
        await new Promise<void>((resolve, reject) => {
          conn.createStatement((err, stmt) => {
            if (err) return reject(err);

            const statements = createTablesSQL.split(';')
              .map(s => s.trim())
              .filter(s => s.length > 0);

            const executeNext = (index: number) => {
              if (index >= statements.length) {
                stmt.close();
                return resolve();
              }

              stmt.executeUpdate(statements[index] + ';', (err: any) => {
                if (err) {
                  stmt.close();
                  return reject(err);
                }
                executeNext(index + 1);
              });
            };

            executeNext(0);
          });
        });
      } catch (err) {
        this.logger.error('Erro ao executar statements SQL', err);
        throw err;
      }
  }

  private async closeConnection(conn: any) {
    return new Promise<void>((resolve) => {
      conn.close((err: Error) => {
        if (err) this.logger.error('Error closing connection', err);
        resolve();
      });
    });
  }

  private async executeQuery(stmt: any, sql?: string) {
    this.logger.debug('Executing query statement');
    return new Promise<any>((resolve, reject) => {
      if (sql) {
        stmt.executeQuery(sql, (err, resultSet) => {
          if (err) {
            this.logger.error('Error executing query statement', err);
            return reject(err);
          }
          this.logger.debug('Query statement executed successfully');
          resolve(resultSet);
        });
      } else {
        stmt.executeQuery((err: any, resultSet: any) => {
          if (err) {
            this.logger.error('Error executing query statement', err);
            return reject(err);
          }
          this.logger.debug('Query statement executed successfully');
          resolve(resultSet);
        });
      }
    });
  }

  async query(sql: string, params: any[] = []): Promise<any[]> {
    if (!this.isReady) {
      this.logger.error('H2 Service is not ready');
      throw new Error('H2 Service is not ready');
    }

    this.logger.debug(`Executing query: ${sql} with params: ${JSON.stringify(params)}`);

    const conn = await this.createConnection();
    try {
      const stmt = await this.createStatement(conn, sql, params);
      const resultSet = await this.executeQuery(stmt, params.length === 0 ? sql : undefined);
      const results = await this.processResultSet(resultSet);

      this.logger.debug(`Query executed successfully. Results: ${JSON.stringify(results)}`);
      return results;
    } catch (error) {
      this.logger.error('Error during query execution', error);
      throw error;
    } finally {
      await this.closeConnection(conn);
    }
  }

  private async createStatement(conn: any, sql: string, params: any[]) {
    this.logger.debug(`Creating statement for query: ${sql}`);
    return new Promise<any>((resolve, reject) => {
      if (params.length > 0) {
        conn.prepareStatement(sql, (err, stmt) => {
          if (err) {
            this.logger.error('Error preparing statement', err);
            return reject(err);
          }

          params.forEach((param, index) => {
            stmt.setObjectSync(index + 1, param);
          });

          this.logger.debug('Statement prepared successfully with parameters');
          resolve(stmt);
        });
      } else {
        conn.createStatement((err, stmt) => {
          if (err) {
            this.logger.error('Error creating statement', err);
            return reject(err);
          }

          this.logger.debug('Statement created successfully');
          resolve(stmt);
        });
      }
    });
  }

  private async processResultSet(resultSet: any) {
    this.logger.debug('Processing result set');
    return new Promise<any[]>((resolve, reject) => {
      resultSet.getMetaData((err, metaData) => {
        if (err) {
          this.logger.error('Error getting result set metadata', err);
          return reject(err);
        }

        metaData.getColumnCount((err, columnCount) => {
          if (err) {
            this.logger.error('Error getting column count', err);
            return reject(err);
          }

          const rows: any[] = [];
          const processRow = () => {
            resultSet.next((err, hasNext) => {
              if (err) {
                this.logger.error('Error iterating result set', err);
                return reject(err);
              }
              if (!hasNext) {
                this.logger.debug('Result set processing completed');
                return resolve(rows);
              }

              const row: any = {};
              let processedColumns = 0;

              for (let i = 1; i <= columnCount; i++) {
                metaData.getColumnName(i, (err, columnName) => {
                  if (err) {
                    this.logger.error('Error getting column name', err);
                    return reject(err);
                  }

                  resultSet.getObject(i, (err, value) => {
                    if (err) {
                      this.logger.error('Error getting column value', err);
                      return reject(err);
                    }

                    row[columnName] = value;
                    processedColumns++;

                    if (processedColumns === columnCount) {
                      rows.push(row);
                      processRow();
                    }
                  });
                });
              }
            });
          };

          processRow();
        });
      });
    });
  }
}