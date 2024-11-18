CREATE TABLESPACE tbspace_tablas_recurrentes DATAFILE 'C:\datafiles\datafile_recurrentes.dat'
SIZE 25M;

ALTER DATABASE DATAFILE 'C:\datafiles\datafile_recurrentes.dat' AUTOEXTEND ON NEXT 1 M MAXSIZE 70M;



CREATE TABLESPACE tbspace_tablas_parametricas DATAFILE 'C:\datafiles\datafile_parametricas.dat'
SIZE 5M;

ALTER DATABASE DATAFILE 'C:\datafiles\datafile_parametricas.dat' AUTOEXTEND ON NEXT 1 M MAXSIZE 30 M;



CREATE TABLESPACE tbspace_indices DATAFILE 'C:\datafiles\datafile_indices.dat'
SIZE 30M;

ALTER DATABASE DATAFILE 'C:\datafiles\datafile_indices.dat' AUTOEXTEND ON NEXT 1 M MAXSIZE 50M;


-- Creación de tablas y sus relaciones en Oracle SQL con constraints

-- Tabla Departamento
CREATE TABLE Departamento (
    ID NUMBER,
    Nombre VARCHAR2(100) NOT NULL,
    Descripción VARCHAR2(255),
    CONSTRAINT PK_Departamento PRIMARY KEY (ID)
);

-- Tabla Ciudad
CREATE TABLE Ciudad (
    ID NUMBER,
    Nombre VARCHAR2(100) NOT NULL,
    Codigo_postal VARCHAR2(20),
    Departamento NUMBER,
    CONSTRAINT PK_Ciudad PRIMARY KEY (ID),
    CONSTRAINT FK_Ciudad_Departamento FOREIGN KEY (Departamento) REFERENCES Departamento(ID)
);

-- Tabla Dirección
CREATE TABLE Direccion (
    ID NUMBER,
    Descripción VARCHAR2(255) NOT NULL,
    Ciudad NUMBER,
    CONSTRAINT PK_Direccion PRIMARY KEY (ID),
    CONSTRAINT FK_Direccion_Ciudad FOREIGN KEY (Ciudad) REFERENCES Ciudad(ID)
);

-- Tabla Nivel
CREATE TABLE Nivel (
    ID NUMBER,
    nombreNivel VARCHAR2(100) NOT NULL,
    Descripción VARCHAR2(255),
    PorcentajeComision NUMBER(5, 2),
    PorcentajeComisionReferido NUMBER(5, 2),
    PorcentajeComisionNieto NUMBER(5, 2),
    CONSTRAINT PK_Nivel PRIMARY KEY (ID)
);

ALTER TABLE Nivel ADD (PorcentajeComision NUMBER(5, 2));
ALTER TABLE Nivel ADD (PorcentajeComisionReferido NUMBER(5, 2));
ALTER TABLE Nivel ADD (PorcentajeComisionNieto NUMBER(5, 2));

CREATE TABLE EstadoVendedor (
    ID NUMBER PRIMARY KEY,
    Descripcion VARCHAR2(50) NOT NULL
);

-- Tabla Vendedor
CREATE TABLE Vendedor (
    ID NUMBER,
    Nombre VARCHAR2(100) NOT NULL,
    Apellido VARCHAR2(100) NOT NULL,
    Telefono VARCHAR2(20),
    Email VARCHAR2(100),
    Password VARCHAR2(50),
    Vendedor_referido NUMBER,
    Direccion NUMBER,
    Nivel NUMBER,
    Estado NUMBER,
    CONSTRAINT PK_Vendedor PRIMARY KEY (ID),
    CONSTRAINT FK_Vendedor_VendedorReferido FOREIGN KEY (Vendedor_referido) REFERENCES Vendedor(ID),
    CONSTRAINT FK_Vendedor_Direccion FOREIGN KEY (Direccion) REFERENCES Direccion(ID),
    CONSTRAINT FK_Vendedor_Nivel FOREIGN KEY (Nivel) REFERENCES Nivel(ID),
    CONSTRAINT FK_Vendedor_Estado FOREIGN KEY (Estado) REFERENCES Estado(ID)
);

-- Tabla Afiliación
CREATE TABLE Afiliacion (
    ID NUMBER,
    FechaAfiliacion DATE NOT NULL,
    Observacion VARCHAR2(255),
    Vendedor NUMBER,
    CONSTRAINT PK_Afiliacion PRIMARY KEY (ID),
    CONSTRAINT FK_Afiliacion_Vendedor FOREIGN KEY (Vendedor) REFERENCES Vendedor(ID)
);

-- Tabla TipoProducto
CREATE TABLE TipoProducto (
    ID NUMBER,
    Nombre VARCHAR2(100) NOT NULL,
    Descripción VARCHAR2(255),
    CONSTRAINT PK_TipoProducto PRIMARY KEY (ID)
);

-- Tabla Producto
CREATE TABLE Producto (
    ID NUMBER,
    Nombre VARCHAR2(100) NOT NULL,
    Descripción VARCHAR2(255),
    TipoProducto NUMBER,
    Stock NUMBER,
    Precio NUMBER(10, 2),
    CONSTRAINT PK_Producto PRIMARY KEY (ID),
    CONSTRAINT FK_Producto_TipoProducto FOREIGN KEY (TipoProducto) REFERENCES TipoProducto(ID)
);


-- Tabla Inventario
CREATE TABLE Inventario (
    ID NUMBER,
    Vendedor NUMBER,
    CONSTRAINT PK_Inventario PRIMARY KEY (ID),
    CONSTRAINT FK_Inventario_Vendedor FOREIGN KEY (Vendedor) REFERENCES Vendedor(ID)
);

-- Tabla DetalleInventario
CREATE TABLE DetalleInventario (
    ID NUMBER,
    Descripción VARCHAR2(255),
    Cantidad NUMBER NOT NULL,
    Fecha_ult_actualizacion DATE,
    id_producto NUMBER,
    Inventario NUMBER,
    CONSTRAINT PK_DetalleInventario PRIMARY KEY (ID),
    CONSTRAINT FK_DetalleInventario_Producto FOREIGN KEY (id_producto) REFERENCES Producto(ID),
    CONSTRAINT FK_DetalleInventario_Inventario FOREIGN KEY (Inventario) REFERENCES Inventario(ID)
);

-- Tabla Venta
CREATE TABLE Venta (
    ID NUMBER,
    Fecha_venta DATE NOT NULL,
    Vendedor NUMBER,
    Id_comprador NUMBER,
    CONSTRAINT PK_Venta PRIMARY KEY (ID),
    CONSTRAINT FK_Venta_Vendedor FOREIGN KEY (Vendedor) REFERENCES Vendedor(ID)
);

ALTER TABLE Venta DROP CONSTRAINT FK_VENTA_COMPRADOR;

-- Tabla DetalleVenta
CREATE TABLE DetalleVenta (
    ID NUMBER,
    Producto NUMBER,
    Cantidad NUMBER NOT NULL,
    ValorUnitario NUMBER(10, 2),
    Venta NUMBER,
    CONSTRAINT PK_DetalleVenta PRIMARY KEY (ID),
    CONSTRAINT FK_DetalleVenta_Producto FOREIGN KEY (Producto) REFERENCES Producto(ID),
    CONSTRAINT FK_DetalleVenta_Venta FOREIGN KEY (Venta) REFERENCES Venta(ID)
);

-- Tabla Comisión
CREATE TABLE Comision (
    ID NUMBER,
    Venta NUMBER,
    Porcentaje NUMBER(5, 2),
    ValorComision NUMBER(10, 2),
    Vendedor NUMBER,
    CONSTRAINT PK_Comision PRIMARY KEY (ID),
    CONSTRAINT FK_Comision_Venta FOREIGN KEY (Venta) REFERENCES Venta(ID),
    CONSTRAINT FK_Comision_Vendedor FOREIGN KEY (Vendedor) REFERENCES Vendedor(ID)
);

-- Tabla EstadoEnvio
CREATE TABLE EstadoEnvio (
    ID NUMBER,
    Descripción VARCHAR2(255) NOT NULL,
    CONSTRAINT PK_EstadoEnvio PRIMARY KEY (ID)
);

-- Tabla Envío
CREATE TABLE Envio (
    ID NUMBER,
    Fecha_envio DATE NOT NULL,
    Venta NUMBER,
    Estado NUMBER,
    Direccion NUMBER,
    CONSTRAINT PK_Envio PRIMARY KEY (ID),
    CONSTRAINT FK_Envio_Venta FOREIGN KEY (Venta) REFERENCES Venta(ID),
    CONSTRAINT FK_Envio_Estado FOREIGN KEY (Estado) REFERENCES EstadoEnvio(ID),
    CONSTRAINT FK_Envio_Direccion FOREIGN KEY (Direccion) REFERENCES Direccion(ID)
);



-- Tablas recurrentes
ALTER TABLE Vendedor MOVE TABLESPACE tbspace_tablas_recurrentes;
ALTER TABLE Venta MOVE TABLESPACE tbspace_tablas_recurrentes;
ALTER TABLE DetalleInventario MOVE TABLESPACE tbspace_tablas_recurrentes;
ALTER TABLE DetalleVenta MOVE TABLESPACE tbspace_tablas_recurrentes;
ALTER TABLE Producto MOVE TABLESPACE tbspace_tablas_recurrentes;
ALTER TABLE Envio MOVE TABLESPACE tbspace_tablas_recurrentes;
ALTER TABLE Comision MOVE TABLESPACE tbspace_tablas_recurrentes;

-- Tablas paramétricas
ALTER TABLE Direccion MOVE TABLESPACE tbspace_tablas_parametricas;
ALTER TABLE Ciudad MOVE TABLESPACE tbspace_tablas_parametricas;
ALTER TABLE Departamento MOVE TABLESPACE tbspace_tablas_parametricas;
ALTER TABLE TipoProducto MOVE TABLESPACE tbspace_tablas_parametricas;
ALTER TABLE Afiliacion MOVE TABLESPACE tbspace_tablas_parametricas;
ALTER TABLE Nivel MOVE TABLESPACE tbspace_tablas_parametricas;
ALTER TABLE Inventario MOVE TABLESPACE tbspace_tablas_parametricas;
ALTER TABLE EstadoEnvio MOVE TABLESPACE tbspace_tablas_parametricas;


 
-- Reconstrucción de índices en el tablespace tbspace_indices

ALTER INDEX PK_Departamento REBUILD TABLESPACE tbspace_indices;
ALTER INDEX PK_Ciudad REBUILD TABLESPACE tbspace_indices;
ALTER INDEX PK_Direccion REBUILD TABLESPACE tbspace_indices;
ALTER INDEX PK_Nivel REBUILD TABLESPACE tbspace_indices;
ALTER INDEX PK_Vendedor REBUILD TABLESPACE tbspace_indices;
ALTER INDEX PK_Afiliacion REBUILD TABLESPACE tbspace_indices;
ALTER INDEX PK_TipoProducto REBUILD TABLESPACE tbspace_indices;
ALTER INDEX PK_Producto REBUILD TABLESPACE tbspace_indices;
ALTER INDEX PK_Inventario REBUILD TABLESPACE tbspace_indices;
ALTER INDEX PK_DetalleInventario REBUILD TABLESPACE tbspace_indices;
ALTER INDEX PK_Venta REBUILD TABLESPACE tbspace_indices;
ALTER INDEX PK_DetalleVenta REBUILD TABLESPACE tbspace_indices;
ALTER INDEX PK_Comision REBUILD TABLESPACE tbspace_indices;
ALTER INDEX PK_EstadoEnvio REBUILD TABLESPACE tbspace_indices;
ALTER INDEX PK_Envio REBUILD TABLESPACE tbspace_indices;

-- Inserciones de ejemplo

-- Inserciones en la tabla Departamento
INSERT INTO Departamento (ID, Nombre, Descripción) VALUES (1, 'Cundinamárca', 'Departamento en colombia');
INSERT INTO Departamento (ID, Nombre, Descripción) VALUES (2, 'Antioquia', 'Departamento en colombia');
INSERT INTO Departamento (ID, Nombre, Descripción) VALUES (3, 'Valle del cauca', 'Departamento en colombia');
INSERT INTO Departamento (ID, Nombre, Descripción) VALUES (4, 'Atlántico', 'Departamento en colombia');
INSERT INTO Departamento (ID, Nombre, Descripción) VALUES (5, 'Magdalena', 'Departamento en colombia');

-- Inserciones en la tabla Ciudad
INSERT INTO Ciudad (ID, Nombre, Codigo_postal, Departamento) VALUES (1, 'Bogotá', '110111', 1);
INSERT INTO Ciudad (ID, Nombre, Codigo_postal, Departamento) VALUES (2, 'Medellín', '050001', 2);
INSERT INTO Ciudad (ID, Nombre, Codigo_postal, Departamento) VALUES (3, 'Cali', '760001', 3);
INSERT INTO Ciudad (ID, Nombre, Codigo_postal, Departamento) VALUES (4, 'Barranquilla', '080001', 4);
INSERT INTO Ciudad (ID, Nombre, Codigo_postal, Departamento) VALUES (5, 'Cartagena', '130001', 5);

-- Inserciones en la tabla Dirección
INSERT INTO Direccion (ID, Descripción, Ciudad) VALUES (1, 'Calle 123 #45-67', 1);
INSERT INTO Direccion (ID, Descripción, Ciudad) VALUES (2, 'Carrera 7 #89-10', 2);
INSERT INTO Direccion (ID, Descripción, Ciudad) VALUES (3, 'Avenida 10 #20-30', 3);
INSERT INTO Direccion (ID, Descripción, Ciudad) VALUES (4, 'Transversal 8 #55-60', 4);
INSERT INTO Direccion (ID, Descripción, Ciudad) VALUES (5, 'Diagonal 40 #15-45', 5);

-- Inserciones en la tabla Nivel
INSERT INTO Nivel (ID, nombreNivel, Descripción, PorcentajeComision, PorcentajeComisionReferido, PorcentajeComisionNieto) VALUES (1, 'Bronce', 'Nivel básico en la red de ventas', 1.5, 0.5, 0.2);
INSERT INTO Nivel (ID, nombreNivel, Descripción, PorcentajeComision, PorcentajeComisionReferido, PorcentajeComisionNieto) VALUES (2, 'Plata', 'Nivel intermedio en la red de ventas', 2.5, 1.5, 0.5);
INSERT INTO Nivel (ID, nombreNivel, Descripción,PorcentajeComision, PorcentajeComisionReferido, PorcentajeComisionNieto) VALUES (3, 'Oro', 'Nivel avanzado en la red de ventas', 4.5, 2.5, 1.5);
INSERT INTO Nivel (ID, nombreNivel, Descripción, PorcentajeComision, PorcentajeComisionReferido, PorcentajeComisionNieto) VALUES (4, 'Platino', 'Nivel experto en la red de ventas', 6, 4.5, 2.5);

-- Tabla estado del vendedor


INSERT INTO EstadoVendedor (ID, Descripcion) VALUES (1, 'Activo');
INSERT INTO EstadoVendedor (ID, Descripcion) VALUES (2, 'Inactivo');

-- Inserciones en la tabla Vendedor
INSERT INTO Vendedor (ID, Nombre, Apellido, Telefono, Email, Vendedor_referido, Direccion, Nivel, Estado) VALUES (1, 'Carlos', 'Gómez', '3101234567', 'carlos.gomez@ejemplo.com', NULL, 1, 1, 1);
INSERT INTO Vendedor (ID, Nombre, Apellido, Telefono, Email, Vendedor_referido, Direccion, Nivel, Estado) VALUES (2, 'Laura', 'Martínez', '3202345678', 'laura.martinez@ejemplo.com', 1, 2, 2, 1);
INSERT INTO Vendedor (ID, Nombre, Apellido, Telefono, Email, Vendedor_referido, Direccion, Nivel, Estado) VALUES (3, 'Andrés', 'Pérez', '3113456789', 'andres.perez@ejemplo.com', 1, 3, 3, 1);
INSERT INTO Vendedor (ID, Nombre, Apellido, Telefono, Email, Vendedor_referido, Direccion, Nivel, Estado) VALUES (4, 'Diana', 'Ruiz', '3124567890', 'diana.ruiz@ejemplo.com', 2, 4, 4, 1);
INSERT INTO Vendedor (ID, Nombre, Apellido, Telefono, Email, Vendedor_referido, Direccion, Nivel, Estado) VALUES (5, 'Jorge', 'Lopez', '3135678901', 'jorge.lopez@ejemplo.com', 3, 5, 4, 1);

Select * from vendedor;

-- Inserciones en la tabla Afiliación
INSERT INTO Afiliacion (ID, FechaAfiliacion, Observacion, Vendedor) VALUES (1, TO_DATE('2024-01-15', 'YYYY-MM-DD'), 'Afiliación inicial', 1);
INSERT INTO Afiliacion (ID, FechaAfiliacion, Observacion, Vendedor) VALUES (2, TO_DATE('2024-02-10', 'YYYY-MM-DD'), 'Afiliación por recomendación', 2);
INSERT INTO Afiliacion (ID, FechaAfiliacion, Observacion, Vendedor) VALUES (3, TO_DATE('2024-03-05', 'YYYY-MM-DD'), 'Afiliación de prueba', 3);
INSERT INTO Afiliacion (ID, FechaAfiliacion, Observacion, Vendedor) VALUES (4, TO_DATE('2024-04-01', 'YYYY-MM-DD'), 'Afiliación por campaña', 4);
INSERT INTO Afiliacion (ID, FechaAfiliacion, Observacion, Vendedor) VALUES (5, TO_DATE('2024-05-20', 'YYYY-MM-DD'), 'Afiliación especial', 5);

-- Inserciones en la tabla TipoProducto
INSERT INTO TipoProducto (ID, Nombre, Descripción) VALUES (1, 'Salud', 'Productos relacionados con la salud');
INSERT INTO TipoProducto (ID, Nombre, Descripción) VALUES (2, 'Fitness', 'Productos especializados en la dieta del deportista');
INSERT INTO TipoProducto (ID, Nombre, Descripción) VALUES (3, 'Alimentos', 'Productos alimenticios');
INSERT INTO TipoProducto (ID, Nombre, Descripción) VALUES (4, 'Suplementos', 'Suplementos multivitamínicos');

-- Inserciones en la tabla Producto
INSERT INTO Producto (ID, Nombre, Descripción, TipoProducto, Stock) VALUES (1, 'Vitaminas', 'Suplemento de vitaminas y minerales', 1, 5000);
INSERT INTO Producto (ID, Nombre, Descripción, TipoProducto, Stock) VALUES (2, 'Crema hidratante', 'Crema para cuidado de la piel', 2, 5000);
INSERT INTO Producto (ID, Nombre, Descripción, TipoProducto, Stock) VALUES (3, 'Barras de proteína', 'Barras alimenticias de proteína', 3, 5000);
INSERT INTO Producto (ID, Nombre, Descripción, TipoProducto, Stock) VALUES (4, 'Preentreno', 'Para empezar tu rutina de entrenamiento con energía', 4, 5000);
INSERT INTO Producto (ID, Nombre, Descripción, TipoProducto, Stock) VALUES (5, 'SuperAcetaminofén', 'Ibuprofeno hidratado para aliviar dolores fuertes', 1, 5000);



-- Inserciones en la tabla Inventario
INSERT INTO Inventario (ID, Vendedor) VALUES (1, 1);
INSERT INTO Inventario (ID, Vendedor) VALUES (2, 2);
INSERT INTO Inventario (ID, Vendedor) VALUES (3, 3);
INSERT INTO Inventario (ID, Vendedor) VALUES (4, 4);
INSERT INTO Inventario (ID, Vendedor) VALUES (5, 5);

-- Inserciones en la tabla DetalleInventario
INSERT INTO DetalleInventario (ID, Descripción, Cantidad, Fecha_ult_actualizacion, id_producto, Inventario) VALUES (1, 'Stock inicial', 100, sysdate, 1, 1);
INSERT INTO DetalleInventario (ID, Descripción, Cantidad, Fecha_ult_actualizacion, id_producto, Inventario) VALUES (2, 'Stock inicial', 50, sysdate, 2, 2);
INSERT INTO DetalleInventario (ID, Descripción, Cantidad, Fecha_ult_actualizacion, id_producto, Inventario) VALUES (3, 'Stock inicial', 75, sysdate, 3, 3);
INSERT INTO DetalleInventario (ID, Descripción, Cantidad, Fecha_ult_actualizacion, id_producto, Inventario) VALUES (4, 'Stock inicial', 60, sysdate, 4, 4);
INSERT INTO DetalleInventario (ID, Descripción, Cantidad, Fecha_ult_actualizacion, id_producto, Inventario) VALUES (5, 'Stock inicial', 80, sysdate, 5, 5);

-- Inserciones en la tabla Venta
INSERT INTO Venta (ID, Fecha_venta, Vendedor, Id_comprador) VALUES (1, TO_DATE('2024-02-15', 'YYYY-MM-DD'), 1, 2);
INSERT INTO Venta (ID, Fecha_venta, Vendedor, Id_comprador) VALUES (2, TO_DATE('2024-02-20', 'YYYY-MM-DD'), 2, 3);
INSERT INTO Venta (ID, Fecha_venta, Vendedor, Id_comprador) VALUES (3, TO_DATE('2024-03-01', 'YYYY-MM-DD'), 3, 4);
INSERT INTO Venta (ID, Fecha_venta, Vendedor, Id_comprador) VALUES (4, TO_DATE('2024-03-05', 'YYYY-MM-DD'), 4, 5);
INSERT INTO Venta (ID, Fecha_venta, Vendedor, Id_comprador) VALUES (5, TO_DATE('2024-03-10', 'YYYY-MM-DD'), 5, 1);

-- Inserciones en la tabla DetalleVenta
INSERT INTO DetalleVenta (ID, Producto, Cantidad, ValorUnitario, Venta) VALUES (1, 1, 2, 100.0, 1);
INSERT INTO DetalleVenta (ID, Producto, Cantidad, ValorUnitario, Venta) VALUES (2, 2, 1, 200.0, 2);
INSERT INTO DetalleVenta (ID, Producto, Cantidad, ValorUnitario, Venta) VALUES (3, 3, 5, 150.0, 3);
INSERT INTO DetalleVenta (ID, Producto, Cantidad, ValorUnitario, Venta) VALUES (4, 4, 3, 250.0, 4);
INSERT INTO DetalleVenta (ID, Producto, Cantidad, ValorUnitario, Venta) VALUES (5, 5, 1, 300.0, 5);

-- Inserciones en la tabla Comisión
INSERT INTO Comision (ID, Venta, Porcentaje, ValorComision, Vendedor) VALUES (1, 1, 0.1, 20.0, 1);
INSERT INTO Comision (ID, Venta, Porcentaje, ValorComision, Vendedor) VALUES (2, 2, 0.15, 30.0, 2);
INSERT INTO Comision (ID, Venta, Porcentaje, ValorComision, Vendedor) VALUES (3, 3, 0.12, 60.0, 4);
INSERT INTO Comision (ID, Venta, Porcentaje, ValorComision, Vendedor) VALUES (4, 4, 0.20, 150.0, 3);
INSERT INTO Comision (ID, Venta, Porcentaje, ValorComision, Vendedor) VALUES (5, 5, 0.18, 54.0, 2);


-- Inserciones en la tabla EstadoEnvio
INSERT INTO EstadoEnvio (ID, Descripción) VALUES (1, 'Pendiente');
INSERT INTO EstadoEnvio (ID, Descripción) VALUES (2, 'En camino');
INSERT INTO EstadoEnvio (ID, Descripción) VALUES (3, 'Entregado');
INSERT INTO EstadoEnvio (ID, Descripción) VALUES (4, 'Devuelto');
INSERT INTO EstadoEnvio (ID, Descripción) VALUES (5, 'Cancelado');

-- Inserciones en la tabla Envio
INSERT INTO Envio (ID, Fecha_envio, Venta, Estado, Direccion) VALUES (1, TO_DATE('2024-02-16', 'YYYY-MM-DD'), 1, 1, 1);
INSERT INTO Envio (ID, Fecha_envio, Venta, Estado, Direccion) VALUES (2, TO_DATE('2024-02-21', 'YYYY-MM-DD'), 2, 2, 2);
INSERT INTO Envio (ID, Fecha_envio, Venta, Estado, Direccion) VALUES (3, TO_DATE('2024-03-02', 'YYYY-MM-DD'), 3, 3, 3);
INSERT INTO Envio (ID, Fecha_envio, Venta, Estado, Direccion) VALUES (4, TO_DATE('2024-03-06', 'YYYY-MM-DD'), 4, 4, 4);
INSERT INTO Envio (ID, Fecha_envio, Venta, Estado, Direccion) VALUES (5, TO_DATE('2024-03-11', 'YYYY-MM-DD'), 5, 5, 5);

COMMIT;


--- Triggers y procedimientos









